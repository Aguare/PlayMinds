export enum Request {
<<<<<<< HEAD
  SERVER = "https://98c1-181-174-107-182.ngrok-free.app/PlayMind",
=======
  SERVER = "http://localhost:8080/PlayMind",
  SERVER_API = "http://localhost:8080",
>>>>>>> Fronted
  GET_ALL_GAMES = SERVER + "/Games/GetAllGames",
  REGISTER_HANGED_GAME = SERVER + "/Games/RegisterHangedGame",
  UPLOAD_DUO_CARD = SERVER + "/Files/upload",
  REGISTER_CARD_GAME = SERVER + "/Games/RegisterCardGame",
  UPLOAD_MEMORIZE = SERVER + "/Files/upload",
  REGISTER_MEMORY_GAME = SERVER + "/Games/RegisterMemoryGame",
  REGISTER_QUIZ_GAME = SERVER + "/Games/RegisterQuizGame",
  REGISTER_USER = SERVER + "/Users/RegisterUser",
  SERVER_IMAGE = SERVER_API +"/images"
}
