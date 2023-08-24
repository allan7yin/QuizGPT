import QuestionList from "../Components/QuestionList";
import { useQuizData } from "../Hooks/useQuizHooks";
import "../Styles/QuizPage.css";

const QuizPage = () => {
  const { questions, answers, options, title, quizId } = useQuizData();

  return (
    <>
      <div className="quiz-container">
        <h1 className="quiz-title">{title}</h1>
        <QuestionList
          title={title}
          questions={questions}
          answers={answers}
          options={options}
          quizId={quizId}
        />
      </div>
    </>
  );
};

export default QuizPage;
