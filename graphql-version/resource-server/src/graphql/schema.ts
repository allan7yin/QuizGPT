export const typeDefs = `#graphql
  type Quiz {
    quizId: ID!
    title: String!
    topic: String!
    questions: [Question]!
  }

  type Question {
    questionId: ID!
    content: String!
    options: [Option]!
    answers: [Answer]!
  }

  type Option {
    optionId: ID!
    content: String!
  }

  type Answer {
    answerId: ID!
    content: String!
  }

  type Query {
    quizzes: [Quiz]
    questions: [Question]
    options: [Option]
    answers: [Answer]

    quiz(quizId: ID!): Quiz
  }

  type Mutation {
    createQuiz(createQuizRequest: CreateQuizInput): Quiz
  }
  
  input CreateQuizInput {
    title: String!,
    topic: String!,
    numberOfQuestions: Int!,
    numberOfOptionsPerQuestion: Int!
    difficulty: String!
  }
`;
