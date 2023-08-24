import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { Question } from "./question.js";
import { QuizAttempt } from "./quizAttempt.js";
import { User } from "./user.js";

@Entity("Quizes")
export class Quiz {
  @Expose()
  @PrimaryColumn()
  quizId!: string;

  @Expose()
  @Column()
  title!: string;

  @Expose()
  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  questions!: Relation<Question[]>;

  @Expose()
  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz, {
    onDelete: "CASCADE",
  })
  attempts!: Relation<QuizAttempt[]>;

  @ManyToOne(() => User, (user) => user.quizzes, { onDelete: "CASCADE" })
  user!: User;
}
