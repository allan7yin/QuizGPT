import { QuestionDto } from "./questionDto.js";

export class AnswerDto {
  answerId: number;
  content: String;
  question: QuestionDto;

  constructor(answerId: number, content: String, question: QuestionDto) {
    this.answerId = answerId;
    this.content = content;
    this.question = question;
  }
}
