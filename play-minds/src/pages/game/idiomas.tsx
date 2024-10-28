import { useState } from "react";
import NavBar from "../../components/navbar";

const Idiomas = () => {
  // Estado para el audio actual
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [userInputs, setUserInputs] = useState<string[]>(Array(10).fill("")); 
  const [feedback, setFeedback] = useState<string[]>(Array(10).fill(""));
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswers] = useState<string[]>([
    "Jun",
    "Keb'",
    "Oxib'",
    "Kajib'",
    "Job'",
    "Waqib'",
    "Wuqub'",
    "Wajxaqib'",
    "B'elejeb'",
    "Julajuj"
  ]);

  // Lista de números en K'iche' para mostrar
  const numeros = [
    { id: 1, label: "UNO", audio: "/assets/Numeros/1.m4a" },
    { id: 2, label: "DOS", audio: "/assets/Numeros/2.m4a" },
    { id: 3, label: "TRES", audio: "/assets/Numeros/3.m4a" },
    { id: 4, label: "CUATRO", audio: "/assets/Numeros/4.m4a" },
    { id: 5, label: "CINCO", audio: "/assets/Numeros/5.m4a" },
    { id: 6, label: "SEIS'", audio: "/assets/Numeros/6.m4a" },
    { id: 7, label: "SIETE'", audio: "/assets/Numeros/7.m4a" },
    { id: 8, label: "OCHO", audio: "/assets/Numeros/8.m4a" },
    { id: 9, label: "NUEVE", audio: "/assets/Numeros/9.m4a" },
    { id: 10, label: "DIEZ", audio: "/assets/Numeros/10.m4a" },
  ];

  const playAudio = (audioSrc: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reinicia el audio actual
    }

    const audio = new Audio(audioSrc);
    audio.play();
    setCurrentAudio(audio);
  };

  const handleUserInputChange = (index: number, value: string) => {
    const updatedInputs = [...userInputs];
    updatedInputs[index] = value; // Actualiza solo el input correspondiente
    setUserInputs(updatedInputs);
  };

  const checkAnswer = (index: number) => {
    const userAnswer = userInputs[index].toLowerCase();
    const correctAnswer = correctAnswers[index].toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[index] = "¡Correcto! 🎉";
        return newFeedback;
      });
    } else {
      setFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[index] = "Inténtalo de nuevo. 🤔";
        return newFeedback;
      });
    }
    // Reinicia el campo de entrada después de verificar
    const updatedInputs = [...userInputs];
    updatedInputs[index] = ""; // Limpia solo el input correspondiente
    setUserInputs(updatedInputs);
  };

  const toggleShowAnswers = () => {
    setShowAnswers((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Repite Conmigo - Números en K'iche'</h1>
        <p className="text-center mb-8 text-lg">Escucha el número y escríbelo en K'iche'.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {numeros.map((numero, index) => (
            <div key={numero.id} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
              <button
                className="p-4 bg-teal-500 text-white rounded-lg shadow-lg mb-2"
                onClick={() => playAudio(numero.audio)}
              >
                Escuchar: {numero.label}
              </button>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                placeholder={`Escribe lo que escuchaste para ${numero.label}`}
                value={userInputs[index]}
                onChange={(e) => handleUserInputChange(index, e.target.value)}
              />
              <div className="flex space-x-2">
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg mb-2"
                  onClick={() => checkAnswer(index)}
                >
                  Verificar
                </button>
                <button
                  className="p-2 bg-green-500 text-white rounded-lg mb-2"
                  onClick={() => setFeedback((prev) => {
                    const newFeedback = [...prev];
                    newFeedback[index] = `Respuesta: ${correctAnswers[index]}`;
                    return newFeedback;
                  })}
                >
                  Mostrar Respuesta
                </button>
              </div>
              {feedback[index] && (
                <p className="text-red-500 mt-2">{feedback[index]}</p>
              )}
            </div>
          ))}
        </div>
        <button
          className="mt-4 p-2 bg-yellow-500 text-white rounded-lg"
          onClick={toggleShowAnswers}
        >
          {showAnswers ? "Ocultar Respuestas" : "Mostrar Respuestas"}
        </button>
        {showAnswers && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Respuestas Correctas:</h2>
            <ul className="list-disc list-inside">
              {correctAnswers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Idiomas;
