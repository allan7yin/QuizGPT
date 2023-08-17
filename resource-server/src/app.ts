import express from "express";
import "reflect-metadata";
import "es6-shim";
import { dataSource } from "../config/ormconfig.js";
import { quizController } from "./quiz/controllers/quizController.js";
import { auth0JwtMiddleware } from "./middleware/authMiddleware.js";
import client from "./redis/redisConfig.js";
// import { redisQuizRepository } from "./redisOM/quiz.js";
import cors from "cors";

const PORT = process.env.PORT;

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

app.post("/redis/test", async (req, res) => {
  const quiz = await client.json.set("noderedis:jsondata", "$", req.body);
  res.send(quiz);
});

// start application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
