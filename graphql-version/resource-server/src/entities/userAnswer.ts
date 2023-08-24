import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { QuizAttempt } from "./quizAttempt.js";

@Entity("UserAnswer")
export class UserAnswer {
  @PrimaryGeneratedColumn("uuid")
  userAnswerId!: number;

  @ManyToOne(() => QuizAttempt, (quizAttempt) => quizAttempt.userAnswers)
  quizAttempt!: Relation<QuizAttempt>;

  @Column()
  text!: String;
}
