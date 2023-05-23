package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Card;
import com.coderhouse.pmb.Entitys.CardGame;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardGameDAO extends CrudRepository<CardGame, Long> {
    @Query("SELECT cg FROM CardGame cg WHERE cg.idGame = :idGame")
    List<CardGame> findAllByIdGame(String idGame);
}
