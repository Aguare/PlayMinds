import NavBar from '../components/navbar'
import { useState } from 'react'

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
  ])
  const [selectedCards, setSelectedCards] = useState<Card[]>([])

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

      setTimeout(() => {
        // Compara las dos cartas seleccionadas
        if (selectedCards[0].image === selectedCards[1].image) {
          // Si las cartas son iguales, actualiza el estado de las cartas con showImage = true y disable = true
          const updatedCards = cards.map((c) => {
            if (c.id === selectedCards[0].id || c.id === selectedCards[1].id) {
              return { ...c, showImage: true, disable: true }
            }
            return c
          })
          setCards(updatedCards)
        } else {
          // Si las cartas no son iguales, actualiza el estado de las tarjetas con showImage = false
          const updatedCards = cards.map((c) => {
            if (c.id === selectedCards[0].id || c.id === selectedCards[1].id) {
              return { ...c, showImage: false }
            }
            return c
          })
          setCards(updatedCards)
        }

        setSelectedCards([])
      }, 1000)
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
    </div>
  )
}

export default MemorizeGame
