import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from "typeorm";
import { Question } from "./question.js";

@Entity("Option")
export class Option {
  @PrimaryGeneratedColumn()
  optionId!: number;

  @Column()
  content!: String;

  @ManyToOne(() => Question, (question) => question.options)
  question!: Relation<Question>;
}
