import Image from 'next/image'
import { Inter } from 'next/font/google'
import img1 from '../image/logo playminds1.png'
import imggame1 from '../image/img-ahorcado.png'
import imggame2 from '../image/img-duocards.png'
import imggame3 from '../image/img-memoria.png'
import imggame4 from '../image/img-quiz.png'
import imggame5 from '../image/img-kiche.png'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <div className="relative py-8 px-6 md:px-12 lg:px-16 lg:min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <div className="w-8/12 md:w-6/12 lg:w-2/12 flex items-center gap-2">
            <Image src={img1} alt="Imagen de fondo" layout="responsive" />
          </div>
          <div className="w-full md:w-4/12 flex justify-center md:justify-end items-center gap-4">
            <button type="button" className="py-2 px-4 text-indigo-500">
              <Link href="/auth/signin">Log in</Link>
            </button>
            <button
              type="button"
              className="border border-gray-600 py-2 px-4 rounded-lg"
            >
              <Link href="/auth/register">Sign up</Link>
            </button>
          </div>
        </div>

        {/* Game Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 p-4 md:p-8">
          {/* Card 1 */}
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-center mx-auto">
              <Image src={imggame1} alt="Imagen del juego" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              "Juego en donde el jugador debe adivinar una palabra desconocida letra por letra antes de que se complete un dibujo de un hombre ahorcado. Cada letra incorrecta agrega una parte al dibujo. Si se completa el dibujo, el jugador pierde. El objetivo es adivinar la palabra antes de que sea demasiado tarde. ¡Diviértete jugando Ahorcado!"
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
                className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
              />
              <div>
                <h3 className="text-indigo-500 font-bold">Marcos Aguare</h3>
                <p className="text-gray-500 font-medium">Backend Developer</p>
              </div>
              <button
                type="button"
                className="border border-gray-600 py-2 px-4 rounded-lg mt-4 md:mt-0"
              >
                <Link href="/game/ahorcado">JUGAR</Link>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-center mx-auto">
              <Image src={imggame2} alt="Imagen del juego" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              "Juego de preguntas verdadero/falso con solo dos opciones de respuesta. Desliza a la izquierda para 'no' y a la derecha para 'sí'. Objetivo: responder la mayor cantidad de preguntas correctas antes de que se acabe el tiempo. Diferentes niveles de dificultad. ¡Ten cuidado con las preguntas engañosas!"
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
                className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
              />
              <div>
                <h3 className="text-indigo-500 font-bold">Daniel Morales</h3>
                <p className="text-gray-500 font-medium">Backend Developer</p>
              </div>
              <button
                type="button"
                className="border border-gray-600 py-2 px-4 rounded-lg mt-4 md:mt-0"
              >
                <Link href="/game/duocards">JUGAR</Link>
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-center mx-auto">
              <Image src={imggame3} alt="Imagen del juego" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              "Juego memoria donde se muestran cartas boca abajo y debes voltearlas para encontrar las parejas. El jugador que encuentre más parejas en el menor tiempo posible gana. Mejora la memoria y la concentración. Juega contra otros usuarios y diviértete ¡Que gane el más rápido! Suerte."
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
                className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
              />
              <div>
                <h3 className="text-indigo-500 font-bold">Emilio Maldonado</h3>
                <p className="text-gray-500 font-medium">Frontend Developer</p>
              </div>
              <button
                type="button"
                className="border border-gray-600 py-2 px-4 rounded-lg mt-4 md:mt-0"
              >
                <Link href="/game/memorize">JUGAR</Link>
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-center mx-auto">
              <Image src={imggame4} alt="Imagen del juego" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              "Juego de quiz en línea con preguntas sobre una amplia variedad de temas. El jugador debe responder correctamente antes de que se acabe el tiempo. El objetivo es acumular la mayor cantidad de puntos posible. ¡Demuestra tus conocimientos y diviértete jugando Trivia Time!"
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
                className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
              />
              <div>
                <h3 className="text-indigo-500 font-bold">Pedro Domingo</h3>
                <p className="text-gray-500 font-medium">Ingeniero</p>
              </div>
              <button
                type="button"
                className="border border-gray-600 py-2 px-4 rounded-lg mt-4 md:mt-0"
              >
                <Link href="/game/quiz">JUGAR</Link>
              </button>
            </div>
          </div>

          {/* Card 5 - Idiomas */}
          <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-center mx-auto">
              <Image src={imggame5} alt="Imagen del juego de idiomas" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              "Juego diseñado para aprender y practicar idiomas de manera divertida. Incluye ejercicios de vocabulario, gramática y pronunciación. El objetivo es mejorar tus habilidades lingüísticas mientras te diviertes. ¡Aprende un nuevo idioma y juega al mismo tiempo!"
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
                className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
              />
              <div>
                <h3 className="text-indigo-500 font-bold">Ana Pérez</h3>
                <p className="text-gray-500 font-medium">Language Teacher</p>
              </div>
              <button
                type="button"
                className="border border-gray-600 py-2 px-4 rounded-lg mt-4 md:mt-0"
              >
                <Link href="/game/idiomas">JUGAR</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
