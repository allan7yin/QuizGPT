import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

import { Quiz } from "./quiz.js";
import { UserAnswer } from "./userAnswer.js";

@Entity("QuizAttempt")
export class QuizAttempt {
  @PrimaryColumn()
  quizAttemptId!: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.attempts)
  quiz!: Relation<Quiz>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAttempt)
  userAnswers!: Relation<UserAnswer[]>;
}
