import { plainToInstance } from "class-transformer";
import express, { Request, Response } from "express";
import { CreateQuizRequestDto } from "../dtos/createQuizRequestDto.js";
import { QuizAttemptDto } from "../dtos/quizAttemptDto.js";
import { QuizDto } from "../dtos/quizDto.js";
import { Quiz } from "../entities/quiz.js";
import { QuizAttempt } from "../entities/quizAttempt.js";
import { QuizService } from "../services/quizService.js";
import { RabbitmqService } from "../services/rabbitmqService.js";

export const quizController = express.Router();
const quizService = new QuizService();
const rabbitmq = new RabbitmqService();
await rabbitmq.setup();
rabbitmq.consumeGptRequestMessageFromMq();

quizController.get("/healthcheck", (req: Request, res: Response) => {
  console.log(req.auth?.payload.sub);
  res.sendStatus(200);
});

quizController.post("/quiz", async (req: Request, res: Response) => {
  console.log(req.auth?.payload.sub);
  try {
    const createQuizDto = new CreateQuizRequestDto(
      req.auth?.payload.sub!,
      req.body.topic,
      req.body.title,
      req.body.numberOfQuestions,
      req.body.numberOfOptionsPerQuestion,
      req.body.difficulty
    );

    console.log(createQuizDto);
    rabbitmq.publishMessage(createQuizDto);

    // need to find it in the database, and then cache it into redis
    const quiz: Quiz = await quizService.getQuizById(createQuizDto.id);

    res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error: Unable to send to queue");
  }
});

quizController.get("/quizzes", (req: Request, res: Response) => {
  let quizzes: QuizDto[];

  try {
    quizService.getAllQuizzes(req.auth?.payload.sub!).then((result) => {
      quizzes = result.map((quiz) => plainToInstance(QuizDto, quiz));
      res.status(200).send(quizzes);
    });
  } catch (error) {
    res
      .status(400)
      .send("Error: Encountered issues while obtaining all quizzes");
  }
});

quizController.get("/quiz/:quizId", (req: Request, res: Response) => {
  let quizDto: QuizDto;
  const quizId: string = req.params.quizId;
  try {
    console.log("getting quiz with id", quizId);
    quizService.getQuizById(quizId).then((result) => {
      console.log(result);
      quizDto = plainToInstance(QuizDto, result);
      res.status(200).send(quizDto);
    });
  } catch (error) {
    res
      .status(400)
      .send("Error: Encountered issues while obtaining quiz with id ${quizId}");

    console.log(
      "Error: Encountered issues while obtaining quiz with id ${quizId}"
    );
  }
});

quizController.delete("/quiz/:quizId", (req: Request, res: Response) => {
  console.log("want to delete");
  const quizId: string = req.params.quizId;
  console.log(quizId);
  console.log(req.auth?.payload.sub!);
  try {
    quizService.deleteQuiz(req.auth?.payload.sub!, quizId);
    res.status(200).send("Deleted quiz with id ${quizId}");
  } catch (error) {
    res
      .status(400)
      .send("Error: Encountered issues when deleting quiz with id ${quizId}");
  }
});

quizController.post("/quiz/:quizId/save", (req: Request, res: Response) => {
  let quizAttemptDto: QuizAttemptDto;
  let quizAttempt: QuizAttempt;
  const quizId: string = req.params.quizId;
  try {
    const jsonData = JSON.stringify(req.body);
    console.log("Saving quiz attempt");
    quizAttemptDto = plainToInstance(QuizAttemptDto, jsonData);
    quizAttempt = plainToInstance(QuizAttempt, quizAttemptDto);

    quizService.saveQuizAttempt(quizAttempt);
    res.status(200).send(quizAttempt.quizAttemptId);
  } catch (error) {
    res
      .status(400)
      .send(
        "Error: Encountered issues when saving quiz attempt for quiz with id ${quizId}"
      );
  }
});

quizController.delete("/quiz/:quizId/delete", (req: Request, res: Response) => {
  let quizAttemptDto: QuizAttemptDto;
  const quizId: string = req.params.quizId;
  try {
    const jsonData = JSON.stringify(req.body);
    console.log("Saving quiz attempt");
    quizAttemptDto = plainToInstance(QuizAttemptDto, jsonData);

    quizService.deleteQuizAttempt(quizAttemptDto.quizAttemptId);
    res
      .status(200)
      .send(
        "Deleted quiz attempt with attemptid ${quizAttemptDto.quizAttemptId}"
      );
  } catch (error) {
    res
      .status(400)
      .send(
        "Error: Encountered issues when saving quiz attempt for quiz with id ${quizId}"
      );
  }
});
