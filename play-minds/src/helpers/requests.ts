export enum Request {
  SERVER = "https:/7707-181-174-107-182.ngrok-free.app/PlayMind",
  SERVER_API = "https:/7707-181-174-107-182.ngrok-free.app/",
  GET_ALL_GAMES = SERVER + "/Games/GetAllGames",
  REGISTER_HANGED_GAME = SERVER + "/Games/RegisterHangedGame",
  UPLOAD_DUO_CARD = SERVER + "/Files/upload",
  REGISTER_CARD_GAME = SERVER + "/Games/RegisterCardGame",
  UPLOAD_MEMORIZE = SERVER + "/Files/upload",
  REGISTER_MEMORY_GAME = SERVER + "/Games/RegisterMemoryGame",
  REGISTER_QUIZ_GAME = SERVER + "/Games/RegisterQuizGame",
  REGISTER_USER = SERVER + "/Users/RegisterUser",
  SERVER_IMAGE = SERVER_API + "/images",
  REGISTER_COMMENT = SERVER + "/Games/RegisterComment",
}
