import express, { Request, Response, json } from "express";
import { QuizService } from "../services/quizService";
import { RabbitmqService } from "../services/rabbitmqService";
import { plainToInstance } from "class-transformer";
import { CreateQuizRequestDto } from "../dtos/createQuizRequestDto";
import { QuizDto } from "../dtos/quizDto";
import { QuizAttemptDto } from "../dtos/quizAttemptDto";
import { QuizAttempt } from "../entities/quizAttempt";
import { Quiz } from "../entities/quiz";

export const quizController = express.Router();
const quizService = new QuizService();
const rabbitmq = new RabbitmqService();
rabbitmq.setup();
rabbitmq.consumeGptRequestMessageFromMq();

quizController.post("/quiz", async (req: Request, res: Response) => {
  try {
    const quizDto = new CreateQuizRequestDto(
      req.body.topic,
      req.body.title,
      req.body.numberOfQuestions,
      req.body.numberOfOptionsPerQuestion,
      req.body.difficulty
    );

    console.log(quizDto);
    rabbitmq.publishMessage(quizDto);

    // need to find it in the database, and then send it back
    const quiz: Quiz = await quizService.getQuizById(quizDto.id);
    res.status(200).send(JSON.stringify(quiz)); // send id back to client to use, can save next time and attach the id as query parameter
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
    res
      .status(400)
      .send("Error: Encountered issues when deleting quiz with id ${quizId}");
  }
});

quizController.post("./quiz/:quizId/save", (req: Request, res: Response) => {
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

quizController.post("./quiz/:quizId/save", (req: Request, res: Response) => {
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

quizController.delete(
  "./quiz/:quizId/delete",
  (req: Request, res: Response) => {
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
  }
);
