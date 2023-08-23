import { useMutation } from "@apollo/client";
import { Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizForm } from "../Hooks/useQuizForm";
import {
  Content,
  EncapsulatingContainer,
  Form,
  LeftContainer,
  RightContainer,
} from "../Styles/MaterialUIStyledComponents/CreateQuizPageComponents";
import { CREATE_QUIZ_MUTATION } from "../graphql/Mutations";

const CreateQuizPage = () => {
  const accessToken = localStorage.getItem("token");
  const [createQuiz, { error, data }] = useMutation(CREATE_QUIZ_MUTATION, {
    context: {
      headers: {
        Authorization: accessToken,
      },
    },
  });
  const navigate = useNavigate();

  const {
    inputTitle,
    inputNumOptions,
    inputNumQuestions,
    inputTopic,
    inputDifficulty,
    setInputNumQuestions,
    setInputDifficulty,
    setInputNumOptions,
    setInputTopic,
    setInputTitle,
  } = useQuizForm();

  const handleNumericInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setterFunction: {
      (value: SetStateAction<string>): void;
      (value: SetStateAction<string>): void;
      (arg0: any): void;
    }
  ) => {
    const input = event.target.value;

    if (/^\d*$/.test(input)) {
      setterFunction(input);
    }
  };

  const handleQuizCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      title: inputTitle,
      topic: inputTopic,
      numberOfQuestions: inputNumQuestions,
      numberOfOptionsPerQuestion: inputNumOptions,
      difficulty: inputDifficulty,
    });

    const response = await createQuiz({
      variables: {
        CreateQuizInput: {
          title: inputTitle,
          topic: inputTopic,
          numberOfQuestions: parseInt(inputNumQuestions),
          numberOfOptionsPerQuestion: parseInt(inputNumOptions),
          difficulty: inputDifficulty,
        },
      },
    });

    if (error) {
      console.log(error);
    } else {
      const quiz = response.data.createQuiz;
      console.log(quiz);
      navigate(`/quiz/${quiz.quizId}`, { state: quiz });
    }
  };

  return (
    <>
      <EncapsulatingContainer>
        <LeftContainer>
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            fontSize="50px"
            fontWeight="lighter"
            gutterBottom
          >
            Create Quiz
          </Typography>
          <Form onSubmit={handleQuizCreate}>
            <TextField
              id="filled-basic"
              label="Title"
              variant="filled"
              color="primary"
              fullWidth
              margin="normal"
              value={inputTitle}
              onChange={(event) => setInputTitle(event.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Topic"
              variant="filled"
              fullWidth
              margin="normal"
              value={inputTopic}
              onChange={(event) => setInputTopic(event.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Number of Questions"
              variant="filled"
              fullWidth
              margin="normal"
              value={inputNumQuestions}
              onChange={(e) =>
                handleNumericInputChange(e, setInputNumQuestions)
              }
              inputProps={{
                pattern: "[0-9]*", // Use a pattern to allow only digits
              }}
            />
            <TextField
              id="filled-basic"
              label="Number of Options"
              variant="filled"
              fullWidth
              margin="normal"
              value={inputNumOptions}
              onChange={(e) => handleNumericInputChange(e, setInputNumOptions)}
              inputProps={{
                pattern: "[0-9]*", // Use a pattern to allow only digits
              }}
            />
            <TextField
              id="filled-basic"
              label="Difficulty"
              variant="filled"
              fullWidth
              margin="normal"
              value={inputDifficulty}
              onChange={(e) => setInputDifficulty(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                margin: "5%",
              }}
            >
              Submit
            </Button>
          </Form>
        </LeftContainer>
        <RightContainer>
          <Content></Content>
        </RightContainer>
      </EncapsulatingContainer>
    </>
  );
};

export default CreateQuizPage;
