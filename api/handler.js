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
  require('dotenv').config();
}

const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
const log = require("lambda-log");

const PORT = process.env.PORT ?? 3000;
log.options.dev = true;
const app = express();

/**
 * Load the DynamoDB client
 * - Locally, use the locally running docker image of DynamoDB
 */
const dynamoDbClient =
  STAGE === LOCAL
    ? new AWS.DynamoDB.DocumentClient({ endpoint: "http://localhost:8000", region: process.env.REGION })
    : new AWS.DynamoDB.DocumentClient();

app.use((req, res, next) => {
  req.logger = log;
  req.dynamoDbClient = dynamoDbClient;
  req.USERS_TABLE = process.env.USERS_TABLE;
  next();
});

app.use(express.json());
app.use("/api/v1/users", require("./v1/users"));
app.get("/api/v1/health", (req, res, next) => {
  res.json({ version: VERSION });
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

if (STAGE !== LOCAL) {
  module.exports.handler = serverless(app);
} else {
  app.listen(PORT);
}
