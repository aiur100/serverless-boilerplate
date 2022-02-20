# Serverless Boiler-plate

Clone this project to start a new serverless API + VUE app. 
Just update the .env.local.json file to get started by inputing
your `SERVICE_NAME`, whatever you are all calling your project, and
your `AWS_PROFILE` should match the AWS creds you want to use, i.e. the 
AWS account you are using. 

If you don't know what I mean by `AWS_PROFILE` then you need to 
look up the AWS CLI. 

I appreciate AWS Amplify and other services that help 
speed up the development/POC process. However, I want my own 
thing that allows me to start up a typical serverless API + SPA 
stack. 

The emphasis for this project is creating a great 
*local development experience*. 

* This is meant to be deployed using the serverless framework. 
* **Local dev** we use the serverless framework `serverless.yml` to define local stacks.
  * https://www.serverless.com/framework

## Clone, Rename and Go
* `git clone https://github.com/aiur100/serverless-boilerplate.git`
* `mv serverless-boilerplate <your-app-name>`
* `cd <your-app-name>`
* Remove association to *this* git repo `rm -rf .git`

## Local Development

Local development uses *LocalStack* to host an AWS Cloud. 
We will compile the `serverless framework`  cloudformation
definition in `serverless.yml` locally. 

### Requirements
* AWS CLI
* Docker
* NodeJS 14+
* Run `npm install`

### Start Local Development
* Update your `.env.local.json` file with your service name - SERVICE_NAME
* Update your `.env.local.json` file with the name of your AWS profile name.  
  * This is configured and named in ~/.aws/credentials
* Run `npm run local-up`
  - This will start the local AWS Stack (LocalStack)
  - This will then run the Cloud Formation on that stack.
  - **You should re-run this anytime you add a resource to `serverless.yml`**
  - This will start the local NodeJS Express Server. 
  - Finnally, this will start the web app.
* Visit http://localhost:3001/api/v1/health to confirm that the API is online
  - This should respond `{"version":"0.1.0"}`
* Visit http://localhost:8080/ to confirm that the web site is running

### Bring the Local Development Environment Down When You Are Down
### `npm run local-down`

### Local testing
* Uses mocha for testing
* Tests are in the `test` directory
* Run tests: `npm run test`


## Production / Stage Deployment
* **REQUIRED:** A `.env.<stage>.json` is required for the stage you are deploying to and should have 
  variables the pertaining to that stage.  
* Deploying to a *stage* environment. 
  * **DEV** `npm run dev-deploy`
  * **PROD** `npm run prod-deploy`

## TODO
* Create a password storage flow. 
* Create a fake endpoint that is protected by authorization. 
* DONE Create a command that starts up the *whole* environment
* DONE - Figure out how to add local s3 service 
  * DONE - Possibly this https://docs.localstack.cloud/get-started/#docker
* Create a remove stack flow

## Deployment flow
* Deploy CF stack 
* Build production ENV variables for web app
* If API_URL is missing, go to deployed stack and add it from API Gateway Resource. 
* If API_URL is NOT missing, simply skip the above step and add it to ENV. 