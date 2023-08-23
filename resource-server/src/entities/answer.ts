import { Exclude } from "class-transformer";
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
  @PrimaryGeneratedColumn("uuid")
  answerId!: string;

  @Column()
  content!: String;

  @Exclude()
  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: "CASCADE",
  })
  question!: Relation<Question>;
}
