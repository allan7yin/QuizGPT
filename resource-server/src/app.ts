import express from "express";
import "reflect-metadata";
import "es6-shim";
import dataSource from "../config/ormconfig.js";
import { quizController } from "./quiz/controllers/quizController.js";
import { auth0JwtMiddleware } from "./middleware/authMiddleware.js";
const util = require("util");
const cors = require("cors");

import { createClient } from "redis";

const PORT = process.env.PORT;

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
const connect = async () => {
  try {
    await client.connect();
    console.log("redis connected");

    await client.set("name", "Allan");
    const value = await client.get("name");
    console.log(value);
  } catch (error) {
    console.log("connection unsuccessful");
  }
};
connect();

// const redisUrl = "redis://127.0.0.1:6379";
// const client = redis.createClient(redisUrl);

// client.set = util.promisify(client.set);
// Server setup code
const app = express();
app.use(express.json());
app.use(cors());
dataSource;

// configure api endpoints
app.use("/api/v1", auth0JwtMiddleware, quizController);
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// app.post("/", async (req, res) => {
//   const { key, value } = req.body;
//   const response = await client.set(key, value);
//   res.status(200).json(response);
// });

// start application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
