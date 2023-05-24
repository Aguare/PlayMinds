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
import { Card } from '@/models/Entitys/Card'
import Table from '@/components/table'
import NewComment from '@/components/newComment'
import Comments from '@/components/comment'

const Duocards = () => {
  const user = new User('', '', '', '', 0)
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
      idCard: 1,
      name: '¿La capital de Francia es: ?',
      image: {
        id: 1,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: 'París',
      correct: true,
    },
    {
      idCard: 2,
      name: '¿El río más largo del mundo es: ?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: 'El río Amazonas',
      correct: false,
    },
    {
      idCard: 3,
      name: '¿Cuál es el elemento más abundante en la Tierra?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: 'El oxígeno',
      correct: false,
    },
    {
      idCard: 4,
      name: '¿Quién escribió la novela "Cien años de soledad"?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: 'Gabriel García Márquez',
      correct: true,
    },
    {
      idCard: 5,
      name: '¿En qué año comenzó la Segunda Guerra Mundial?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: '1939',
      correct: true,
    },
    {
      idCard: 6,
      name: '¿Qué país tiene la población más grande del mundo?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: 'China',
      correct: true,
    },
    {
      idCard: 7,
      name: '¿Quién fue el primer hombre en pisar la luna?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: 'Neil Armstrong',
      correct: true,
    },
    {
      idCard: 8,
      name: '¿Quién pintó la obra "La noche estrellada"?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: 'Vincent van Gogh',
      correct: true,
    },
    {
      idCard: 9,
      name: '¿Cuál es el nombre del continente más grande del mundo?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
      description: 'Asia',
      correct: true,
    },
    {
      idCard: 10,
      name: '¿Qué animal representa al signo zodiacal de Leo?',
      image: {
        id: 2,
        path_img: 'https://via.placeholder.com/150',
        show: false,
      },
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
        setCardGameG(response.data)
        cardGameG.cards = response.data.cards
        cardGameG.cards.forEach((element) => {
          element.image.path_img = element.image.path_img.replace(
            'http://localhost:8080',
            Request.SERVER_API,
          )
        })
        setCards(cardGameG.cards)
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
        console.log(`sumo punto ${correctAnswers}`)
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
        let tmp = localStorage.getItem('user')
        if (tmp) {
          tmp = JSON.parse(tmp).email
        }
        if (
          tmp &&
          cardGameG.game.id_game !== 'default' &&
          cardGameG.game.id_game !== undefined
        ) {
          let score =
            (cardGameG.game.value_points / cardGameG.cards.length) *
            correctAnswers
          const gameC = new GameComplete(0,
            tmp,
            cardGameG.game.id_game,
            new Date(),
            score,
          )
          console.log(gameC)
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
      <div className="w-[100%] h-[100%] grid sm:grid-cols-5 grid-cols-1 place-items-center gap-4">
        <div className="bg-gradient-to-r w-[100%] sm:w-[100%] border-2 rounded-lg from-red-200 via-transparent to-green-200  border-2 rounded-lg border-[#205375] sm:mt-[20px] sm:ml-[20px] sm:col-span-3">
          <div className="grid grid-cols-1 p-2 gap-3 place-items-center  rounded-lg w-[100%] sm:h-[650px]">
            {gameOver ? (
              <div className="p-10 rounded-lg bg-gray-900 bg-opacity-60 flex flex-col justify-center items-center text-center">
                <h1 className="text-5xl font-bold text-white mb-4">
                  Game Over
                </h1>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Puntos: {correctAnswers}
                </h2>
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
                <img
                  className="card-image w-[300px] h-[300px]"
                  src={cards[currentCardIndex].image.path_img}
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
        <div className="sm:col-span-2 w-[100%]">
          <div className="w-[98%] bg-transparent mb-12">
          <h2 className="text-9xl font-bold mb-4">CODIGO</h2>
          </div>
          <div className="w-[98%] bg-transparent mb-12">
          <h2 className="text-5xl font-bold mb-4">{id}</h2>
            </div>
          <Table />
        </div>
        <div className="sm:col-span-5 w-[100%]">
          <NewComment />
        </div>
        <div className="sm:col-span-5 w-[100%]">
          <Comments />
        </div>
      </div>
    </div>
  )
}

export default Duocards
