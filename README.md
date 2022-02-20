# Serverless Boiler-plate

I made this for myself so I don't have to keep re-inventing
this process every time.

Clone this project to start a new serverless API + VUE app.
Develop locally with ease, and deploy your entire stack to 
AWS with a single command without having to set-up all the resources.

Using the power of serverless framework, Docker and the AWS CLI, 
I make my life easier.

**I know, I know:** I appreciate AWS Amplify and other services that help 
speed up the development/POC process, but I want a lot more 
control.

The emphasis for this project is creating a great 
*local development experience* for myself.

* This is meant to be deployed using the serverless framework. 
* **Local dev** we use the serverless framework `serverless.yml` to define local stacks.
  * https://www.serverless.com/framework

### Requirements
* AWS CLI
* Docker
* NodeJS 14+
* Globally installed serverless framework
  * If you don't have it, run `npm install -g serverless`

### Stacks on Stacks
* Vue3
* Express
* DynamoDB 
* S3 
* Lambda

## Quick Start

If you have all the requirements installed locally, you can 
follow this quick start guide.

* #### `git clone https://github.com/aiur100/serverless-boilerplate.git`
* #### `mv serverless-boilerplate <your-app-name> && cd <your-app-name>`
* #### Remove association to **this** git repo `rm -rf .git`
* #### Start Local Environment `npm run local-up`

## Local Development

Local development uses *LocalStack* to host an AWS Cloud. 
We will compile the `serverless framework`  cloudformation
definition in `serverless.yml` locally. 

### Start Local Development
1. Update your `.env.local.json` file by changing the values for these keys.
  * `SERVICE_NAME` - The name of your service with no spaces. 
  * `WEB_APP_NAME` - The name of your web app (spaces encouraged)
  * `AWS_PROFILE` - The name of your AWS CLI profile. Defaults to `default`.   
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