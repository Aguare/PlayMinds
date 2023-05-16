package com.coderhouse.pmb.Controllers;

import com.coderhouse.pmb.Controllers.Getters.GameBuild;
import com.coderhouse.pmb.DAO.*;
import com.coderhouse.pmb.Entitys.*;
import com.coderhouse.pmb.Entitys.Assistant.QuestionOBJ;
import com.coderhouse.pmb.Entitys.Assistant.QuizGame;
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
        return null;
    }

    @GetMapping("/GetGame")
    public Object getGame(String id_game) {
        return gameBuild.getQuizGameById(id_game);
    }


    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int LENGTH = 10;

    public static String generateUUID() {
        StringBuilder uuid = new StringBuilder();
        Random random = new Random();

        while (uuid.length() < LENGTH) {
            int index = random.nextInt(CHARACTERS.length());
            uuid.append(CHARACTERS.charAt(index));
        }

        return uuid.toString();
    }

}
