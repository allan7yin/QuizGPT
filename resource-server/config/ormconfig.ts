import { DataSource } from "typeorm";
import { MqResponse } from "../src/account/entities/mqResponse";
import dotenv from "dotenv";
import { Quiz } from "../src/quiz/entities/quiz";
import { QuizAttempt } from "../src/quiz/entities/quizAttempt";
import { Question } from "../src/quiz/entities/question";
import { Answer } from "../src/quiz/entities/answer";
import { Option } from "../src/quiz/entities/option";
import { UserAnswer } from "../src/quiz/entities/userAnswer";

dotenv.config;

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "allanyin",
  password: "",
  database: "QuizGPT",
  entities: [
    MqResponse,
    Quiz,
    QuizAttempt,
    Question,
    Answer,
    Option,
    UserAnswer,
  ],
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default dataSource;
