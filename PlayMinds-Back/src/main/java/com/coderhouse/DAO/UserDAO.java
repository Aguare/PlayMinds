package com.coderhouse.DAO;

import com.coderhouse.Entitys.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDAO extends CrudRepository<User, String>{

}