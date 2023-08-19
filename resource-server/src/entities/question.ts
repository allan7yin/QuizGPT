import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

import { Answer } from "./answer.js";
import { Option } from "./option.js";
import { Quiz } from "./quiz.js";

@Entity("Question")
export class Question {
  @PrimaryGeneratedColumn()
  questionId!: number;

  @Column()
  content!: String;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  //   @JoinColumn({ name: "questionId_fk", referencedColumnName: "questionId" })
  options!: Relation<Option[]>;

  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
  //   @JoinColumn({ name: "questionId_fk", referencedColumnName: "questionId" })
  answers!: Relation<Answer[]>;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz!: Relation<Quiz>;
}
