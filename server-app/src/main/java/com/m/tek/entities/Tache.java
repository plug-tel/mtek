package com.m.tek.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

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
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss",timezone = "UTC")
    @Column(name = "date_échéance")
    private Date date;

    public Tache() {
    }

    public Tache(Long id, String titre, String description, String statut, Date date) {
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
    public Tache(String titre, String description, String statut, Date date) {
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
