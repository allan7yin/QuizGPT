import { Question } from "./QuestionInterface";

export interface Quiz {
  quizId: string;
  title: string;
  questions: Question[];
}
