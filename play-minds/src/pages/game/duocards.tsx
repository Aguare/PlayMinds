import { CardGameG } from '@/models/Entitys/Assistant/CardGameG'
import NavBar from '@/components/navbar'
import { Game } from '@/models/Entitys/Game'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { useRouter } from 'next/router'
import { User } from '@/models/Entitys/User'
import { Request } from '@/helpers/requests'
import axios from 'axios'
import { GameComplete } from '@/models/Entitys/GameComplete'

interface Card {
  id: number
  name: string
  image: string
  description: string
  correct: boolean
}

const Duocards = () => {
  var user = new User('', '', '', '', 0)
  const router = useRouter()
  const { id } = router.query
  const [cardGameG, setCardGameG] = useState<CardGameG>(
    new CardGameG(
      new Game('default', '', '', '', 0, new User('', '', '', '', 0)),
      [],
    ),
  )

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

  if (
    id !== 'default' &&
    id !== undefined &&
    cardGameG.game !== undefined &&
    cardGameG.game.id_game === 'default'
  ) {
    axios
      .get(Request.SERVER + '/Games/GetCardGame?id_game=' + id, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        let tmp = localStorage.getItem('user')
        if (tmp) {
          user = JSON.parse(tmp)
        }
        setCardGameG(response.data.game)
        cardGameG.game.id_game = response.data.game.id_game
        cardGameG.cards = response.data.cards
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [answeredCards, setAnsweredCards] = useState<Card[]>([])
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

  const handleSwipe = (direction: string) => {
    if (!isAnswered) {
      const currentCard = cards[currentCardIndex]
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
        setCorrectAnswers((prev) => prev + 1)
        console.log(`sumopunto ${correctAnswers}`)
      } else {
        console.log('no es correcto')
      }

      const newAnsweredCards = [...answeredCards, currentCard]
      const remainingCards = cards.filter(
        (card) => !newAnsweredCards.includes(card),
      )

      if (remainingCards.length > 0) {
        const newIndex = Math.min(
          currentCardIndex + 1,
          remainingCards.length - 1,
        )
        setCurrentCardIndex(newIndex)
        setCards([...remainingCards])
        setAnsweredCards(newAnsweredCards) // Actualizar el estado de answeredCards después de verificar si la respuesta es correcta
      } else {
        setGameOver(true)
        if (
          cardGameG.game.id_game != 'default' &&
          user.email != '' &&
          cardGameG.game.id_game
        ) {
          const gameC = new GameComplete(
            user.email,
            cardGameG.game.id_game,
            new Date(),
            cardGameG.game.value_points,
          )
          axios.post(Request.SERVER + '/Games/RegisterGameComplete', gameC)
        }
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
    <div className="bg-gray-100 min-h-screen w-[100%]">
      <NavBar />
      <div className="bg-gradient-to-r from-red-200 via-transparent to-green-200 sm:w-[60%] w-[100%] border-2 rounded-lg border-[#205375] sm:mt-[20px] sm:ml-[20px]">
        <div className="grid grid-cols-1 p-2 gap-3 place-items-center  rounded-lg w-[100%] sm:h-[650px]">
          {gameOver ? (
            <div className="p-10 rounded-lg bg-gray-900 bg-opacity-60 flex flex-col justify-center items-center text-center">
              <h1 className="text-5xl font-bold text-white mb-4">Game Over</h1>

              <div className="text-lg text-gray-200">
                <h1>
                  {' '}
                  Respuestas correctas: {correctAnswers}/
                  {answeredCards.length + 1}
                </h1>
              </div>
            </div>
          ) : (
            <animated.div
              className="card grid grid-cols-1 p-6 gap-3 place-items-center bg-[white] rounded-xl sm:w-[40%] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
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
              <h1 className="card-title text-center text-lg sm:text-xl font-semibold">
                {cards[currentCardIndex].name}
              </h1>
              <Image
                className="card-image w-[300px] h-[300px]"
                src={cards[currentCardIndex].image}
                alt={cards[currentCardIndex].name}
                width={300}
                height={300}
              />
              <p className="card-description text-center text-lg sm:text-xl font-semibold text-[#565656]">
                {cards[currentCardIndex].description}
              </p>
            </animated.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Duocards
