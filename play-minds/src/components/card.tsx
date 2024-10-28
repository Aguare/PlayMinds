import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Game } from "../models/Entitys/Game";
import { Request } from "../helpers/requests";
import { useRouter } from "next/router";
import Image from "next/image"; 

const Card = () => {
  const [games, setGames] = useState<Game[]>([]);
  const router = useRouter();

  const getImage = (type: string) => {
    if (type === "QUIZ") return "/image/img-quiz.png";
    if (type === "CARD") return "/image/img-duocards.png";
    if (type === "MEMORY") return "/image/img-memoria.png";
    if (type === "HANGED") return "/image/img-ahorcado.png";
    return "/image/quiz.png";
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(Request.GET_ALL_GAMES, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setGames(response.data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    fetchGames();
  }, []);

  const handlePlay = (type: any, id: any) => {
    console.log("Jugar:", id);
    if (type === "QUIZ") router.push(`game/quiz?id=${id}`);
    if (type === "CARD") router.push(`game/duocards?id=${id}`);
    if (type === "MEMORY") router.push(`game/memorize?id=${id}`);
    if (type === "HANGED") router.push(`game/ahorcado?id=${id}`);
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-8 p-4 md:p-8">
      {games.map((game) => (
        <div
          key={game.id_game}
          className="flex flex-col gap-4 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-xl drop-shadow-xl"
        >
          <div className="flex flex-col items-center justify-center mx-auto">
            <Image
              src={getImage(game.type_game)}
              alt="Imagen del juego"
              width={400} // Aseguramos las dimensiones para evitar pixelado
              height={400}
              objectFit="cover" // Mantiene el aspecto de la imagen
              className="rounded-lg" // Opcional: agrega un borde redondeado
            />
          </div>
          <p className="text-gray-500 text-center">{game.description}</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faUser} className="text-gray-600" />
              <div>
                <h3 className="text-indigo-500 font-bold">{game.user.name}</h3>
                <p className="text-gray-500 font-medium">{game.user.role}</p>
              </div>
            </div>
            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
              <button
                type="button"
                className="border border-gray-600 py-2 px-6 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                onClick={() => handlePlay(game.type_game, game.id_game)}
              >
                JUGAR
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
