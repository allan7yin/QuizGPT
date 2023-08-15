import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { Option } from "./option";
import { Answer } from "./answer";
import { Quiz } from "./quiz";

@Entity("Question")
export class Question {
  @PrimaryGeneratedColumn()
  questionId: number;

  @Column()
  text: String;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  //   @JoinColumn({ name: "questionId_fk", referencedColumnName: "questionId" })
  options: Option[];

  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
  //   @JoinColumn({ name: "questionId_fk", referencedColumnName: "questionId" })
  answers: Answer[];

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  constructor(
    questionId: number,
    text: String,
    options: Option[],
    answers: Answer[],
    quiz: Quiz
  ) {
    this.questionId = questionId;
    this.text = text;
    this.options = options;
    this.answers = answers;
    this.quiz = quiz;
  }
}
