import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Relation,
} from "typeorm";

import { Option } from "./option.js";
import { Answer } from "./answer.js";
import { Quiz } from "./quiz.js";

@Entity("Question")
export class Question {
  @PrimaryGeneratedColumn()
  questionId!: number;

  @Column()
  text!: String;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  //   @JoinColumn({ name: "questionId_fk", referencedColumnName: "questionId" })
  options!: Relation<Option[]>;

  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
  //   @JoinColumn({ name: "questionId_fk", referencedColumnName: "questionId" })
  answers!: Relation<Answer[]>;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz!: Relation<Quiz>;
}
