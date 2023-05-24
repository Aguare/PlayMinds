package com.coderhouse.pmb.DAO;

import com.coderhouse.pmb.Entitys.Notification;
import org.springframework.data.repository.CrudRepository;

public interface NotificationDAO extends CrudRepository<Notification, Long> {
    Iterable<Notification> findAllByUser(String userId);
}
