package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDAO extends CrudRepository<User, String>{
    Iterable<User> findAllByOrderByPointsDesc();
}