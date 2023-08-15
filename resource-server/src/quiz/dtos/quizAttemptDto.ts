import { QuizDto } from "./quizDto";
import { UserAnswerDto } from "./userAnswerDto";

export class QuizAttemptDto {
  quizAttemptId: number;
  quiz: QuizDto;
  createdAt: Date;
  updatedAt: Date;
  userAnswers: UserAnswerDto[];

  constructor(
    quizAttemptId: number,
    quiz: QuizDto,
    createdAt: Date,
    updatedAt: Date,
    userAnswers: UserAnswerDto[]
  ) {
    this.quizAttemptId = quizAttemptId;
    this.quiz = quiz;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userAnswers = userAnswers;
  }
}
