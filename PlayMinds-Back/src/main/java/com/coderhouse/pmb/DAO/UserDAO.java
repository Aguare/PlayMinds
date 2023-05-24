package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserDAO extends CrudRepository<User, String>{
    Iterable<User> findAllByOrderByPointsDesc();

    @Query("SELECT u FROM User u WHERE u.role = 'STUDENT'")
    Iterable<User> findAllByRole_Student();
}