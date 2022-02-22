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

### AWS Resources
* All AWS resources should be defined in the `./stack/` directory as `.yml` files. 
* 

### AWS Cognito Configuration
* Your AWS Cognito configuration is defined in `./stack/cognito.yml`
* This is the same configuration that is used for local and any other remote stage. 

## Production / Stage Deployment
* **REQUIRED:** 
  * A `.env.<stage>.json` is required for the stage you are deploying to and should have 
  variables the pertaining to that stage.  
  * *Copy* the `.env.local.json` file to your `.env.<stage>.json` and 
  make changes so that you have unique stage variable values where needed. 
  * i.e. You should have a different
  `STATIC_BUCKET` value per environment. You can usually just prefix with `dev-`.
  * *REMOVE* the API_URL entry if you don't have a domain you want to use. 
    * This will allow the created API gateway to be used.
* Once you have your Environment variable file configured, Deploying to a *stage* 
environment. 
  * **DEV** `npm run dev-deploy`
  * **PROD** `npm run prod-deploy`
  * These are the only two stages right now.  If you want another one, just create a new script in `package.json` and emulate 
    the above two scripts.

### Bringing down your stage deployment

#### `npm run dev-remove`
#### `npm run prod-remove`


