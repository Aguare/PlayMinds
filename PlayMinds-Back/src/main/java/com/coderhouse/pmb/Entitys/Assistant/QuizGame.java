package com.coderhouse.pmb.Entitys.Assistant;

import com.coderhouse.pmb.Entitys.Game;

import java.util.List;

public class QuizGame{

    private Game game;
    private List<QuestionOBJ> questions;

    public QuizGame(Game game, List<QuestionOBJ> questions) {
        this.game = game;
        this.questions = questions;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public List<QuestionOBJ> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionOBJ> questions) {
        this.questions = questions;
    }
}
