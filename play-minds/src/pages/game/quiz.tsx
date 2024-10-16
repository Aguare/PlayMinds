import { useState } from "react";
import NavBar from "../../components/navbar";
import { QuizGame } from "@/models/Entitys/Assistant/QuizGame";
import { Game } from "@/models/Entitys/Game";
import { User } from "@/models/Entitys/User";
import { Router, useRouter } from "next/router";
import { Request } from "@/helpers/requests";
import axios from "axios";
import { QuestionOBJ } from "@/models/Entitys/Assistant/QuestionOBJ";
import { GameComplete } from "@/models/Entitys/GameComplete";
import Table from "@/components/table";
import NewComment from "@/components/newComment";
import Comments from "@/components/comment";

const Quiz = () => {
  const router = useRouter();
  var id = "default";
  if (router.query) {
    id = router.query.id as string;
  }
  var user = new User("", "", "", "", 0);
  const [quizGame, setQuizGame] = useState<QuizGame>(
    new QuizGame(
      new Game("default", "", "", "", 0, new User("", "", "", "", 0)),
      []
    )
  );

  const [questions, setQuestions] = useState<QuestionOBJ[]>([
    {
      question: {
        id: 1,
        ask: "¿En qué año se fundó la ciudad de Madrid?",
      },
      answers: [
        { id: 1, answer: "1561", isCorrect: true },
        { id: 2, answer: "1492", isCorrect: false },
        { id: 3, answer: "1605", isCorrect: false },
        { id: 4, answer: "1700", isCorrect: false },
      ],
    },
    {
      question: {
        id: 2,
        ask: "¿Qué personaje de Star Wars dijo 'Que la Fuerza te acompañe'?",
      },
      answers: [
        { id: 1, answer: "Darth Vader", isCorrect: true },
        { id: 2, answer: "Yoda", isCorrect: false },
        { id: 3, answer: "Obi-Wan Kenobi", isCorrect: false },
        { id: 4, answer: "Han Solo", isCorrect: false },
      ],
    },
    {
      question: {
        id: 3,
        ask: "¿Cuál es el país más grande del mundo?",
      },
      answers: [
        { id: 1, answer: "China", isCorrect: true },
        { id: 2, answer: "Estados Unidos", isCorrect: false },
        { id: 3, answer: "Rusia", isCorrect: false },
        { id: 4, answer: "India", isCorrect: false },
      ],
    },
    {
      question: {
        id: 4,
        ask: "¿Cuál es el animal más rápido del mundo?",
      },
      answers: [
        { id: 1, answer: "León", isCorrect: true },
        { id: 2, answer: "Guepardo", isCorrect: false },
        { id: 3, answer: "Tigre", isCorrect: false },
        { id: 4, answer: "Jaguar", isCorrect: false },
      ],
    },
  ]);

  if (
    id != "default" &&
    id != undefined &&
    quizGame.game.id_game == "default"
  ) {
    axios
      .get(Request.SERVER + "/Games/GetQuizGame?id_game=" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        let tmp = localStorage.getItem("user");
        if (tmp) {
          user = JSON.parse(tmp);
        }
        setQuizGame(response.data);
        quizGame.questions = response.data.questions;
        setQuestions(quizGame.questions);
        quizGame.game = response.data.game;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const handleAnswerButtonClick = (answerCorrect: boolean) => {
    if (answerCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      let tmp = localStorage.getItem("user");
      if (tmp) {
        tmp = JSON.parse(tmp).email;
      }
      if (tmp && quizGame.game.id_game != "default" && quizGame.game.id_game) {
        let newScore = 0;
        if (answerCorrect) {
          newScore =
            (quizGame.game.value_points / questions.length) * (score + 1);
        } else {
          newScore = (quizGame.game.value_points / questions.length) * score;
        }
        const gameC = new GameComplete(
          0,
          tmp,
          quizGame.game.id_game,
          new Date(),
          newScore
        );
        console.log(gameC);
        axios.post(Request.SERVER + "/Games/RegisterGameComplete", gameC);
      }
    }
  };

  const handleRetryButtonClick = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-[100%]">
      <NavBar />
      <div className="w-[100%] h-[100%] grid sm:grid-cols-5 grid-cols-1 place-items-center">
        <div className="sm:col-span-3 bg-[#EFEFEF] sm:w-[80%] w-[100%] border-2 rounded-lg border-[#205375] sm:mt-[20px] sm:ml-[20px] grid grid-cols-1 p-2 gap-3 place-items-center overflow-hidden">
          {showScore ? (
            <div className="quiz-result">
              <h1>Resultado</h1>
              <p>
                Acertaste {score} de {questions.length} preguntas
              </p>
              <button onClick={handleRetryButtonClick}>
                Volver a intentar
              </button>
            </div>
          ) : (
            <div className="quiz-question w-[100%]">
              <div className="p-10 w-[100%] rounded-lg bg-gradient-to-br from-teal-300 to-lime-300  bg-opacity-60 flex flex-col justify-center items-center text-center text-[white]">
                <h1 className="text-xl font-semibold text-[black]">
                  Pregunta {currentQuestion + 1}
                </h1>
                <p className="sm:text-2xl text-[black]">
                  {questions[currentQuestion].question.ask}
                </p>
              </div>
              {/*  */}

              <div className="grid grid-cols-2 gap-4 place-content-center w-[100%] h-[100%] ">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <div className="px-4 py-8 w-[100%] h-[100%]">
                    <button className="w-[100%] h-[100%] inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm sm:text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                      <span
                        className="relative w-[100%] h-[100%] px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 "
                        key={index}
                        onClick={() =>
                          handleAnswerButtonClick(answer.isCorrect)
                        }
                      >
                        {answer.answer}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="sm:col-span-2 w-[100%] flex flex-col items-center">
      <div className="w-[90%] p-4 bg-mainorange text-white rounded-md shadow-md mb-4">
        <h3 className="text-lg font-semibold text-center">Código de Juego</h3>
      </div>
      <div className="w-[90%] p-4 bg-white text-black border border-mainorange rounded-md shadow-md text-center mb-6">
        <span className="text-lg font-bold">{id ? id : 'Cargando...'}</span>
      </div>
      <div className="w-[90%]">
        <Table />
      </div>
    </div>

        <div className="sm:col-span-5 w-[100%]">
          <NewComment />
        </div>
        <div className="sm:col-span-5 w-[100%]">
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
