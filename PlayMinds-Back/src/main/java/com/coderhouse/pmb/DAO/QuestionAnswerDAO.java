package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.QuestionAnswer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuestionAnswerDAO extends CrudRepository<QuestionAnswer, Long> {

    @Query("SELECT qa FROM QuestionAnswer qa WHERE qa.question = :questionId")
    List<QuestionAnswer> findByQuestionId(Long questionId);
}
