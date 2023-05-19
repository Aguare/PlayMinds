package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.PhraseGame;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PhraseGameDAO extends CrudRepository<PhraseGame, Long> {

    @Query("SELECT pg FROM PhraseGame pg WHERE pg.idGame = :id_game")
    List<PhraseGame> findAllByFK_id_game(String id_game);
}
