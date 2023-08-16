import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizAttempt } from "./quizAttempt";

@Entity("UserAnswer")
export class UserAnswer {
  @PrimaryGeneratedColumn()
  userAnswerId!: number;

  @ManyToOne(() => QuizAttempt, (quizAttempt) => quizAttempt.userAnswers)
  quizAttempt!: QuizAttempt;

  @Column()
  text!: String;
}
