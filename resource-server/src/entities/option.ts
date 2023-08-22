import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Question } from "./question.js";

@Entity("Option")
export class Option {
  @PrimaryGeneratedColumn("uuid")
  optionId!: string;

  @Column()
  content!: String;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: "CASCADE",
  })
  question!: Relation<Question>;
}
