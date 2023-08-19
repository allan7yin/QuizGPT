import { QuizAttemptDto } from "./quizAttemptDto.js";

export class UserAnswerDto {
  userAnswerId: number;
  quizAttempt: QuizAttemptDto;
  text: String;

  constructor(userAnswerId: number, quizAttempt: QuizAttemptDto, text: String) {
    this.userAnswerId = userAnswerId;
    this.quizAttempt = quizAttempt;
    this.text = text;
  }
}
