package com.coderhouse.pmb.Controllers.Getters;

import com.coderhouse.pmb.DAO.*;
import com.coderhouse.pmb.Entitys.*;
import com.coderhouse.pmb.Entitys.Assistant.MemoryGame;
import com.coderhouse.pmb.Entitys.Assistant.QuestionOBJ;
import com.coderhouse.pmb.Entitys.Assistant.QuizGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public List<QuestionOBJ> getQuestionByIdGame(String id){
        List<QuestionOBJ> questions = new ArrayList<>();
        Iterable<QuestionGame> list = this.questionGame.findByFK_id_game(id);
        for (QuestionGame qg: list) {
            questions.add(new QuestionOBJ(this.question.findById(qg.getQuestion()).orElse(null), getAnswersByIdQuestion(qg.getQuestion())));
        }
        return questions;
    }

    public List<Answer> getAnswersByIdQuestion(Long id){
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

    public List<Image> getImagesByIdGame(String id){
        List<Image> images = new ArrayList<>();
        List<ImageGame> list = this.imageGame.findAllByIdGame(id);
        for (ImageGame ig: list) {
            this.image.findById(ig.getImage()).ifPresent(images::add);
        }
        return images;
    }
}
