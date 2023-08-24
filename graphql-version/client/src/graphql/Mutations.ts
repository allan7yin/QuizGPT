import { gql } from "@apollo/client";

export const CREATE_QUIZ_MUTATION = gql`
  mutation createQuiz($CreateQuizInput: CreateQuizInput) {
    createQuiz(createQuizRequest: $CreateQuizInput) {
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

export const DELETE_QUIZ_MUTATION = gql`
  mutation deleteQuiz($quizId: ID!) {
    deleteQuiz(quizId: $quizId) {
      quizId
      title
    }
  }
`;
