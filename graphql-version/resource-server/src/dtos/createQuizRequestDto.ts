import { Long } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class CreateQuizRequestDto {
  id: string;
  userId: string;
  title: String;
  topic: String;
  numberOfQuestions: Long;
  numberOfOptionsPerQuestion: Long;
  difficulty: String;

  constructor(
    userId: string,
    topic: String,
    title: String,
    numberOfQuestions: Long,
    numberOfOptionsPerQuestion: Long,
    difficulty: String
  ) {
    this.id = uuidv4();
    this.userId = userId;
    this.title = title;
    this.topic = topic;
    this.numberOfQuestions = numberOfQuestions;
    this.numberOfOptionsPerQuestion = numberOfOptionsPerQuestion;
    this.difficulty = difficulty;
  }
}
