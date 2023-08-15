import { QuestionDto } from "./questionDto";

export class OptionDto {
  optionId: number;
  content: String;
  question: QuestionDto;

  constructor(optionId: number, content: String, question: QuestionDto) {
    this.optionId = optionId;
    this.content = content;
    this.question = question;
  }
}
