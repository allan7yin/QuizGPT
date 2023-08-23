import { gql } from "@apollo/client";

export const LOAD_QUIZZES_TITLE = gql`
  query getQuizzes {
    quizzes {
      quizId
      title
    }
  }
`;

export const LOAD_QUIZ_COMPLETE_DATA = gql`
  query getQuiz($quizId: ID!) {
    quiz(quizId: $quizId) {
      quizId
      title
      questions {
        questionId
        content
        options {
          optionId
          content
        }
        answers {
          answerId
          content
        }
      }
    }
  }
`;
