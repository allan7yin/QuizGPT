import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

const QuizType = new GraphQLObjectType({
  name: "Quiz",
  fields: () => ({
    quizId: { type: GraphQLID },
    title: { type: GraphQLString },
    questions: { type: new GraphQLList(QuestionType) },
    attempts: { type: new GraphQLList(QuizAttemptType) },
  }),
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    questionId: { type: GraphQLID },
    content: { type: GraphQLString },
    options: { type: new GraphQLList(OptionType) },
    answers: { type: new GraphQLList(AnswerType) },
  }),
});

const OptionType = new GraphQLObjectType({
  name: "Option",
  fields: () => ({
    optionId: { type: GraphQLID },
    content: { type: GraphQLString },
  }),
});

const AnswerType = new GraphQLObjectType({
  name: "Answer",
  fields: () => ({
    answerId: { type: GraphQLID },
    content: { type: GraphQLString },
  }),
});

const QuizAttemptType = new GraphQLObjectType({
  name: "QuizAttempt",
  fields: () => ({
    quizAttemptId: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    userAnswers: { type: new GraphQLList(UserAnswerType) },
  }),
});

const UserAnswerType = new GraphQLObjectType({
  name: "UserAnswer",
  fields: () => ({
    userAnswerId: { type: GraphQLID },
    text: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        quizzes: {
            type: new GraphQLList(QuizType),
            resolve(parent, )
        }
    }
})