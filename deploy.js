/**
 * --------------------------------------------------------
 * WARNING
 * --------------------------------------------------------
 *
 *
 * DO NOT CHANGE unless you know what you are doing.
 *
 *
 *
 *
 * This script is not a part of your project.
 * This is the POST deployment process that
 * uploads your vue-app to S3 and handles other
 * requirements.
 *
 *
 *
 * DO NOT CHANGE unless you know what you are doing.
 *
 *
 *
 * --------------------------------------------------------
 */
const AWS = require("aws-sdk");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const assert = require("assert");
const variables = require(`./.env.${process.argv[2]}.json`);
const credentials = new AWS.SharedIniFileCredentials({
  profile: variables.PROFILE,
});
AWS.config.credentials = credentials;

/**
 * This function will upload
 * an entire directory worth of files
 * to S3 and preserve the file path convention of any child items
 * on S3.
 *
 * @param {*} s3Path
 * @param {*} bucketName
 */
const uploadDir = function (s3Path, bucketName) {
  const mime = require("mime-types");
  let s3 = new AWS.S3();

  function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walkSync(filePath, callback);
      }
    });
  }

  walkSync(s3Path, function (filePath, stat) {
    //let bucketPath = filePath.substring(s3Path.length);
    const Key = filePath.replace("vue-app/dist/", "");
    let params = {
      Bucket: bucketName,
      Key: Key,
      Body: fs.readFileSync(path.resolve(__dirname, filePath), "utf-8"),
      ACL: "public-read",
      ContentType: mime.lookup(filePath),
    };
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        //console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
      }
    });
  });
};

/**
 * This function actually runs an npm command
 * on the web app, running the build process for production
 * so that the vue-app/dist folder is populated with source code
 * that we can deploy
 *
 * @returns
 */
const runBuild = () => {
  return new Promise((resolve, reject) => {
    const { spawn } = require("child_process");
    const job = spawn("npm", ["run", "web-build"]);

    job.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    job.stderr.on("data", (data) => {
      console.error(`stderr: ${data.toString("utf8")}`);
      //return reject(data.toString('utf8'));
    });

    job.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      return resolve(code);
    });
  });
};

/**
 * Clear all contents from a given bucket. 
 * 
 * @param {*} Bucket 
 * @returns 
 */
async function clearBucket(Bucket) {
  try {
    const s3 = new AWS.S3();

    const objects = await s3.listObjects({ Bucket }).promise();
    const clearBucket =
      objects.Contents &&
      Array.isArray(objects.Contents) &&
      objects.Contents.length > 0;

    if (clearBucket) {
      console.info("Bucket contains content. Deleting all objects...");
      await Promise.all(
        objects.Contents.map(async (s3Object) => {
          await s3
            .deleteObject({
              Bucket,
              Key: s3Object.Key,
            })
            .promise();
          console.info(s3Object.Key + " was deleted");
        })
      );
      console.info("Bucket cleared successfully!");
    }

    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * --------------------------------------------------------
 * 
 * Main deployment routine
 *
 * --------------------------------------------------------
 */
(async function () {
  if (process.argv[3] === "remove") {
    console.log("REMOVING STACK -", "SERVICE: " + variables.SERVICE_NAME);
    await clearBucket(variables.STATIC_BUCKET);
    return;
  }

  console.log(
    "POST DEPLOYMENT OPERATIONS FOR SERVICE: ",
    variables.SERVICE_NAME
  );

  const cloudformation = new AWS.CloudFormation({ region: variables.REGION });

  // if no API URL is provided,
  // this means we are not using a custom domain in the configuration,
  // therefore, we need to determine what the API URL truly is and use
  // that for the web app
  if (!variables.API_URL) {
    const httpStackResponse = await cloudformation
      .describeStackResource({
        LogicalResourceId: "HttpApi",
        StackName: `${variables.SERVICE_NAME}-${variables.STAGE}`,
      })
      .promise();
    const apiId = httpStackResponse["StackResourceDetail"].PhysicalResourceId;
    const BASE_URL = `https://${apiId}.execute-api.us-east-1.amazonaws.com/api/v1`;
    const URL = `${BASE_URL}/health`;
    const healthResponse = await fetch(URL).then((r) => r.json());
    // visit the API health check and determine if it is indeed online
    assert.deepEqual(
      healthResponse.stage,
      variables.STAGE,
      `${variables.STAGE} is not ${healthResponse.stage}`
    );
    variables.API_URL = BASE_URL;
  }

  /**
   * ---------------------------------------
   * START - Cognito Configuration Mapping to Vue
   * ---------------------------------------
   */
  const userPoolIdReq = await cloudformation
    .describeStackResource({
      LogicalResourceId: "CognitoUserPool",
      StackName: `${variables.SERVICE_NAME}-${variables.STAGE}`,
    })
    .promise();
  const userPoolClientIdReq = await cloudformation
    .describeStackResource({
      LogicalResourceId: "CognitoUserPoolClient",
      StackName: `${variables.SERVICE_NAME}-${variables.STAGE}`,
    })
    .promise();
  variables.COGNITO_USER_POOL_ID =
    userPoolIdReq["StackResourceDetail"]["PhysicalResourceId"];
  variables.COGNITO_CLIENT_ID =
    userPoolClientIdReq["StackResourceDetail"]["PhysicalResourceId"];
  /**
   * ---------------------------------------
   * END - Cognito Configuration Mapping to Vue
   * ---------------------------------------
   */

  // write all environment variables to .env file.
  const envStringToWrite = Object.keys(variables)
    .map((variableKey) => {
      return `VUE_APP_${variableKey}=${variables[variableKey]}`;
    })
    .join("\n");
  fs.writeFileSync("./vue-app/.env", envStringToWrite);

  await runBuild();
  uploadDir("./vue-app/dist/", variables.STATIC_BUCKET);

  console.log(`
    Deployment successful!
    Visit Web App: http://${variables.STATIC_BUCKET}.s3-website-${variables.REGION}.amazonaws.com/
    Visit API Health Check: ${variables.API_URL}/health
  `);
})();
