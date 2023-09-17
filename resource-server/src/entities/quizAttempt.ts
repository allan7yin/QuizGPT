import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

import { Quiz } from "./quiz.js";
import { UserAnswer } from "./userAnswer.js";

@Entity("QuizAttempt")
export class QuizAttempt {
  @PrimaryGeneratedColumn()
  quizAttemptId!: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.attempts)
  quiz!: Relation<Quiz>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAttempt, {
    onDelete: "CASCADE",
  })
  userAnswers!: Relation<UserAnswer[]>;
}
