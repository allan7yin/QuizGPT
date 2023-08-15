import express from "express";
import "reflect-metadata";
import dataSource from "../config/ormconfig";
import { rabbitMqConfig } from "./rabbitmq/rabbitMqConfig";
import { quizController } from "./quiz/controllers/quizController";

// Server setup code
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
dataSource;

rabbitMqConfig();

// configure api endpoints
app.use("/api/v1", quizController);

// start application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
