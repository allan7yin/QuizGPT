import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Quiz } from "./quiz";
import { UserAnswer } from "./userAnswer";

@Entity("QuizAttempt")
export class QuizAttempt {
  @PrimaryColumn()
  quizAttemptId!: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.attempts)
  quiz!: Quiz;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAttempt)
  userAnswers!: UserAnswer[];
}
