package com.m.tek.repository;

import com.m.tek.entities.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository("tacheRepository")
public interface TacheRepository extends JpaRepository<Tache, Long> {

    List<Tache> findTacheByTitre(String titre);
    List<Tache> findTacheByDescription(String description);
    List<Tache> findTacheByStatut(String statut);
    List<Tache> findTacheByDate(Date date);
}
