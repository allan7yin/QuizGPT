import cors from "cors";
import dotenv from "dotenv";
import "es6-shim";
import express from "express";
import "reflect-metadata";
import dataSource from "../config/ormconfig.js";
import swaggerDocs from "../swagger/swagger.js";
import { quizController } from "./controllers/quizController.js";
import { auth0JwtMiddleware } from "./middleware/authMiddleware.js";
import client from "./redis/redisConfig.js";
import { getQuizRepository } from "./repositories/quizRepository.js";
import { getUserRepository } from "./repositories/userRepository.js";

dotenv.config();

const PORT = parseInt(process.env.PORT!);

// Server setup code
const app = express();
app.use(express.json());
app.use(cors());

dataSource;

// redis setup code, map userId -> set of quizId
const userRepo = getUserRepository();
const quizRepo = getQuizRepository();

const usersWithQuizIds = await userRepo
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.quizzes", "quiz")
  .select(["user.userId", "quiz.quizId"])
  .getMany();

usersWithQuizIds.forEach((user) => {
  user.quizzes.forEach(async (quiz) => {
    await client.sAdd(user.userId, quiz.quizId);
  });
});

// configure api endpoints
app.use("/api/v1", auth0JwtMiddleware, quizController);
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
  swaggerDocs(app, PORT);
});
