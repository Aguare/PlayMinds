package com.coderhouse.pmb.Controllers;

import com.coderhouse.pmb.Controllers.Getters.GameBuild;
import com.coderhouse.pmb.DAO.*;
import com.coderhouse.pmb.Entitys.*;
import com.coderhouse.pmb.Entitys.Assistant.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/Games")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class GameCTRL {

    @Autowired
    private GameDAO game;

    @Autowired
    private QuestionDAO question;

    @Autowired
    private QuestionAnswerDAO questionAnswer;

    @Autowired
    QuestionGameDAO questionGame;

    @Autowired
    private AnswerDAO answer;

    @Autowired
    private GameBuild gameBuild;

    @Autowired
    private ImageGameDAO imageGame;

    @Autowired
    private PhraseDAO phrase;

    @Autowired
    private PhraseGameDAO phraseGame;

    @Autowired
    private CardDAO card;

    @Autowired
    private CardGameDAO cardGame;

    @Autowired
    private GameCompleteDAO gameComplete;

    @Autowired
    private CommentDAO comment;

    @Autowired
    private NotificationDAO notification;

    @Autowired
    private UserDAO user;

    private void addNotification(String message, Game game, boolean isComment){
        String redirect = "game/";
        switch (game.getType_game()) {
            case QUIZ -> redirect += "quiz?id=";
            case MEMORY -> redirect += "memory?id=";
            case HANGED -> redirect += "hanged?id=";
            case CARD -> redirect += "card?id=";
        }
        redirect += game.getId_game();
        registerNotification(message, !isComment, game.getUser().getEmail(), redirect);
    }

    @PostMapping("/RegisterComment")
    public boolean registerComment(@RequestBody Comment comment) {
        this.comment.save(comment);
        Game game = this.game.findById(comment.getGame_id_game()).orElse(null);
        if (game != null) {
            String message = comment.getUser_email() + " ha comentado en tu juego" + game.getName_game();
            addNotification(message, game, true);
            return true;
        }
        return true;
    }

    @PostMapping("/RegisterQuizGame")
    public QuizGame registerQuizGame(@RequestBody QuizGame quizGame) {
        quizGame.getGame().setId_game(generateUUID());
        Game newQuiz = this.game.save(quizGame.getGame());
        List<QuestionOBJ> questions = quizGame.getQuestions();
        for (QuestionOBJ q : questions) {
            Question newQuestion = this.question.save(q.getQuestion());
            QuestionGame newQuestionGame = new QuestionGame();
            newQuestionGame.setQuestion(newQuestion.getId());
            newQuestionGame.setFK_id_game(newQuiz.getId_game());
            this.questionGame.save(newQuestionGame);
            List<Answer> answers = q.getAnswers();
            for (Answer a : answers) {
                Answer newAnswer = answer.save(a);
                QuestionAnswer newQA = new QuestionAnswer();
                newQA.setQuestion(newQuestion.getId());
                newQA.setAnswer(newAnswer.getId());
                this.questionAnswer.save(newQA);
            }
        }
        String message = quizGame.getGame().getUser().getName()+" ha creado un nuevo juego de Preguntas!!";
        addNotification(message, newQuiz, false);
        return null;
    }

    @PostMapping("/RegisterMemoryGame")
    public MemoryGame registerMemoryGame(@RequestBody MemoryGame memoryGame) {
        memoryGame.getGame().setId_game(generateUUID());
        Game newMemory = this.game.save(memoryGame.getGame());
        List<Image> images = memoryGame.getImageList();
        for (Image i : images) {
            ImageGame newImageGame = new ImageGame();
            newImageGame.setIdGame(newMemory.getId_game());
            newImageGame.setImage(i.getId());
            this.imageGame.save(newImageGame);
        }
        String message = memoryGame.getGame().getUser().getName()+" ha creado un nuevo juego de Memoria!!";
        addNotification(message, newMemory, false);
        return null;
    }

    @PostMapping("/RegisterHangedGame")
    public HangedGame registerHangedGame(@RequestBody HangedGame hangedGame) {
        hangedGame.getGame().setId_game(generateUUID());
        Game newHanged = this.game.save(hangedGame.getGame());
        List<Phrase> phrases = hangedGame.getPhrases();
        for (Phrase p : phrases) {
            Phrase newPhrase = this.phrase.save(p);
            PhraseGame newPhraseGame = new PhraseGame();
            newPhraseGame.setIdGame(newHanged.getId_game());
            newPhraseGame.setIdPhrase(newPhrase.getId_phrase());
            this.phraseGame.save(newPhraseGame);
        }
        String message = hangedGame.getGame().getUser().getName()+" ha creado un nuevo juego de Ahorcado!!";
        addNotification(message, newHanged, false);
        return null;
    }

    @PostMapping("/RegisterCardGame")
    public CardGameG registerCardGame(@RequestBody CardGameG cardGameG) {
        cardGameG.getGame().setId_game(generateUUID());
        Game newGame = this.game.save(cardGameG.getGame());
        List<Card> cards = cardGameG.getCards();
        for (Card c : cards) {
            Card ca = this.card.save(c);
            CardGame newCardGame = new CardGame();
            newCardGame.setIdGame(newGame.getId_game());
            newCardGame.setIdCard(ca.getIdCard());
            this.cardGame.save(newCardGame);
        }
        String message = cardGameG.getGame().getUser().getName()+" ha creado un nuevo juego de Cartas!!";
        addNotification(message, newGame, false);
        return null;
    }

    @PostMapping("/RegisterGameComplete")
    public boolean registerGameComplete(@RequestBody GameComplete gameComplete) {
        this.gameComplete.save(gameComplete);
        return true;
    }

    @GetMapping("/GetAllGames")
    public Object getAllGames() {
        return this.game.findAll();
    }

    @GetMapping("/GetGame")
    public Object getGame(String id_game) {
        return this.game.findById(id_game);
    }

    @GetMapping("/GetQuizGame")
    public Object getQuizGame(String id_game) {
        return gameBuild.getQuizGameById(id_game);
    }

    @GetMapping("/GetMemoryGame")
    public Object getMemoryGame(String id_game) {
        return gameBuild.getMemoryGameById(id_game);
    }

    @GetMapping("/GetHangedGame")
    public Object getHangedGame(String id_game) { return gameBuild.getHangedGameById(id_game); }

    @GetMapping("/GetCardGame")
    public Object getCardGame(String id_game) { return gameBuild.getCardGameById(id_game); }

    @GetMapping("/GetGameComments")
    public Object getGameComments(String id_game){ return gameBuild.getGameCommentsById(id_game); }

    @GetMapping("/GetRankingByGame")
    public Iterable<GameComplete> getUserByPoints(String idGame) { return this.gameComplete.findAllByIdGame(idGame); }

    @PutMapping("/UpdateNotificationByUser")
    public boolean updateNotificationByUser(String user){
        Iterable<Notification> notifications = this.notification.findAllByUser(user);
        for (Notification n : notifications){
            n.setViewed(true);
            this.notification.save(n);
        }
        return true;
    }

    private void registerNotification(String message, boolean isAllUsers, String user, String redirect){
        if (isAllUsers){
            Iterable<User> users = this.user.findAllByRole_Student();
            for (User u : users){
                Notification notification = new Notification();
                notification.setMessage(message);
                notification.setUser(u.getEmail());
                notification.setViewed(false);
                notification.setRedirect(redirect);
                this.notification.save(notification);
            }
        }else{
            User u = this.user.findById(user).get();
            {
                Notification notification = new Notification();
                notification.setMessage(message);
                notification.setUser(u.getEmail());
                notification.setViewed(false);
                notification.setRedirect(redirect);
                this.notification.save(notification);
            }
        }
    }

    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int LENGTH = 10;

    private static String generateUUID() {
        StringBuilder uuid = new StringBuilder();
        Random random = new Random();

        while (uuid.length() < LENGTH) {
            int index = random.nextInt(CHARACTERS.length());
            uuid.append(CHARACTERS.charAt(index));
        }

        return uuid.toString();
    }


}
