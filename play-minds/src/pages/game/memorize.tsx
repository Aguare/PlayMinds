import { MemoryGame } from '@/models/Entitys/Assistant/MemoryGame'
import NavBar from '../../components/navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import { Imag } from '@/models/Entitys/Imag'
import { useRouter } from 'next/router'
import { Game } from '@/models/Entitys/Game'
import { User } from '@/models/Entitys/User'
import { Request } from '@/helpers/requests'
import axios from 'axios'
import { GameComplete } from '@/models/Entitys/GameComplete'
import Table from '@/components/table'
import NewComment from '@/components/newComment'
import Comments from '@/components/comment'
import { CardGameG } from '@/models/Entitys/Assistant/CardGameG'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MemorizeGame = () => {
  var user = new User('', '', '', '', 0)
  const route = useRouter()
  const { id } = route.query
  const [memoryGame, setMemoryGame] = useState<MemoryGame>(
    new MemoryGame(
      new Game('default', '', '', '', 0, new User('', '', '', '', 0)),
      [],
    ),
  )

  const [cards, setCards] = useState<Imag[]>([
    {
      id: 1,
      path_img: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
      show: false,
    },
    {
      id: 2,
      path_img: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
      show: false,
    },
    {
      id: 3,
      path_img:
        'https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg',
      show: false,
    },
    {
      id: 4,
      path_img:
        'https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg',
      show: false,
    },
    {
      id: 5,
      path_img:
        'https://ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg',
      show: false,
    },
    {
      id: 6,
      path_img:
        'https://ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg',
      show: false,
    },
  ])

  if (
    id != 'default' &&
    id != undefined &&
    memoryGame.game.id_game == 'default'
  ) {
    axios
      .get(Request.SERVER + '/Games/GetMemoryGame?id_game=' + id, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        let tmp = localStorage.getItem('user')
        if (tmp) {
          user = JSON.parse(tmp)
        }
        setMemoryGame(response.data)
        memoryGame.imageList = response.data.imageList
        setCards(memoryGame.imageList)
        memoryGame.imageList.forEach((img) => {
          img.path_img = img.path_img.replace(
            'http://localhost:8080',
            Request.SERVER_API,
          )
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [selectedCards, setSelectedCards] = useState<Imag[]>([])
  const [pairsFound, setPairsFound] = useState<number>(0)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)

  useEffect(() => {
    // Crear una copia del array de cartas actual
    const shuffledCards = [...cards]

    // Barajar el array de cartas
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ]
    }
    // Actualizar el estado de las cartas con el array barajado
    setCards(shuffledCards)
  }, [])

  const handleClick = (card: Imag) => {
    if (selectedCards.length < 2) {
      // Actualiza el estado de la tarjeta con show = true
      const updatedCards = cards.map((c) => {
        if (c.id === card.id) {
          return { ...c, show: true }
        }
        return c
      })
      setCards(updatedCards)

      setSelectedCards([...selectedCards, card])
    }

    if (selectedCards.length === 1 && selectedCards[0].id !== card.id) {
      // Actualiza el estado de la tarjeta con show = true
      const updatedCards = cards.map((c) => {
        if (c.id === card.id) {
          return { ...c, show: true }
        }
        return c
      })
      setCards(updatedCards)
      setSelectedCards([...selectedCards, card])

      // Compara las imágenes de las dos tarjetas
      if (selectedCards[0].path_img === card.path_img) {
        // Si las imágenes son iguales, elimina ambas tarjetas del estado y aumenta el contador de pares encontrados
        setTimeout(() => {
          const updatedCards = cards.filter(
            (c) => c.id !== card.id && c.id !== selectedCards[0].id,
          )
          setCards(updatedCards)
          setSelectedCards([])
          setPairsFound(pairsFound + 1)

          // Comprobar si se ha encontrado el último par
          console.log(memoryGame.imageList.length / 2)
          console.log(pairsFound + 1)
          if (pairsFound + 1 === memoryGame.imageList.length / 2) {
            Swal.fire({
              title: 'Felicidades Ganaste',
              width: 600,
              padding: '3em',
              color: '#716add',
            })
            setGameCompleted(true)
            let tmp = localStorage.getItem('user')
            if (tmp) {
              tmp = JSON.parse(tmp).email
            }
            if (
              memoryGame.game.id_game != 'default' &&
              tmp &&
              memoryGame.game.id_game
            ) {
              const gameC = new GameComplete(0,
                tmp,
                memoryGame.game.id_game,
                new Date(),
                memoryGame.game.value_points,
              )
              axios.post(Request.SERVER + '/Games/RegisterGameComplete', gameC)
            }
          }
        }, 1000)
      } else {
        // Si las imágenes son diferentes, da vuelta ambas tarjetas después de un corto retraso
        setTimeout(() => {
          const updatedCards = cards.map((c) => {
            if (c.id === card.id || c.id === selectedCards[0].id) {
              return { ...c, show: false }
            }
            return c
          })
          setCards(updatedCards)
          setSelectedCards([])
        }, 1000)
      }
    }
  }
  return (
    <div className="bg-gray-100 min-h-screen w-[100%]">
      <NavBar />
      <div className="w-[100%] h-[100%] grid sm:grid-cols-5 grid-cols-1 place-items-center gap-4">
        <div className="px-4 py-8 flex flex-wrap md:items-center md:justify-center gap-8 sm:w-[60%] w-[100%] border-2 rounded-lg border-[#205375] sm:mt-[20px] sm:ml-[20px] sm:col-span-3">
          {cards.map((card) => (
            <button
              key={card.id}
              className="py-2 px-6 text-center relative w-36 h-36 sm:w-48 sm:h-48 
            before:absolute before:top-0 before:left-0 before:w-full before:h-full 
            before:z-10 before:bg-green-500/10 before:transition-all before:duration-300 
            hover:before:opacity-0 hover:before:scale-50 
            after:absolute after:top-0 after:left-0 after:w-full after:h-full 
            after:z-10 after:opacity-0 after:transition-all after:duration-300 
            after:border after:border-green-600 after:scale-125 
            hover:after:opacity-100 hover:after:scale-100"
              onClick={() => handleClick(card)}
            >
              {card.show ? (
                <img
                  src={card.path_img}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full "></div>
              )}
            </button>
          ))}
        </div>
        {gameCompleted}
        <div className="sm:col-span-2 w-[100%]">
          <div className="w-[98%] bg-mainorange mb-12">aqui </div>
          <div className="w-[98%] bg-mainorange mb-12">aqui 2</div>
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

export default MemorizeGame
