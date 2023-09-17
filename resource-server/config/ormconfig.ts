import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Answer } from "../src/entities/answer.js";
import { Option } from "../src/entities/option.js";
import { Question } from "../src/entities/question.js";
import { Quiz } from "../src/entities/quiz.js";
import { QuizAttempt } from "../src/entities/quizAttempt.js";
import { User } from "../src/entities/user.js";
import { UserAnswer } from "../src/entities/userAnswer.js";

dotenv.config;

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "postgres",
  port: parseInt(process.env.DB_PORT as string) || 5432,
  username: process.env.DB_USERNAME || "allan7yin",
  password: "password",
  database: process.env.DB_DATABASE || "QuizGPT",
  entities: [Quiz, QuizAttempt, Question, Answer, Option, UserAnswer, User],
  synchronize: true,
});

await dataSource
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default dataSource;
