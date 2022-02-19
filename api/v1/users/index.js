const express = require('express');
const router = express.Router();

router.get("/:userId", async function (req, res) {
  const params = {
    TableName: req.USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const { Item } = await req.dynamoDbClient.get(params).promise();
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user", e: error });
  }
});

router.get("/", async function (req, res) {
  req.logger.info("Users request received");
  const params = {
    TableName: req.USERS_TABLE,
  };

  try {
    const { Items } = await req.dynamoDbClient.scan(params).promise();
    if (Items) {
      res.json(Items);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

router.post("/", async function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: req.USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
    ConditionExpression: `attribute_not_exists(userId)`,
  };

  try {
    await req.dynamoDbClient.put(params).promise();
    res.json({ userId, name });
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      res.status(409).json({ error: `User ${userId} already exists` });
    } else {
      console.log(error);
      res.status(500).json({ error: "Could not create user", "users":req.USERS_TABLE,e: error});
    }
  }
});

router.delete("/", async function (req, res) {
  const { userId } = req.body;

  const params = {
    TableName: req.USERS_TABLE,
    Key: {
      userId,
    },
  };

  try {
    await req.dynamoDbClient.delete(params).promise();
    res.json({ userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not delete user", e: error });
  }
});

module.exports = router;
