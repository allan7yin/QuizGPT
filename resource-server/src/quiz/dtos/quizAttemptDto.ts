import { QuizDto } from "./quizDto";
import { UserAnswerDto } from "./userAnswerDto";
import { v4 as uuidv4 } from "uuid";

export class QuizAttemptDto {
  quizAttemptId: string;
  quizId: string;
  createdAt: Date;
  updatedAt: Date;
  userAnswers: UserAnswerDto[];

  constructor(quizId: string, userAnswers: UserAnswerDto[]) {
    this.quizAttemptId = uuidv4();
    this.quizId = quizId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.userAnswers = userAnswers;
  }

  // when user saves a Quiz attempt, pass the quizId and the userAnswers
}
