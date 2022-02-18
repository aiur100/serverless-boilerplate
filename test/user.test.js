const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();
const assert = require("assert");

describe("user management", function () {

  const testUser = {
    userId: "1234",
    name: "Christopher Hill",
  }

  it("Create user", async function () {
    const response = await fetch(process.env.API_URL + "/users", {
      method: "POST",
      body: JSON.stringify(testUser),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());
    console.log(response);
    assert.strictEqual(!response.error,true,JSON.stringify(response));
  });

  it("Get users", async function () {
    const response = await fetch(process.env.API_URL + "/users").then((r) =>
      r.json()
    );
    console.log(response);
  });

  it("Delete user", async function(){
    const response = await fetch(process.env.API_URL + "/users", {
        method: "DELETE",
        body: JSON.stringify(testUser),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => r.json());
      console.log(response);
  })
});
