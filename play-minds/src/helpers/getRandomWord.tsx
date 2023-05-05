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

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}
