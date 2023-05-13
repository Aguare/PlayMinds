import { useState } from 'react'
import NavBar from '../../components/navbar'

interface Question {
  question: string
  answers: Answer[]
}

interface Answer {
  text: string
  correct: boolean
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: '¿En qué año se fundó la ciudad de Madrid?',
      answers: [
        { text: '1561', correct: true },
        { text: '1492', correct: false },
        { text: '1605', correct: false },
        { text: '1700', correct: false },
      ],
    },
    {
      question: "¿Qué personaje de Star Wars dijo 'Que la Fuerza te acompañe'?",
      answers: [
        { text: 'Darth Vader', correct: false },
        { text: 'Yoda', correct: true },
        { text: 'Obi-Wan Kenobi', correct: false },
        { text: 'Han Solo', correct: false },
      ],
    },
    {
      question: '¿Cuál es el país más grande del mundo?',
      answers: [
        { text: 'China', correct: false },
        { text: 'Estados Unidos', correct: false },
        { text: 'Rusia', correct: true },
        { text: 'India', correct: false },
      ],
    },
    {
      question: '¿Cuál es el animal más rápido del mundo?',
      answers: [
        { text: 'León', correct: false },
        { text: 'Guepardo', correct: true },
        { text: 'Tigre', correct: false },
        { text: 'Jaguar', correct: false },
      ],
    },
  ])

  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [showScore, setShowScore] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  const handleAnswerButtonClick = (answerCorrect: boolean) => {
    if (answerCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  const handleRetryButtonClick = () => {
    setCurrentQuestion(0)
    setShowScore(false)
    setScore(0)
  }

  return (
    <div className="bg-gray-100 min-h-screen w-[100%]">
      <NavBar />
      <div className=" bg-[#EFEFEF] sm:w-[60%] w-[100%] border-2 rounded-lg border-[#205375] sm:mt-[20px] sm:ml-[20px] grid grid-cols-1 p-2 gap-3 place-items-center overflow-hidden">
        {showScore ? (
          <div className="quiz-result">
            <h1>Resultado</h1>
            <p>
              Acertaste {score} de {questions.length} preguntas
            </p>
            <button onClick={handleRetryButtonClick}>Volver a intentar</button>
          </div>
        ) : (
          <div className="quiz-question ">
            <div className="p-10 rounded-lg bg-gray-900 bg-opacity-60 flex flex-col justify-center items-center text-center text-[white]">
              <h1 className="text-xl font-semibold text-mainorange">
                Pregunta {currentQuestion + 1}
              </h1>
              <p className="sm:text-2xl">
                {questions[currentQuestion].question}
              </p>
            </div>
            {/*  */}

            <div className="flex flex-wrap items-center justify-center">
              {questions[currentQuestion].answers.map((answer, index) => (
                <div className="px-4 py-8 ">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm sm:text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span
                      className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 "
                      key={index}
                      onClick={() => handleAnswerButtonClick(answer.correct)}
                    >
                      {answer.text}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Quiz
