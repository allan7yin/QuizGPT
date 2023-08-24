import { Answer } from "./AnswerInterface";
import { Option } from "./OptionInterface";

export interface Question {
  questionId: string;
  content: string;
  options: Option[];
  answers: Answer[];
}
