package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.QuestionGame;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface QuestionGameDAO extends CrudRepository<QuestionGame, Long>{

    @Query("SELECT qg FROM QuestionGame qg WHERE qg.FK_id_game = :id")
    Iterable<QuestionGame> findByFK_id_game(String id);
}
