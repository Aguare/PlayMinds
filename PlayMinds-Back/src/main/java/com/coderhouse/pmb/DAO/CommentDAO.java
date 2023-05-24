package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentDAO extends CrudRepository<Comment, Long>{

    @Query("SELECT c FROM Comment c WHERE c.game_id_game = :id")
    List<Comment> findByGameIdGame(String id);
}
