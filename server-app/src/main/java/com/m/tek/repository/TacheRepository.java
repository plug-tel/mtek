package com.m.tek.repository;

import com.m.tek.entities.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository("tacheRepository")
public interface TacheRepository extends JpaRepository<Tache, Long> {
    List<Tache> findTacheByUserId(Long userId);
    @Query("SELECT a FROM Tache a WHERE " +
            "LOWER(a.titre) LIKE LOWER(CONCAT('%', :titre, '%')) OR " +
            "LOWER(a.description) LIKE LOWER(CONCAT('%', :description, '%')) OR " +
            "LOWER(a.statut) LIKE LOWER(CONCAT('%', :statut, '%'))")

    List<Tache> findTacheByCreteria(String titre,String description,String statut);

}
