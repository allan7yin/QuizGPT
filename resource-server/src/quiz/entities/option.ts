import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Question } from "./question";

@Entity("Option")
export class Option {
  @PrimaryGeneratedColumn()
  optionId!: number;

  @Column()
  content!: String;

  @ManyToOne(() => Question, (question) => question.options)
  question!: Question;
}
