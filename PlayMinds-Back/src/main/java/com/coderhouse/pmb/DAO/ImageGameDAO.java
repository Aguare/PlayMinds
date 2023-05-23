package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Image;
import com.coderhouse.pmb.Entitys.ImageGame;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ImageGameDAO extends CrudRepository<ImageGame, Long> {

    List<ImageGame> findAllByIdGame(String idGame);
}
