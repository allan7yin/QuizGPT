import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question";

@Entity("Answer")
export class Answer {
  @PrimaryGeneratedColumn()
  answerId: number;

  @Column()
  content: String;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;

  constructor(answerId: number, content: String, question: Question) {
    this.answerId = answerId;
    this.content = content;
    this.question = question;
  }
}
