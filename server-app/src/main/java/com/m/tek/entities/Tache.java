package com.m.tek.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "taches")
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String description;
    private String statut;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm",timezone = "UTC")
    @Column(name = "date_échéance")
    private LocalDateTime date;

    public Tache() {
    }

    public Tache(Long id, String titre, String description, String statut, LocalDateTime date) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.statut = statut;
        this.date = date;
    }

    public Tache(String titre, String description, String statut) {
        this.titre = titre;
        this.description = description;
        this.statut = statut;
    }
    public Tache(String titre, String description, String statut, LocalDateTime date) {
        this.titre = titre;
        this.description = description;
        this.statut = statut;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
