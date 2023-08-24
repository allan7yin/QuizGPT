import { AnswerDto } from "./answerDto.js";
import { OptionDto } from "./optionDto.js";
import { QuizDto } from "./quizDto.js";

export class QuestionDto {
  questionId: number;
  content: String;
  options: OptionDto[];
  answers: AnswerDto[];
  quiz: QuizDto;

  constructor(
    questionId: number,
    content: String,
    options: OptionDto[],
    answers: AnswerDto[],
    quiz: QuizDto
  ) {
    this.questionId = questionId;
    this.content = content;
    this.options = options;
    this.answers = answers;
    this.quiz = quiz;
  }
}
