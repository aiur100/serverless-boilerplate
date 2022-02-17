# Work-Load

## Local Development

### Requirements
* Docker
* NodeJS 14+
* Run `npm install`

### Start Local Development
* In one terminal screen, run `npm run local-startup`
  - This will start the local DynamoDB process.
* Then run `npm run dev` 
  - This will start the local NodeJS Express Server. 
* Visit http://localhost:3000/v1/api/health
  - This should respond `{"version":"0.1.0"}`

### Local testing
* Uses mocha for testing
* `npm run test`