import { AnswerDto } from "./answerDto";
import { OptionDto } from "./optionDto";
import { QuizDto } from "./quizDto";

export class QuestionDto {
  questionId: number;
  text: String;
  options: OptionDto[];
  answers: AnswerDto[];
  quiz: QuizDto;

  constructor(
    questionId: number,
    text: String,
    options: OptionDto[],
    answers: AnswerDto[],
    quiz: QuizDto
  ) {
    this.questionId = questionId;
    this.text = text;
    this.options = options;
    this.answers = answers;
    this.quiz = quiz;
  }
}