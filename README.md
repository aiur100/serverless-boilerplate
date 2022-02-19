# Serverless Boiler-plate

I appreciate AWS Amplify and other services that help 
speed up the development/POC process. However, I want my own 
thing that allows me to start up a typical serverless API + SPA 
stack. 

The emphasis for this project is creating a great 
*local development experience*. 

* This is meant to be deployed using the serverless framework. 
* **Local dev** we use the serverless framework `serverless.yml` to define local stacks.
  * https://www.serverless.com/framework

## Local Development

Local development uses *LocalStack* to host an AWS Cloud. 
We will compile the `serverless framework`  cloudformation
definition in `serverless.yml` locally. 

### Requirements
* Docker
* NodeJS 14+
* Run `npm install`

### Start Local Development
* Run `npm run local-up`
  - This will start the local AWS Stack (LocalStack)
  - This will then run the Cloud Formation on that stack.
  - **You should run this anytime you add a resource to `serverless.yml`**
* Then run `npm run dev` 
  - This will start the local NodeJS Express Server. 
* Visit http://localhost:3000/v1/api/health
  - This should respond `{"version":"0.1.0"}`

### Bring the Local Development Environment Down When You Are Down
### `npm run local-down`

### Local testing
* Uses mocha for testing
* Tests are in the `test` directory
* Run tests: `npm run test`


## Production / Stage Deployment
* A `.env.<stage>.json` is required. 

## TODO
* Create a password storage flow. 
* Create a fake endpoint that is protected by authorization. 
* Create a command that starts up the *whole* environment
* Create a seperate command that just updates the stack
* DONE - Figure out how to add local s3 service 
  * DONE - Possibly this https://docs.localstack.cloud/get-started/#docker