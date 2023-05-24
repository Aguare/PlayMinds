package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.GameComplete;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GameCompleteDAO extends CrudRepository<GameComplete, Long> {

    @Query("SELECT gc FROM GameComplete gc WHERE gc.user = :user")
    List<GameComplete> findAllByUser(String user);

    @Query("SELECT gc FROM GameComplete gc WHERE gc.game = :idGame")
    Iterable<GameComplete> findAllByIdGame(String idGame);
}
