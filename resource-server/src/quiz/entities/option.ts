import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Question } from "./question";

@Entity("Option")
export class Option {
  @PrimaryGeneratedColumn()
  optionId: number;

  @Column()
  content: String;

  @Column()
  @ManyToOne(() => Question, (question) => question.options)
  question: Question;

  constructor(optionId: number, content: String, question: Question) {
    this.optionId = optionId;
    this.content = content;
    this.question = question;
  }
}
