import { QuestionDto } from "./questionDto";
import { QuizAttemptDto } from "./quizAttemptDto";

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
