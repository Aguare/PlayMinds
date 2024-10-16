import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Game } from "../models/Entitys/Game";
import { Request } from "../helpers/requests";
import { useRouter } from "next/router";

const Card = () => {
  const [games, setGames] = useState<Game[]>([]);
  const router = useRouter();

  const getImage = (type: string) => {
    if (type === "QUIZ") return Request.SERVER_IMAGE + "/img-quiz.png";
    if (type === "CARD") return Request.SERVER_IMAGE + "/img-duocards.png";
    if (type === "MEMORY") return Request.SERVER_IMAGE + "/img-memoria.png";
    if (type === "HANGED") return Request.SERVER_IMAGE + "/img-ahorcado.png";
    return Request.SERVER_IMAGE + "../quiz.png";
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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 p-8">
      {games.map((game) => (
        <div
          key={game.id_game}
          className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl"
        >
          <div className="flex flex-col items-center justify-center mx-auto pad ">
            <img
              src={getImage(game.type_game)}
              alt="Imagen de fondo"
              width={400}
              height={400}
            />
          </div>
          <p className="text-gray-500">{game.description}</p>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faUser} className="text-[#EFEFEF]" />
            <div>
              <h3 className="text-indigo-500 font-bold">{game.user.name}</h3>
              <p className="text-gray-500 font-medium">{game.user.role}</p>
            </div>
            <div className="hidden w-4/12 lg:flex justify-center sm:pl-[40%] items-center gap-8">
              <button
                type="button"
                className="border border-gray-600 py-2 px-4 rounded-lg"
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
