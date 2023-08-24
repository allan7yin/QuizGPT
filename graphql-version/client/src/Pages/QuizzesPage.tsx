import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApi } from "unsplash-js";
import BasicModal from "../Components/Modal";
import { Quiz } from "../Interfaces/QuizInterface";
import { DELETE_QUIZ_MUTATION } from "../graphql/Mutations";
import { LOAD_QUIZZES_TITLE } from "../graphql/Queries";

const unsplash = createApi({
  accessKey: "U02Os41iR5j0Dqdvx5pY9bOEz8gjCubjq6b5x8mvsZE",
});

const QuizzesPage: FC = () => {
  const accessToken = localStorage.getItem("token");
  console.log(accessToken);
  const { loading, data } = useQuery(LOAD_QUIZZES_TITLE, {
    context: {
      headers: {
        Authorization: accessToken,
      },
    },
  });

  const [deleteQuiz, { error }] = useMutation(DELETE_QUIZ_MUTATION, {
    context: {
      headers: {
        Authorization: accessToken,
      },
    },
  });

  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleCreateQuiz = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/createQuiz");
  };

  useEffect(() => {
    if (data) {
      setQuizzes(data.quizzes);
    }
  }, [data]);

  const handleDelete = async (quizId: string) => {
    await deleteQuiz({
      variables: {
        quizId,
      },
    });

    if (error) {
      console.log(error);
    } else {
      console.log("Deleted quiz");
      setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
      setConfirmModalOpen(false);
    }
  };

  const handleViewQuiz = async (quiz: Quiz) => {
    // Inside a function or event handler
    navigate(`/quiz/${quiz.quizId}`, { state: quiz.quizId });
  };

  return (
    <>
      <main>
        <div>
          <Container maxWidth="sm" style={{ marginTop: "3%" }}>
            {" "}
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              fontSize="2.7vw;"
              fontWeight="lighter"
              gutterBottom
            >
              My Quizzes
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Here, you can access all your past quizzes, retake them, or delete
              them
            </Typography>
            <div>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateQuiz}
                  >
                    + Create a Quiz
                  </Button>
                </Grid>

                <Grid item>
                  <Button variant="contained" color="primary">
                    Export all Quizzes
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        {quizzes.length > 0 ? (
          <Container
            maxWidth="md"
            sx={{
              padding: "20px 0",
            }}
          >
            <Grid container spacing={4}>
              {quizzes.map((quiz, index) => (
                <Grid item key={quiz.quizId} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      image="https://source.unsplash.com/rMmibFe4czY"
                      title={quiz.title}
                      sx={{
                        paddingTop: "56.25%",
                      }}
                    />{" "}
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {quiz.title}
                      </Typography>
                      <Typography>Quiz #{index + 1}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleViewQuiz(quiz);
                        }}
                      >
                        {" "}
                        View{" "}
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => setConfirmModalOpen(true)}
                      >
                        {" "}
                        Delete{" "}
                      </Button>

                      {isConfirmModalOpen && (
                        <BasicModal
                          open={isConfirmModalOpen}
                          onClose={() => setConfirmModalOpen(false)}
                          modalTitle="Confirmation"
                          modalMessage="Are you sure you want to delete this quiz?"
                          handleConfirm={() => {
                            handleDelete(quiz.quizId);
                          }}
                        />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <p></p>
        )}
      </main>
    </>
  );
};

export default QuizzesPage;
