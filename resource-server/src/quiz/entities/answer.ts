import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Question } from "./question.js";

@Entity("Answer")
export class Answer {
  @PrimaryGeneratedColumn()
  answerId!: number;

  @Column()
  content!: String;

  @ManyToOne(() => Question, (question) => question.options)
  question!: Relation<Question>;
}
