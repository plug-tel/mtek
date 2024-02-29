package com.m.tek.repository;

import com.m.tek.entities.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository("tacheRepository")
public interface TacheRepository extends JpaRepository<Tache, Long> {

    List<Tache> findTacheByTitre(String titre);
    List<Tache> findTacheByDescription(String description);
    List<Tache> findTacheByStatut(String statut);
    List<Tache> findTacheByDate(LocalDateTime date);
}
