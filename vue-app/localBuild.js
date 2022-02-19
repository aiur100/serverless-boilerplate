const variables = require(`.././.env.local.json`);
const fs = require("fs");

const envStringToWrite = Object.keys(variables).map(variableKey => {
    return `VUE_APP_${variableKey}=${variables[variableKey]}`
}).join("\n");

fs.writeFileSync(".env.development.local",envStringToWrite);
