import { Entity, PrimaryColumn, OneToMany, Column } from "typeorm";
import { Question } from "./question";
import { QuizAttempt } from "./quizAttempt";
import { Cipher } from "crypto";

@Entity("Quizes")
export class Quiz {
  @PrimaryColumn()
  quizId!: string;

  @Column()
  title!: string;

  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: true,
    eager: true,
  })
  questions!: Question[];

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
  attempts!: QuizAttempt[];

  //   @Column()
  //   @ManyToOne(() => User, (user) => user.quizzes)
  //   owner: User;
}
