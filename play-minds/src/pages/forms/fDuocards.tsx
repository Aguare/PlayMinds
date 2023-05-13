import NavBar from '../../components/navbar'
import { useState } from 'react'
import Duocards from '../game/duocards'

const DuoCardsForm = () => {
  const [pregunta, setPregunta] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [pista, setPista] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [cartas, setCartas] = useState<
    { pregunta: string; pista: string; imagen: string }[]
  >([])

  const handlePreguntaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPregunta(event.target.value)
    setError('')
  }

  const handlePistaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPista(event.target.value)
    setError('')
  }

  const handleAgregarDuoCard = () => {
    if (!pregunta || uploadedFiles.length === 0 || !pista) {
      setError('Por favor ingrese la pregunta, la imagen y la pista')
      return
    }

    const nuevaCarta = {
      pregunta,
      pista,
      imagen: URL.createObjectURL(uploadedFiles[0]),
    }

    setCartas([...cartas, nuevaCarta])

    setPregunta('')
    setSelectedFile(null)
    setUploadedFiles([])
    setPista('')
    setError('')
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    // Aquí se podra enviar los datos al servidor para procesarlos
  }
  return (
    <div>
      <NavBar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline text-maincian">
            Creando<span className="text-sm text-mainorange">DuoCards</span>
          </h1>
          <div className="grid grid-cols-2 gap-2 py-10 px-8 bg-[white] rounded-md border-t-4 border-mainorange">
            <div className="grid">
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
                  htmlFor="pregunta"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Pregunta
                </label>
              </div>
            </div>
            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="pista"
                  id="pista"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Ingrese la pista"
                  value={pista}
                  onChange={handlePistaChange}
                  required
                />
                <label
                  htmlFor="pista"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Pista
                </label>
              </div>
            </div>
            <span className="text-red-500">{error}</span>
            <div className="sm:col-span-2">
              <button
                type="button"
                className="bg-maincian text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors mr-2"
                onClick={handleAgregarDuoCard}
              >
                Agregar Carta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DuoCardsForm
