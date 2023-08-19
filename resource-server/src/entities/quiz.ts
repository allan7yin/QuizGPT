import { Expose } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { Question } from "./question.js";
import { QuizAttempt } from "./quizAttempt.js";

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
  })
  questions!: Relation<Question[]>;

  @Expose()
  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
  attempts!: Relation<QuizAttempt[]>;

  //   @Column()
  //   @ManyToOne(() => User, (user) => user.quizzes)
  //   owner: User;
}
