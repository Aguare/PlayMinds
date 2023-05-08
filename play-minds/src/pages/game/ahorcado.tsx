import { useEffect, useState } from 'react'
import { HangImage } from '@/components/HangImage'
import { letters } from '@/helpers/letters'

function Hangman() {
  interface HangmanWord {
    word: string
    hint: string
  }
  const words: HangmanWord[] = [
    { word: 'programacion', hint: 'Acción de escribir código' },
    { word: 'javascript', hint: 'Lenguaje de programación popular en la web' },
    {
      word: 'react',
      hint: 'Biblioteca de JavaScript para construir interfaces de usuario',
    },
  ]
  const [cont, setCont] = useState(0)
  function getRandomWord() {
    /* const randomIndex = Math.floor(Math.random() * words.length); */
    setCont(cont + 1)
    return words[cont]
  }
  const [word, setWord] = useState<HangmanWord>({ word: '', hint: '' })
  const [hiddenWord, setHiddenWord] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [lose, setLose] = useState(false)
  const [won, setWon] = useState(false)
  const [cantidad] = useState(words.length + 1)
  const [gameOver, setGameOver] = useState(true)
  const [siguiente, setSiguiente] = useState(true)
  const [score, setScore] = useState(0)

  // otro
  useEffect(() => {
    const newWord = getRandomWord()
    setWord(newWord)
    setHiddenWord('_ '.repeat(newWord.word.length))
    setAttempts(0)
    setLose(false)
    setWon(false)
  }, [])
  // para comprobar si ya termino el juego
  useEffect(() => {
    if (cont == cantidad - 1 && (won == true || lose == true)) {
      setGameOver(false)
    }
  }, [cont, lose, cantidad, won])
  // para mostrar el boton de siguiente
  useEffect(() => {
    if (cont == cantidad - 1) {
      setSiguiente(false)
    }
  }, [cantidad, cont])
  // Determinar si la persona perdió
  useEffect(() => {
    if (attempts >= 9) {
      setLose(true)
    }
  }, [attempts])

  //
  useEffect(() => {
    if (
      hiddenWord &&
      hiddenWord.split(' ').join('') === word.word &&
      word.word !== ''
    ) {
      setWon(true)
    }
  }, [hiddenWord, word])
  //

  useEffect(() => {
    if (won) {
      setScore((prevScore) => prevScore + 1)
    }
  }, [won])

  const checkLetter = (letter: string) => {
    if (lose) return
    if (won) return
    console.log(letter)
    if (!word.word.includes(letter.toLowerCase())) {
      setAttempts(Math.min(attempts + 1, 9))
      return
    }

    const hiddenWordArray = hiddenWord.split(' ')
    for (let i = 0; i < word.word.length; i++) {
      if (word.word[i] === letter.toLowerCase()) {
        hiddenWordArray[i] = letter.toLowerCase()
      }
    }
    setHiddenWord(hiddenWordArray.join(' '))
  }

  const newGame = () => {
    const newWord = getRandomWord()
    setWord(newWord)
    setHiddenWord('_ '.repeat(newWord.word.length))
    setAttempts(0)
    setLose(false)
    setWon(false)
  }

  return (
    <div className=" bg-[#EFEFEF] sm:w-[60%] w-[100%] border-2 rounded-lg border-[#205375]">
      {gameOver ? (
        <div className="grid grid-cols-1 p-2 gap-3 place-items-center bg-[#EFEFEF] rounded-lg w-[100%] sm:h-[650px]">
          {/* Imágenes */}
          <HangImage imageNumber={attempts} />

          {/* Palabra oculta */}
          <h3 className="font-semibold text-[#404040] text-3xl">
            {hiddenWord}
          </h3>

          {/* Contador de intentos */}
          <h3 className="font-semibold text-[#404040] text-xl">
            Intentos: {attempts}{' '}
          </h3>
          <p className="font-semibold text-[#205375] text-lg">{word.hint}</p>

          <div>
            {letters.map((letter) => (
              <button
                className="bg-[#F66B0E] text-[white] w-[26px] sm:m-1 rounded-md md:hover:opacity-30"
                onClick={() => checkLetter(letter)}
                key={letter}
              >
                {letter}
              </button>
            ))}
          </div>
          {/* Mensaje si peridó */}
          {lose && siguiente ? (
            <div className="grid grid-cols-1 p-2 gap-3 place-items-center">
              <h2 className="font-semibold text-[#D21312] text-2xl">
                ¡Perdiste! la palabra era: {word.word}
              </h2>
              <button
                className="bg-[#205375] p-2 font-semibold rounded-lg text-[white] hover:bg-[#F66B0E]"
                onClick={newGame}
              >
                Siguiente
              </button>
            </div>
          ) : (
            ''
          )}
          {won && siguiente ? (
            <div className="grid grid-cols-1 p-2 gap-3 place-items-center">
              <h2 className="font-semibold text-[#539165] text-2xl">
                ¡Adivinaste!
              </h2>
              <button
                className="bg-[#205375] font-semibold p-2 rounded-lg text-[white] hover:bg-[#F66B0E]"
                onClick={newGame}
              >
                Siguiente
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 p-2 gap-3 place-items-center bg-[#EFEFEF] rounded-lg w-[100%] sm:h-[650px]">
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-blue-600 to-blue-900">
            GAME OVER
          </h1>
          <h3 className="font-semibold text-[#404040] text-4xl">
            Puntuación: {score}
          </h3>
        </div>
      )}
    </div>
  )
}

export default Hangman
