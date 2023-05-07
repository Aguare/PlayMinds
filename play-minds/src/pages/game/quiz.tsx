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
    <div>
      <NavBar />

      {showScore ? (
        <div className="quiz-result">
          <h1>Resultado</h1>
          <p>
            Acertaste {score} de {questions.length} preguntas
          </p>
          <button onClick={handleRetryButtonClick}>Volver a intentar</button>
        </div>
      ) : (
        <div className="quiz-question">
          <h1>Pregunta {currentQuestion + 1}</h1>
          <p>{questions[currentQuestion].question}</p>
          {questions[currentQuestion].answers.map((answer, index) => (
            <div className="px-4 py-8 flex flex-wrap md:items-center md:justify-center gap-8">
              <button
                className="py-2 px-6 text-center text-[#112B3C] relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10 before:bg-red-500/10 before:transition-all before:duration-300 hover:before:opacity-0 hover:before:scale-50 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-10 after:opacity-0 after:transition-all after:duration-300 after:border after:border-green-600 after:scale-125 hover:after:opacity-100 hover:after:scale-100"
                key={index}
                onClick={() => handleAnswerButtonClick(answer.correct)}
              >
                {answer.text}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Quiz
