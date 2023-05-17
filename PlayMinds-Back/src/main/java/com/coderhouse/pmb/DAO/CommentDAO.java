package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentDAO extends CrudRepository<Comment, Long>{
}
