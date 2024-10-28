export enum Request {
  SERVER = "http://34.73.62.185:8080",
  SERVER_API = "http://34.73.62.185:3000",
  GET_ALL_GAMES = SERVER + "/Games/GetAllGames",
  REGISTER_HANGED_GAME = SERVER + "/Games/RegisterHangedGame",
  UPLOAD_DUO_CARD = SERVER + "/Files/upload",
  REGISTER_CARD_GAME = SERVER + "/Games/RegisterCardGame",
  UPLOAD_MEMORIZE = SERVER + "/Files/upload",
  REGISTER_MEMORY_GAME = SERVER + "/Games/RegisterMemoryGame",
  REGISTER_QUIZ_GAME = SERVER + "/Games/RegisterQuizGame",
  REGISTER_USER = SERVER + "/Users/RegisterUser",
  SERVER_IMAGE = SERVER_API + "/image",
  REGISTER_COMMENT = SERVER + "/Games/RegisterComment",
  GET_COMMENTS_BY_GAME = SERVER + "/Games/GetGameComments",
  GET_RANKING_GAME = SERVER + "/Games/GetRankingByGame",
  GET_GAME_BY_ID = SERVER + "/Games/GetGame",
  GET_NOTIFICATIONS = SERVER + "/Users/GetNotification",
}
