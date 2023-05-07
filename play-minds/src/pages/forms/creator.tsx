import Image from 'next/image'

import img1 from '../../image/logo playminds1.png'
import imggame1 from '../../image/img-ahorcado.png'
import imggame2 from '../../image/img-duocards.png'
import imggame3 from '../../image/img-memoria.png'
import imggame4 from '../../image/img-quiz.png'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const creator = () => {
  return (
    <div>
      <div className="relative md:min-h-[80vh] lg:min-h-screen py-8 px-12">
        <div className="flex items-center justify-between w-full">
          <div className="w-6/12 lg:w-2/12 flex items-center gap-2">
            <Image src={img1} alt="Imagen de fondo" />
          </div>
          <nav className="hidden w-6/12 lg:flex justify-center items-center gap-8 text-gray-500 font-medium"></nav>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faBell} className="text-[#EFEFEF]" />
            </a>
            <div className="flex items-center gap-2 cursor-pointer ">
              <div className="relative ">
                <img
                  src="https://img.freepik.com/foto-gratis/joven-mujer-colombiana-atractiva-gafas-sol-posando-mientras-pie-junto-al-mar-dia_181624-41580.jpg?w=1800&t=st=1674592279~exp=1674592879~hmac=1276990bc65161f9f68c332774d2e5446f0b6b00d1d865b72e71e8732a58d9f7"
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span className="absolute bg-green-600 w-1.5 h-1.5 top-0 right-0.5 rounded-full ring-2 ring-white"></span>
              </div>
              <a className="text-[#EFEFEF] text-xs xl:py-3 xl:px-2 rounded-lg  transition-colors ">
                1,751 pts
              </a>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 p-8">
          {/*Juego 1*/}
          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl">
            <div className="flex flex-col items-center justify-center mx-auto pad ">
              <Image
                src={imggame1}
                alt="Imagen de fondo"
                width={400}
                height={400}
              />
            </div>
            <p className="text-gray-500">
              "Juego en donde el jugador debe adivinar una palabra desconocida
              letra por letra antes de que se complete un dibujo de un hombre
              ahorcado. Cada letra incorrecta agrega una parte al dibujo. Si se
              completa el dibujo, el jugador pierde. El objetivo es adivinar la
              palabra antes de que sea demasiado tarde. ¡Diviértete jugando
              Ahorcado!"
            </p>
            <div className="flex items-center gap-4">
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
                className="border border-gray-600 py-2 px-4 rounded-lg "
              >
                <Link href="/game/ahorcado">JUGAR</Link>
              </button>
              <div className="hidden w-4/12 lg:flex justify-center sm:pl-[40%] items-center gap-8"></div>
            </div>
          </div>
          {/*Juego 2*/}
          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl">
            <div className="flex flex-col items-center justify-center mx-auto pad ">
              <Image
                src={imggame2}
                alt="Imagen de fondo"
                width={400}
                height={400}
              />
            </div>
            <p className="text-gray-500">
              "Juego de preguntas verdadero/falso con solo dos opciones de
              respuesta. Desliza a la izquierda para "no" y a la derecha para
              "sí". Objetivo: responder la mayor cantidad de preguntas correctas
              antes de que se acabe el tiempo. Diferentes niveles de dificultad.
              ¡Ten cuidado con las preguntas engañosas!"
            </p>
            <div className="flex items-center gap-4">
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
                className="border border-gray-600 py-2 px-4 rounded-lg"
              >
                <Link href="/game/duocards">JUGAR</Link>
              </button>
              <div className="hidden w-4/12 lg:flex justify-center sm:pl-[40%] items-center gap-8"></div>
            </div>
          </div>
          {/*Juego 3*/}
          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl">
            <div className="flex flex-col items-center justify-center mx-auto pad ">
              <Image
                src={imggame3}
                alt="Imagen de fondo"
                width={400}
                height={400}
              />
            </div>
            <p className="text-gray-500">
              "Juego memoria donde se muestran cartas boca abajo y debes
              voltearlas para encontrar las parejas. El jugador que encuentre
              más parejas en el menor tiempo posible gana. Mejora la memoria y
              la concentración. Juega contra otros usuarios y diviertete ¡Que
              gane el más rápido! Suerte."
            </p>
            <div className="flex items-center gap-4">
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
                className="border border-gray-600 py-2 px-4 rounded-lg"
              >
                <Link href="/game/memorize">JUGAR</Link>
              </button>
              <div className="hidden w-4/12 lg:flex justify-center sm:pl-[40%] items-center gap-8"></div>
            </div>
          </div>
          {/*Juego 4*/}
          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl">
            <div className="flex flex-col items-center justify-center mx-auto pad ">
              <Image
                src={imggame4}
                alt="Imagen de fondo"
                width={400}
                height={400}
              />
            </div>
            <p className="text-gray-500">
              "Juego de quiz en línea con preguntas sobre una amplia variedad de
              temas. El jugador debe responder correctamente antes de que se
              acabe el tiempo. El objetivo es acumular la mayor cantidad de
              puntos posible. ¡Demuestra tus conocimientos y diviértete jugando
              Trivia Time!"
            </p>
            <div className="flex items-center gap-4">
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
                className="border border-gray-600 py-2 px-4 rounded-lg"
              >
                <Link href="/game/quiz">JUGAR</Link>
              </button>
              <div className="hidden w-4/12 lg:flex justify-center sm:pl-[40%] items-center gap-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default creator
