import { useEffect, useState } from 'react'
import { HangImage } from '@/components/HangImage'
import { getRandomWord } from '@/helpers/getRandomWord'
import { letters } from '@/helpers/letters'

function App() {
  interface HangmanWord {
    word: string
    hint: string
  }

  const [word, setWord] = useState<HangmanWord>({ word: '', hint: '' })
  const [hiddenWord, setHiddenWord] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [lose, setLose] = useState(false)
  const [won, setWon] = useState(false)

  // otro
  useEffect(() => {
    newGame()
  }, [])
  // Determinar si la persona perdió
  useEffect(() => {
    if (attempts >= 9) {
      setLose(true)
    }
  }, [attempts])

  useEffect(() => {
    if (
      hiddenWord &&
      hiddenWord.split(' ').join('') === word.word &&
      word.word !== ''
    ) {
      setWon(true)
    }
  }, [hiddenWord, word])

  const checkLetter = (letter: string) => {
    if (lose) return
    if (won) return
    console.log(letter)
    if (!word.word.includes(letter.toLowerCase())) {
      console.log('no tienen la letra', word.word)
      setAttempts(Math.min(attempts + 1, 9))
      return
    }

    const hiddenWordArray = hiddenWord.split(' ')
    console.log('hidden word', hiddenWord)
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
    <div className="grid grid-cols-1 p-2 gap-3 place-items-center bg-[#EFEFEF] sm:w-[60%] w-[100%] border-2 rounded-lg border-[#205375]">
      {/* Imágenes */}
      <HangImage imageNumber={attempts} />

      {/* Palabra oculta */}
      <h3 className="font-semibold">{hiddenWord}</h3>

      {/* Contador de intentos */}
      <h3>Intentos: {attempts} </h3>
      <p>{word.hint}</p>
      {/* Mensaje si peridó */}
      {lose ? <h2>Perdió {word.word}!</h2> : ''}
      {won ? <h2>Felicidades</h2> : ''}
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
      <button
        className="bg-[#205375] p-2 rounded-lg text-[white] hover:bg-[#F66B0E]"
        onClick={newGame}
      >
        ¿Nuevo juego?
      </button>
    </div>
  )
}

export default App
