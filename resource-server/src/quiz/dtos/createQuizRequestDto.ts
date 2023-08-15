import { Long } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class CreateQuizRequestDto {
  id: string; // make thus UUID
  topic: String;
  numberOfQuestions: Long;
  numberOfOptionsPerQuestion: Long;
  difficulty: String;

  constructor(
    topic: String,
    numberOfQuestions: Long,
    numberOfOptionsPerQuestion: Long,
    difficulty: String
  ) {
    this.id = uuidv4();
    this.topic = topic;
    this.numberOfQuestions = numberOfQuestions;
    this.numberOfOptionsPerQuestion = numberOfOptionsPerQuestion;
    this.difficulty = difficulty;
  }
}
