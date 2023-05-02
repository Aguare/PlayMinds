import NavBar from '../components/navbar'
import { useState } from 'react'
import { useEffect } from 'react'

interface Card {
  id: number
  image: string
  showImage: boolean // agrega la propiedad showImage a la interfaz Card
}

const MemorizeGame = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      image: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
      showImage: false,
    },
    {
      id: 2,
      image: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
      showImage: false,
    },
    {
      id: 3,
      image:
        'https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg',
      showImage: false,
    },
    {
      id: 4,
      image:
        'https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg',
      showImage: false,
    },
    {
      id: 5,
      image:
        'https://ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg',
      showImage: false,
    },
    {
      id: 6,
      image:
        'https://ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg',
      showImage: false,
    },
  ])
  const [selectedCards, setSelectedCards] = useState<Card[]>([])
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

  const handleClick = (card: Card) => {
    if (selectedCards.length < 2) {
      // Actualiza el estado de la tarjeta con showImage = true
      const updatedCards = cards.map((c) => {
        if (c.id === card.id) {
          return { ...c, showImage: true }
        }
        return c
      })
      setCards(updatedCards)

      setSelectedCards([...selectedCards, card])
    }

    if (selectedCards.length === 1 && selectedCards[0].id !== card.id) {
      // Actualiza el estado de la tarjeta con showImage = true
      const updatedCards = cards.map((c) => {
        if (c.id === card.id) {
          return { ...c, showImage: true }
        }
        return c
      })
      setCards(updatedCards)
      setSelectedCards([...selectedCards, card])

      // Compara las imágenes de las dos tarjetas
      if (selectedCards[0].image === card.image) {
        // Si las imágenes son iguales, elimina ambas tarjetas del estado y aumenta el contador de pares encontrados
        setTimeout(() => {
          const updatedCards = cards.filter(
            (c) => c.id !== card.id && c.id !== selectedCards[0].id,
          )
          setCards(updatedCards)
          setSelectedCards([])
          setPairsFound(pairsFound + 1)

          // Comprobar si se ha encontrado el último par
          if (pairsFound + 1 === cards.length / 2) {
            setGameCompleted(true)
          }
        }, 1000)
      } else {
        // Si las imágenes son diferentes, da vuelta ambas tarjetas después de un corto retraso
        setTimeout(() => {
          const updatedCards = cards.map((c) => {
            if (c.id === card.id || c.id === selectedCards[0].id) {
              return { ...c, showImage: false }
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
    <div>
      <NavBar />
      <div className="px-4 py-8 flex flex-wrap md:items-center md:justify-center gap-8">
        {cards.map((card) => (
          <button
            key={card.id}
            className="py-2 px-6 text-center relative w-48 h-48 
            before:absolute before:top-0 before:left-0 before:w-full before:h-full 
            before:z-10 before:bg-green-500/10 before:transition-all before:duration-300 
            hover:before:opacity-0 hover:before:scale-50 
            after:absolute after:top-0 after:left-0 after:w-full after:h-full 
            after:z-10 after:opacity-0 after:transition-all after:duration-300 
            after:border after:border-green-600 after:scale-125 
            hover:after:opacity-100 hover:after:scale-100"
            onClick={() => handleClick(card)}
          >
            {card.showImage ? (
              <img
                src={card.image}
                alt={card.id.toString()}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full "></div>
            )}
          </button>
        ))}
      </div>

      {gameCompleted && (
        <div className="flex bg-white shadow-lg rounded-lg sm:w-[20%]">
          <div className="icon bg-green-600 flex justify-center items-center py-4 px-6 rounded-tr-3xl rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 bg-white rounded-full text-green-600 p-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="flex flex-col p-4 rounded-tr-lg rounded-br-lg">
            <h2 className="font-semibold text-green-600">Éxito</h2>
            <p className="text-gray-700">FELICIDADES GANASTE </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemorizeGame
