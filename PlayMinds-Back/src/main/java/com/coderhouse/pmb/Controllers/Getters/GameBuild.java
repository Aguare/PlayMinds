package com.coderhouse.pmb.Controllers.Getters;

import com.coderhouse.pmb.DAO.*;
import com.coderhouse.pmb.Entitys.*;
import com.coderhouse.pmb.Entitys.Assistant.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameBuild {

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
    private ImageGameDAO imageGame;

    @Autowired
    private ImageDAO image;

    @Autowired
    private PhraseDAO phrase;

    @Autowired
    private PhraseGameDAO phraseGame;

    @Autowired
    private CardDAO card;

    @Autowired
    private CardGameDAO cardGame;

    @Autowired
    private CommentDAO comment;

    public Game getGameById(String id) {
        Game game = this.game.findById(id).orElse(null);

        return this.game.findById(id).orElse(null);
    }

    public QuizGame getQuizGameById(String id) {
        Game game = this.game.findById(id).orElse(null);
        if (game != null) {
            return new QuizGame(game, getQuestionByIdGame(id));
        }
        return null;
    }

    private List<QuestionOBJ> getQuestionByIdGame(String id){
        List<QuestionOBJ> questions = new ArrayList<>();
        Iterable<QuestionGame> list = this.questionGame.findByFK_id_game(id);
        for (QuestionGame qg: list) {
            questions.add(new QuestionOBJ(this.question.findById(qg.getQuestion()).orElse(null), getAnswersByIdQuestion(qg.getQuestion())));
        }
        return questions;
    }

    private List<Answer> getAnswersByIdQuestion(Long id){
        List<Answer> answers = new ArrayList<>();
        List<QuestionAnswer> list = this.questionAnswer.findByQuestionId(id);
        for (QuestionAnswer qa: list) {
            answers.add(this.answer.findById(qa.getAnswer()).orElse(null));
        }
        return answers;
    }

    public MemoryGame getMemoryGameById(String id){
        Game game = this.game.findById(id).orElse(null);
        if (game != null) {
            game.getUser().setPassword("");
            return new MemoryGame(game, getImagesByIdGame(id));
        }
        return null;
    }

    private List<Image> getImagesByIdGame(String id){
        List<Image> images = new ArrayList<>();
        List<ImageGame> list = this.imageGame.findAllByIdGame(id);
        for (ImageGame ig: list) {
            this.image.findById(ig.getImage()).ifPresent(images::add);
        }
        return images;
    }

    public HangedGame getHangedGameById(String id){
        Game game = this.game.findById(id).orElse(null);
        if (game != null) {
            game.getUser().setPassword("");
            return new HangedGame(game, getPhrasesByIdGame(id));
        }
        return null;
    }

    private List<Phrase> getPhrasesByIdGame(String id){
        List<Phrase> phrases = new ArrayList<>();
        List<PhraseGame> list = this.phraseGame.findAllByFK_id_game(id);
        for (PhraseGame pg: list) {
            this.phrase.findById(pg.getIdPhrase()).ifPresent(phrases::add);
        }
        return phrases;
    }

    public CardGameG getCardGameById(String id){
        return new CardGameG(this.game.findById(id).orElse(null), getCardsByIdGame(id));
    }

    private List<Card> getCardsByIdGame(String id){
        List<Card> cards = new ArrayList<>();
        List<CardGame> list = this.cardGame.findAllByIdGame(id);
        for (CardGame cg: list) {
            this.card.findById(cg.getIdCard()).ifPresent(cards::add);
        }
        return cards;
    }

    public GameOBJ getGameCommentsById(String id){
        Game game = this.game.findById(id).orElse(null);
        if (game != null) {
            game.getUser().setPassword("");
            return new GameOBJ(game, getCommentsByIdGame(id));
        }
        return null;
    }

    private List<Comment> getCommentsByIdGame(String id){
        return this.comment.findByGameIdGame(id);
    }
}
