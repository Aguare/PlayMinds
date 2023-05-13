import NavBar from '../../components/navbar'
import { useState } from 'react'

const ahorcadoF = () => {
  const [palabra, setPalabra] = useState<string>('')
  const [pista, setPista] = useState<string>('')
  const [palabras, setPalabras] = useState<
    { palabra: string; pista: string }[]
  >([])
  const [error, setError] = useState<string>('')

  const handlePalabraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPalabra(event.target.value)
    setError('')
  }

  const handlePistaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPista(event.target.value)
    setError('')
  }

  const handleAgregarPalabra = () => {
    if (!palabra || !pista) {
      setError('Por favor ingrese la palabra y la pista')
      return
    }
    setPalabras(palabras.concat({ palabra, pista }))
    setPalabra('')
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
            Creando<span className="text-sm text-mainorange">Ahorcado</span>
          </h1>
          <div className="grid grid-cols-2 gap-2 py-10 px-8 bg-[white] rounded-md border-t-4 border-mainorange">
            <div className="grid">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="word"
                  id="word"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Ingrese la palabra a adivinar"
                  value={palabra}
                  onChange={handlePalabraChange}
                  required
                />
                <label
                  htmlFor="word"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Palabra o frase a adivinar
                </label>
              </div>
            </div>

            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="hint"
                  id="hint"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Ingrese una pista"
                  value={pista}
                  onChange={handlePistaChange}
                  required
                />
                <label
                  htmlFor="hint"
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
                onClick={handleAgregarPalabra}
              >
                Agregar palabra y pista
              </button>
            </div>
            <div className="mt-4 w-[100%]">
              {palabras.map((p, i) => (
                <div key={i} className="bg-gray-100 rounded-md p-2">
                  <p className="font-bold">{p.palabra}</p>
                  <p>{p.pista}</p>
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
export default ahorcadoF
