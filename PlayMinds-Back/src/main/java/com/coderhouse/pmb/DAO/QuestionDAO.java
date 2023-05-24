package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Question;
import org.springframework.data.repository.CrudRepository;

public interface QuestionDAO extends CrudRepository<Question, Long> {
}
