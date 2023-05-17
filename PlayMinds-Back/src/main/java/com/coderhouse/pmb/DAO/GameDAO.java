package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameDAO extends CrudRepository<Game, String> {
}
