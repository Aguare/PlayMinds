import NavBar from '../../components/navbar'
import { useState } from 'react'
import axios from 'axios'
import { Answer } from '../../models/Entitys/Answer'
import { Question } from '../../models/Entitys/Question'
import { User } from '../../models/Entitys/User'
import { Game } from '../../models/Entitys/Game'
import { QuizGame } from '../../models/Entitys/Assistant/QuizGame'
import { QuestionOBJ } from '@/models/Entitys/Assistant/QuestionOBJ'
import { Request } from '../../helpers/requests'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Footer from '@/components/footer'
const QuizForm = () => {
  const [pregunta, setPregunta] = useState<string>('')
  const [respuestas, setRespuestas] = useState<string[]>(['', '', '', ''])
  const [preguntas, setPreguntas] = useState<
    { pregunta: string; respuestas: string[]; respuestaCorrecta: number }[]
  >([])
  const [error, setError] = useState<string>('')
  const [name_game, setName_game] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [value_points, setValue_points] = useState<string>('')
  const [userEmail, setUserEmail] = useState('')
  const [aux, setAux] = useState<number>(-1)
  const MySwal = withReactContent(Swal)
  const handlePreguntaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPregunta(event.target.value)
    setError('')
  }

  const handleRespuestaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const nuevasRespuestas = [...respuestas]
    nuevasRespuestas[index] = event.target.value
    setRespuestas(nuevasRespuestas)
    setError('')
  }

  const handleRespuestaCorrectaChange = (
    preguntaIndex: number,
    respuestaCorrecta: number,
  ) => {
    console.log('LA CORRECTA ES: ', respuestaCorrecta)
    setAux(respuestaCorrecta)
  }

  const handleAgregarPregunta = () => {
    if (!pregunta || !respuestas.every((respuesta) => respuesta.trim())) {
      setError('Por favor ingrese la pregunta y las 4 respuestas')
      return
    }
    setPreguntas(
      preguntas.concat({
        pregunta,
        respuestas,
        respuestaCorrecta: aux,
      }),
    )
    setPregunta('')
    setRespuestas(['', '', '', ''])
    setError('')
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName_game(event.target.value)
    setError('')
  }
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value)
    setError('')
  }
  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue_points(event.target.value)
    setError('')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // Obtener los datos del usuario desde el localStorage
    const userString = localStorage.getItem('user')
    let user
    if (userString) {
      user = JSON.parse(userString)
    } else {
      // Manejar el caso cuando los datos del usuario no están disponibles

      return
    }
    // Crear instancia de User
    const userObject = new User(
      user.email,
      user.name,
      '',
      user.role,
      user.points,
    )
    const game = new Game(
      '',
      name_game,
      'QUIZ',
      description,
      parseInt(value_points),
      userObject,
    )

    // Crear instancias de QuestionOBJ
    const questionObjs = preguntas.map((pregunta, index) => {
      const question = new Question(0, pregunta.pregunta)
      delete question.id

      // Crear instancias de Answer para cada respuesta
      const answers = pregunta.respuestas.map((respuesta, respuestaIndex) => {
        const isCorrect = respuestaIndex === pregunta.respuestaCorrecta
        const answer = new Answer(0, respuesta, isCorrect)
        delete answer.id
        return answer
      })

      // Crear instancia de QuestionOBJ
      return new QuestionOBJ(question, answers)
    })

    const quizGame = new QuizGame(game, questionObjs)
    const jsonData = JSON.stringify(quizGame)
    if (questionObjs.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Opps....',
        text: 'No se ingreso ninguna palabra',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    // Enviar los datos al servidor utilizando Axios
    try {
      console.log('datos enviados' + jsonData)
      const response = await axios
        .post(Request.REGISTER_QUIZ_GAME, jsonData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          setPregunta('')
          setRespuestas(['', '', '', ''])
          setPreguntas([])
          setName_game('')
          setDescription('')
          setValue_points('')
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ingreso correctamente el juego',
            showConfirmButton: false,
            timer: 1500,
          })
          console.log(response.data)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline text-maincian">
            Creando<span className="text-sm text-mainorange">Quiz</span>
          </h1>
          <div className="grid grid-cols-2 gap-2 py-10 px-8 bg-[white] rounded-md border-t-4 border-mainorange">
            <div className="grid col-span-2 ">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="peer block w-full border-0 p-0  text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Nombre personalizado del juego"
                  value={name_game}
                  onChange={handleNameChange}
                  required
                />
                <label
                  htmlFor="name"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Nombre personalizado del juego
                </label>
              </div>
            </div>
            <div className="grid col-span-2 ">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="peer block w-full border-0 p-0  text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Descripcion del juego"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
                <label
                  htmlFor="description"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Descripcion del juego
                </label>
              </div>
            </div>
            <div className="grid col-span-2 ">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="value_points"
                  id="value_points"
                  className="peer block w-full border-0 p-0  text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Puntos del juego"
                  value={value_points}
                  onChange={handlePointsChange}
                  required
                />
                <label
                  htmlFor="value_points"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Puntos del juego
                </label>
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="pregunta"
                  id="pregunta"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Ingrese la pregunta"
                  value={pregunta}
                  onChange={handlePreguntaChange}
                  required
                />
                <label
                  htmlFor="word"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Pregunta
                </label>
              </div>
            </div>
            {respuestas.map((respuesta, index) => (
              <div key={index} className="grid">
                <div
                  className={`bfirst:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner ${
                    preguntas[preguntas.length - 1]?.respuestaCorrecta === index
                      ? 'bg-green-200'
                      : ''
                  }`}
                >
                  <input
                    type="text"
                    name={`respuesta-${index}`}
                    id={`respuesta-${index}`}
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder={`Ingrese la respuesta ${index + 1}`}
                    value={respuesta}
                    onChange={(event) => handleRespuestaChange(event, index)}
                    required
                  />
                  <input
                    type="radio"
                    name="respuestaCorrecta"
                    id={`respuestaCorrecta-${index}`}
                    defaultChecked={
                      preguntas[preguntas.length - 1]?.respuestaCorrecta ===
                      index
                    }
                    onChange={() =>
                      handleRespuestaCorrectaChange(preguntas.length - 1, index)
                    }
                  />
                  <label htmlFor={`respuestaCorrecta-${index}`}>
                    {' '}
                    Correcta
                  </label>
                </div>
              </div>
            ))}

            <span className="text-red-500">{error}</span>
            <div className="col-span-2">
              <button
                type="button"
                className="bg-maincian text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors mr-2"
                onClick={handleAgregarPregunta}
              >
                Agregar pregunta
              </button>
            </div>
            <div className="mt-4 w-[100%]">
              {preguntas.map((pregunta, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 py-3">
                  <div className="font-bold">{pregunta.pregunta}</div>
                  <div>
                    {pregunta.respuestas.map((respuesta, respuestaIndex) => (
                      <div
                        key={respuestaIndex}
                        className={`${
                          respuestaIndex === pregunta.respuestaCorrecta
                            ? 'bg-green-200'
                            : ''
                        }`}
                      >
                        {respuesta}
                        {respuestaIndex === pregunta.respuestaCorrecta && (
                          <span className="ml-2 text-green-500">Correcta</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className=" col-span-2 w-[100%]">
              <button
                type="submit"
                className="mt-4 bg-mainblue text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors w-[100%]"
                onClick={handleSubmit}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default QuizForm
