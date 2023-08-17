import cors from "cors";
import "es6-shim";
import express from "express";
import "reflect-metadata";
import dataSource from "../config/ormconfig.js";
import { quizController } from "./quiz/controllers/quizController.js";
import { getQuizRepository } from "./quiz/repositories/quizRepository.js";
import client from "./redis/redisConfig.js";

const PORT = process.env.PORT;

// Server setup code
const app = express();
app.use(express.json());
app.use(cors());

dataSource;

// redis setup code
const quizRepo = getQuizRepository();
const quizzes = await quizRepo.find({ select: ["quizId"] });
const quizIdSet = new Set(quizzes.map((quiz) => quiz.quizId));
console.log(quizIdSet);
for (let id of quizIdSet) {
  await client.sAdd("quiz-ids", id);
}

// configure api endpoints
app.use("/api/v1", quizController);
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

app.post("/redis/test", async (req, res) => {
  const quiz = await client.json.set("123", "$", req.body);
  // client.expire("123", 10);
  // const getResponse = await client.json.get("123");
  res.json(quiz);
});

app.get("/redis/test", async (req, res) => {
  const quiz = await client.json.get("123");
  if (quiz == null) {
    res.status(400).send("This entry does not exist in the databse");
  } else {
    res.status(200).json(quiz);
  }
});

// start application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
