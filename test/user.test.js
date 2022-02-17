const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

describe("user management", function () {
  it("Create user", async function () {
    const response = await fetch(process.env.API_URL + "/users", {
      method: "POST",
      body: JSON.stringify({
        userId: "1234",
        name: "Christopher Hill",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());
    console.log(response);
  });

  it("Get users", async function () {
    const response = await fetch(process.env.API_URL + "/users").then((r) =>
      r.json()
    );
    console.log(response);
  });
});
