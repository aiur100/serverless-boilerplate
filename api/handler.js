"use strict";
/**
 * ------ LOCAL vs LIVE STAGE ---------
 * 
 * Local configurations allow this 
 * Express JS script to be run in the local context. 
 * 
 * For local set-ups. 
 * 1. If local load the .env environment variables. 
 * 2. If local, load Dynamo DB client with the localhost version of DynamoDB 
 * 
 * ------------------------------------
 */
const LOCAL = "local";
const STAGE = process.env.STAGE ?? LOCAL;
const VERSION = "0.1.0";

if(LOCAL === STAGE){
  process.env = { ...process.env, ...(require("../.env.local.json")) }
}

const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
// https://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors');
const log = require("lambda-log"); 
log.options.dev = true;
const app = express();

const AWS_CONFIG = {
  region: process.env.REGION
};

if(STAGE === LOCAL){
  AWS_CONFIG.endpoint = process.env.AWS_URL;
}

/**
 * Load the DynamoDB client
 * - Locally, use the locally running docker image of DynamoDB
 */

app.use((req, res, next) => {
  req.logger = log;
  req.dynamoDbClient = new AWS.DynamoDB.DocumentClient(AWS_CONFIG);
  req.s3Client = new AWS.S3(AWS_CONFIG);
  req.USERS_TABLE = process.env.USERS_TABLE;
  next();
});

app.use(express.json());
app.use(cors());

/**
 * API Routes
 * ------------------------
 */
app.use("/api/v1/users", require("./v1/users"));
app.get("/api/v1/health", (req, res, next) => {
  res.json({ version: VERSION, stage: STAGE, env: process.env });
})


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// if local, run a normal server, if deployed, use the serverless function
if (STAGE !== LOCAL) {
  module.exports.handler = serverless(app);
} else {
  const PORT = process.env.API_PORT ?? 3000;
  app.listen(PORT);
}
