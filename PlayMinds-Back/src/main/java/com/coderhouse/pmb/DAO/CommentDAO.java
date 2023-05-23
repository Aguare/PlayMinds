package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentDAO extends CrudRepository<Comment, Long>{

    @Query(value = "SELECT * FROM comments WHERE game_id_game = ?1", nativeQuery = true)
    List<Comment> findByGameIdGame(String id);
}
