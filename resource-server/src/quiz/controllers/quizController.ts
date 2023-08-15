import express, { Request, Response } from "express";
import { QuizService } from "../services/quizService";
import { RabbitMqService } from "../services/rabbitMqService";
import { plainToInstance } from "class-transformer";
import { CreateQuizRequestDto } from "../dtos/createQuizRequestDto";
import { QuizDto } from "../dtos/quizDto";

export const quizController = express.Router();
const quizService = new QuizService();
const rabbitMqService = new RabbitMqService();

quizController.post("/quiz", (req: Request, res: Response) => {
  try {
    const jsonData = JSON.stringify(req.body);

    const quizDto: CreateQuizRequestDto = plainToInstance(
      CreateQuizRequestDto,
      jsonData
    );

    console.log("Sending create quiz request to publishing exchange", quizDto);
    rabbitMqService.sendMessageToGptQueue(quizDto);
    res.status(200).send("Message sent to queue");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error: Unable to send to queue");
  }
});

quizController.get("/quizzes", (req: Request, res: Response) => {
  let quizzes: QuizDto[];
  try {
    quizService.getAllQuizzes().then((result) => {
      console.log(result);
      quizzes = result.map((quiz) => plainToInstance(QuizDto, quiz));
      console.log(quizzes);
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

quizController.delete("./quiz/:quizId", (req: Request, res: Response) => {
  const quizId: string = req.params.quizId;
  try {
    quizService.deleteQuiz(quizId);
    res.status(200).send("Deleted quiz with id ${quizId}");
  } catch (error) {
    res.status(400).send("Deleted quiz with id ${quizId}");
  }
});
