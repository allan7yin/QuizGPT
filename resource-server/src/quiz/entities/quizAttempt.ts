import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Quiz } from "./quiz";
import { UserAnswer } from "./userAnswer";

@Entity("QuizAttempt")
export class QuizAttempt {
  @PrimaryGeneratedColumn()
  quizAttemptId: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.attempts)
  quiz: Quiz;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAttempt)
  userAnswers: UserAnswer[];

  constructor(
    quizAttemptId: number,
    quiz: Quiz,
    createdAt: Date,
    updatedAt: Date,
    userAnswers: UserAnswer[]
  ) {
    this.quizAttemptId = quizAttemptId;
    this.quiz = quiz;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userAnswers = userAnswers;
  }
}
