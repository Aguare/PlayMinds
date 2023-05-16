package com.coderhouse.pmb.Entitys.Assistant;

import com.coderhouse.pmb.Entitys.Answer;
import com.coderhouse.pmb.Entitys.Question;

import java.util.List;

public class QuestionOBJ {
    private Question question;
    List<Answer> answers;

    public QuestionOBJ(Question question, List<Answer> answers) {
        this.question = question;
        this.answers = answers;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }
}
