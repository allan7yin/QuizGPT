import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { Question } from "./question.js";
import { QuizAttempt } from "./quizAttempt.js";

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
  questions!: Relation<Question[]>;

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
  attempts!: Relation<QuizAttempt[]>;

  //   @Column()
  //   @ManyToOne(() => User, (user) => user.quizzes)
  //   owner: User;
}
