import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizAttempt } from "./quizAttempt";

@Entity("UserAnswer")
export class UserAnswer {
  @PrimaryGeneratedColumn()
  userAnswerId: number;

  @ManyToOne(() => QuizAttempt, (quizAttempt) => quizAttempt.userAnswers)
  quizAttempt: QuizAttempt;

  @Column()
  text: String;

  constructor(userAnswerId: number, quizAttempt: QuizAttempt, text: String) {
    this.userAnswerId = userAnswerId;
    this.quizAttempt = quizAttempt;
    this.text = text;
  }
}
