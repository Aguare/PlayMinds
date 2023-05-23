package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Phrase;
import org.springframework.data.repository.CrudRepository;

public interface PhraseDAO extends CrudRepository<Phrase, Long> {
}
