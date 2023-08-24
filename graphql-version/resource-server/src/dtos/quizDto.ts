import { QuestionDto } from "./questionDto.js";
import { QuizAttemptDto } from "./quizAttemptDto.js";

export class QuizDto {
  quizId: number;
  questions: QuestionDto[];
  attempts: QuizAttemptDto[];

  constructor(
    quizId: number,
    questions: QuestionDto[],
    attempts: QuizAttemptDto[]
  ) {
    this.quizId = quizId;
    this.questions = questions;
    this.attempts = attempts;
  }
}
