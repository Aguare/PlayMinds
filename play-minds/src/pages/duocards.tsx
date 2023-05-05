import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import NavBar from '../components/navbar'

interface Card {
  id: number
  name: string
  image: string
  description: string
  correct: boolean
}

const Duocards = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      name: '¿La capital de Francia es: ?',
      image: 'https://via.placeholder.com/150',
      description: 'París',
      correct: true,
    },
    {
      id: 2,
      name: '¿El río más largo del mundo es: ?',
      image: 'https://via.placeholder.com/150',
      description: 'El río Amazonas',
      correct: false,
    },
    {
      id: 3,
      name: '¿Cuál es el elemento más abundante en la Tierra?',
      image: 'https://via.placeholder.com/150',
      description: 'El oxígeno',
      correct: false,
    },
    {
      id: 4,
      name: '¿Quién escribió la novela "Cien años de soledad"?',
      image: 'https://via.placeholder.com/150',
      description: 'Gabriel García Márquez',
      correct: true,
    },
    {
      id: 5,
      name: '¿En qué año comenzó la Segunda Guerra Mundial?',
      image: 'https://via.placeholder.com/150',
      description: '1939',
      correct: true,
    },
    {
      id: 6,
      name: '¿Qué país tiene la población más grande del mundo?',
      image: 'https://via.placeholder.com/150',
      description: 'China',
      correct: true,
    },
    {
      id: 7,
      name: '¿Quién fue el primer hombre en pisar la luna?',
      image: 'https://via.placeholder.com/150',
      description: 'Neil Armstrong',
      correct: true,
    },
    {
      id: 8,
      name: '¿Quién pintó la obra "La noche estrellada"?',
      image: 'https://via.placeholder.com/150',
      description: 'Vincent van Gogh',
      correct: true,
    },
    {
      id: 9,
      name: '¿Cuál es el nombre del continente más grande del mundo?',
      image: 'https://via.placeholder.com/150',
      description: 'Asia',
      correct: true,
    },
    {
      id: 10,
      name: '¿Qué animal representa al signo zodiacal de Leo?',
      image: 'https://via.placeholder.com/150',
      description: 'El león',
      correct: true,
    },
  ])
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [answeredCards, setAnsweredCards] = useState<Card[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined)
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)

  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    config: { mass: 5, tension: 500, friction: 120 },
  }))

  useEffect(() => {
    setCurrentCardIndex(0)
    setAnsweredCards([])
    setGameOver(false)
    setCorrectAnswers(0) // Reiniciar el contador al comenzar un nuevo juego
  }, [cards])

  const handleSwipe = (direction: string) => {
    if (!isAnswered) {
      const currentCard = cards[currentCardIndex]
      const newAnsweredCards = [...answeredCards, currentCard]
      const remainingCards = cards.filter(
        (card) => !newAnsweredCards.includes(card),
      )
      const isCorrect =
        direction === 'right' ? currentCard.correct : !currentCard.correct
      console.log(`Usuario eligió ${direction}`)
      console.log(
        `La respuesta correcta es ${currentCard.correct ? 'right' : 'left'}`,
      )
      set({
        x: direction === 'right' ? 300 : -300,
        rotate: direction === 'right' ? 45 : -45,
        scale: 1.2,
      })
      setIsAnswered(true)

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1) // Actualizar el contador si se responde correctamente
      }

      if (remainingCards.length > 0) {
        const newIndex = Math.min(
          currentCardIndex + 1,
          remainingCards.length - 1,
        )
        setCurrentCardIndex(newIndex)
        setCards([...remainingCards])
        setAnsweredCards(newAnsweredCards)
      } else {
        setGameOver(true)
      }

      setTimeout(() => {
        setIsAnswered(false)
        set({ x: 0, rotate: 0, scale: 1 })
      }, 500)
    }
  }

  const bind = useDrag(({ down, movement: [xDir], direction: [xDir2] }) => {
    if (!down && xDir !== 0) {
      handleSwipe(xDir > 0 ? 'right' : 'left')
    }
  })

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="grid place-content-center content-center h-full">
        {gameOver ? (
          <div className="game-over">
            <h2>¡Juego terminado!</h2>
            <p>Todas las cartas han sido respondidas.</p>
            <div className="correct-answers">
              Respuestas correctas: {correctAnswers}/{cards.length}
            </div>
          </div>
        ) : (
          <animated.div
            className="card grid grid-cols-1 p-2 gap-3 place-items-center"
            {...bind()}
            style={{
              transform: props.x
                .interpolate({
                  range: [-300, 0, 300],
                  output: [-45, 0, 45],
                })
                .interpolate((x) => `translate3d(${x}px,0,0)`),
            }}
          >
            <h1 className="card-title">{cards[currentCardIndex].name}</h1>
            <img
              className="card-image "
              src={cards[currentCardIndex].image}
              alt={cards[currentCardIndex].name}
            />
            <p className="card-description">
              {cards[currentCardIndex].description}
            </p>
          </animated.div>
        )}
      </div>
    </div>
  )
}

export default Duocards
