package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardDAO extends CrudRepository<Card, Long> {
}
