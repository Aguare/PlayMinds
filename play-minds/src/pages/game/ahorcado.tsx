import { useEffect, useState } from 'react'
import { HangImage } from '@/components/HangImage'
import { letters } from '@/helpers/letters'
import NavBar from '@/components/navbar'
import Table from '@/components/table'
import Comments from '@/components/comment'
import NewComment from '@/components/newComment'
import { useRouter } from 'next/router'
import { HangedGame } from '@/models/Entitys/Assistant/HangedGame'
import { Game } from '@/models/Entitys/Game'
import { User } from '@/models/Entitys/User'
import { Request } from '@/helpers/requests'
import axios from 'axios'
import { Phrase } from '@/models/Entitys/Phrase'
function Hangman() {
  var user= new User("","","","",0)
  const route = useRouter()
  const { id } = route.query
  const [hangedGame, setHangedGame] = useState<HangedGame>(
    new HangedGame(
      new Game('default', '', '', '', 0, new User('', '', '', '', 0)),
      [],
    ),
  )
  const [words,setWords] = useState<Phrase[]> ([
    { id_phrase:1, phrase: 'Pro', hint: 'Acción de escribir código' },
    { id_phrase:2, phrase: 'javascript', hint: 'Lenguaje de programación popular en la web' },
    {
      id_phrase:3, phrase: 'react',
      hint: 'Biblioteca de JavaScript para construir interfaces de usuario',
    },
  ])
  if (
    id != "default" &&
    id != undefined &&
    hangedGame.game.id_game == "default"
  ) {
    axios
      .get(Request.SERVER + "/Games/GetHangedGame?id_game=" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
       
       hangedGame.game = response.data.game;
       hangedGame.phrases = response.data.phrases;
        setWords(hangedGame.phrases);
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  const [cont, setCont] = useState(hangedGame.phrases.length)
  function getRandomWord() {
    if(cont!==0){
      setCont(cont+1)
    }
    console.log("cont-> "+ cont)
    return words[cont]
  }
  const [word, setWord] = useState<Phrase>({ phrase: '', hint: '' })
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
    setHiddenWord('_ '.repeat(newWord.phrase.length))
    setAttempts(0)
    setLose(false)
    setWon(false)
  }, [])
  // para comprobar si ya termino el juego
  useEffect(() => {
    if (cont == cantidad - 1 && (won == true || lose == true)) {
      setGameOver(false)
      // aqui va el set del game complete
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
      hiddenWord.replace(/ /g, '') === word.phrase.toLocaleLowerCase() &&
      word.phrase!=='' 
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
    letter=letter.toLowerCase()
    console.log(letter)
    if (!word.phrase.toLocaleLowerCase().includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9))
      return
    }
    

    const hiddenWordArray = hiddenWord.split(' ')
    for (let i = 0; i < word.phrase.length; i++) {
      if (word.phrase[i].toLocaleLowerCase() === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '))
  }

  const newGame = () => {
    const newWord = getRandomWord()
    setWord(newWord)
    setHiddenWord('_ '.repeat(newWord.phrase.length))
    setAttempts(0)
    setLose(false)
    setWon(false)
  }

  return (
    <div className="bg-gray-100 min-h-screen w-[100%] ">
      <NavBar />
      <div className="w-[100%] h-[100%] grid sm:grid-cols-4 grid-cols-1 place-items-center">
        <div className=" bg-[#EFEFEF] w-[100%] sm:w-[80%] border-2 rounded-lg border-[#205375] sm:mt-[20px] sm:ml-[20px] col-span-3">
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
              <p className="font-semibold text-[#205375] text-lg">
                {word.hint}
              </p>

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
                    ¡Perdiste! la palabra era: {word.phrase}
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
        <div className="bg-[aqua]  ">
          <Table />
        </div>
        <div className="col-span-4 w-[100%]">
          <NewComment />
        </div>
        <div className="col-span-4 w-[100%]">
          <Comments />
        </div>
      </div>
    </div>
  )
}

export default Hangman
