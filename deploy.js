const AWS = require("aws-sdk");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");

process.env = { ...process.env, ...(require(`./.env.${process.argv[2]}.json`)) };

const credentials = new AWS.SharedIniFileCredentials({profile: process.env.PROFILE});
AWS.config.credentials = credentials;

console.log(process.env.SERVICE_NAME);

const uploadDir = function(s3Path, bucketName) {

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

    walkSync(s3Path, function(filePath, stat) {
        //let bucketPath = filePath.substring(s3Path.length);
        const Key = filePath.replace("vue-app/dist/","");
        let params = {
            Bucket: bucketName, 
            Key: Key, 
            Body: fs.readFileSync(path.resolve(__dirname, filePath),"utf-8"), 
            ACL: "public-read"
        };
        console.log(path.resolve(__dirname, filePath),params);
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                //console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
            }
        });

    });
};


(async function(){

    const cloudformation = new AWS.CloudFormation({ region: process.env.REGION});
    const httpStackResponse = await cloudformation.describeStackResource({
        LogicalResourceId: 'HttpApi',
        StackName: `${process.env.SERVICE_NAME}-${process.env.STAGE}`,
    }).promise();
    const apiId = httpStackResponse['StackResourceDetail'].PhysicalResourceId;
    const BASE_URL = `https://${apiId}.execute-api.us-east-1.amazonaws.com/api/v1`;
    const URL = `${BASE_URL}/health`;

    const healthResponse = await fetch(URL).then(r => r.json());

    fs.writeFileSync("./vue-app/.env", `VUE_APP_API_URL=${BASE_URL}`);
    uploadDir("./vue-app/dist/",process.env.STATIC_BUCKET);

})();