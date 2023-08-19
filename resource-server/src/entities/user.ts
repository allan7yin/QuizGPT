import { Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { Quiz } from "./quiz.js";

@Entity("User")
export class User {
  @PrimaryColumn()
  userId!: string;

  @OneToMany(() => Quiz, (quiz) => quiz.user, {
    cascade: true,
    eager: true,
  })
  quizzes!: Relation<Quiz[]>;
}
