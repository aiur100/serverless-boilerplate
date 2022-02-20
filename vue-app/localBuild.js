const variables = require(`.././.env.local.json`);
const fs = require("fs");
const AWS = require("aws-sdk");

(async function () {
  const credentials = new AWS.SharedIniFileCredentials({
    profile: variables.PROFILE,
  });
  AWS.config.credentials = credentials;
  const cloudformation = new AWS.CloudFormation({ region: variables.REGION });
  const userPoolIdReq = await cloudformation
    .describeStackResource({
      LogicalResourceId: "CognitoUserPool",
      StackName: `${variables.SERVICE_NAME}-local`,
    })
    .promise();
  const userPoolClientIdReq = await cloudformation
    .describeStackResource({
      LogicalResourceId: "CognitoUserPoolClient",
      StackName: `${variables.SERVICE_NAME}-local`,
    })
    .promise();
  variables.COGNITO_USER_POOL_ID =
    userPoolIdReq["StackResourceDetail"]["PhysicalResourceId"];
  variables.COGNITO_CLIENT_ID =
    userPoolClientIdReq["StackResourceDetail"]["PhysicalResourceId"];
  const envStringToWrite = Object.keys(variables)
    .map((variableKey) => {
      return `VUE_APP_${variableKey}=${variables[variableKey]}`;
    })
    .join("\n");

  fs.writeFileSync(".env.development.local", envStringToWrite);

  console.log("Environment variables written");
})();
