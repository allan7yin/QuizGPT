import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Question } from "./question";
import { QuizAttempt } from "./quizAttempt";

@Entity("Quizes")
export class Quiz {
  @PrimaryGeneratedColumn()
  quizId: number;

  @Column()
  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: true,
    eager: true,
  })
  questions: Question[];

  @Column()
  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
  attempts: QuizAttempt[];

  //   @Column()
  //   @ManyToOne(() => User, (user) => user.quizzes)
  //   owner: User;

  constructor(quizId: number, questions: Question[], attempts: QuizAttempt[]) {
    this.quizId = quizId;
    this.questions = questions;
    this.attempts = attempts;
  }
}
