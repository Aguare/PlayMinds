import NavBar from '../../components/navbar'
import { useState } from 'react'

const QuizForm = () => {
  const [pregunta, setPregunta] = useState<string>('')
  const [respuestas, setRespuestas] = useState<string[]>(['', '', '', ''])
  const [preguntas, setPreguntas] = useState<
    { pregunta: string; respuestas: string[] }[]
  >([])
  const [error, setError] = useState<string>('')

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

  const handleAgregarPregunta = () => {
    if (!pregunta || !respuestas.every((respuesta) => respuesta.trim())) {
      setError('Por favor ingrese la pregunta y las 4 respuestas')
      return
    }
    setPreguntas(preguntas.concat({ pregunta, respuestas }))
    setPregunta('')
    setRespuestas(['', '', '', ''])
    setError('')
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    // Aquí se podrán enviar los datos al servidor para procesarlos
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
              <div key={index} className="grid ">
                <div className="bfirst:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
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
                </div>
              </div>
            ))}
            <span className="text-red-500">{error}</span>
            <div className="sm:col-span-2">
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
                    {pregunta.respuestas.map((respuesta, index) => (
                      <div key={index}>{respuesta}</div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="w-[100%]">
                <button
                  type="submit"
                  className="mt-4 bg-maincian text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors w-[100%]"
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default QuizForm
