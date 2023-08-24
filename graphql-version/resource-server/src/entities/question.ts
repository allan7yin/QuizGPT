import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

import { Exclude } from "class-transformer";
import { Answer } from "./answer.js";
import { Option } from "./option.js";
import { Quiz } from "./quiz.js";

@Entity("Question")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  questionId!: string;

  @Column()
  content!: string;

  @Exclude()
  @OneToMany(() => Option, (option) => option.question, {
    cascade: true,
    onDelete: "CASCADE",
  })
  //   @JoinColumn({ name: "questionId_fk", referencedColumnName: "questionId" })
  options!: Relation<Option[]>;

  @Exclude()
  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
    onDelete: "CASCADE",
  })
  //   @JoinColumn({ name: "questionId_fk", referencedColumnName: "questionId" })
  answers!: Relation<Answer[]>;

  @Exclude()
  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: "CASCADE",
  })
  quiz!: Relation<Quiz>;
}
