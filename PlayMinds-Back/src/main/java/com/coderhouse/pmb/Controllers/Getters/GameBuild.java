package com.coderhouse.pmb.Controllers.Getters;

import com.coderhouse.pmb.DAO.*;
import com.coderhouse.pmb.Entitys.Answer;
import com.coderhouse.pmb.Entitys.Assistant.QuestionOBJ;
import com.coderhouse.pmb.Entitys.Assistant.QuizGame;
import com.coderhouse.pmb.Entitys.Game;
import com.coderhouse.pmb.Entitys.QuestionAnswer;
import com.coderhouse.pmb.Entitys.QuestionGame;
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
}
