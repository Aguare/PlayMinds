import NavBar from '../components/navbar'
import { useState } from 'react'

interface HangmanWord {
  word: string
  hint: string
}

const Ahorcado = () => {
  // Definimos un array de objetos con las palabras y pistas del juego
  const words: HangmanWord[] = [
    { word: 'programacion', hint: 'Acción de escribir codigo' },
    { word: 'javascript', hint: 'Lenguaje de programacion popular en la web' },
    {
      word: 'react',
      hint: 'Biblioteca de JavaScript para construir interfaces de usuario',
    },
  ]

  // Definimos los estados necesarios para el juego
  const [wordIndex, setWordIndex] = useState<number>(
    Math.floor(Math.random() * words.length),
  )
  const [currentWord, setCurrentWord] = useState<HangmanWord>(words[wordIndex])
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [mistakes, setMistakes] = useState<number>(0)
  const maxMistakes = 6

  // Definimos una función para obtener la palabra a mostrar con letras adivinadas y espacios en blanco
  function getDisplayWord() {
    let displayWord = ''
    for (const letter of currentWord.word) {
      if (guessedLetters.includes(letter)) {
        displayWord += letter + ' '
      } else {
        displayWord += '_ '
      }
    }
    return displayWord.trim()
  }

  // Definimos una función para manejar la victoria del jugador
  function handleWin() {
    const index = words.findIndex((w) => w.word === currentWord.word)
    setCurrentWord(words[(index + 1) % words.length])
    setGuessedLetters([])
    setMistakes(0)
  }

  // Definimos una función para manejar los botones de letras
  function handleGuess(letter: string) {
    // Agregamos la letra adivinada al array de letras adivinadas
    setGuessedLetters([...guessedLetters, letter])
    // Si la letra no está en la palabra actual, aumentamos el número de errores
    if (!currentWord.word.includes(letter)) {
      setMistakes(mistakes + 1)
    }
    // Si el jugador ha ganado, llama a la función de manejo de victoria
    if (getDisplayWord() === currentWord.word) {
      handleWin()
    }
  }

  // Definimos una función para reiniciar el juego
  function resetGame() {
    setGuessedLetters([])
    setMistakes(0)
    setWordIndex((wordIndex + 1) % words.length)
    setCurrentWord(words[wordIndex])
  }

  // Definimos el array de letras que se mostrarán en los botones
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  // Definimos una variable para almacenar la pista
  const hint = currentWord.hint
  // Retornamos el componente JSX del juego
  return (
    <div>
      <NavBar />
      <h1>Juego del Ahorcado</h1>
      <p>Pista: {hint}</p>{' '}
      {/* Utilizamos la variable hint en lugar de currentWord.hint */}
      <p>{getDisplayWord()}</p>
      <div>
        {letters.map((letter) => (
          <button
            key={letter}
            disabled={guessedLetters.includes(letter)}
            onClick={() => handleGuess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      {mistakes === maxMistakes && (
        <div>
          <p>¡Perdiste!</p>
          <button
            onClick={() => {
              setCurrentWord(words[Math.floor(Math.random() * words.length)])
              setGuessedLetters([])
              setMistakes(0)
            }}
          >
            Jugar de nuevo
          </button>
        </div>
      )}
      {getDisplayWord() === currentWord.word && (
        <div>
          <p>¡Ganaste!</p>
          <button onClick={handleWin}>Siguiente palabra</button>
        </div>
      )}
    </div>
  )
}

export default Ahorcado
