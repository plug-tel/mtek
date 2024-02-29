package com.m.tek.controller;

import com.m.tek.entities.Tache;
import com.m.tek.repository.TacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tache")
public class TacheController {
    @Autowired
    TacheRepository tacheRepository;
    @GetMapping("/allTache")
    public ResponseEntity<?> getAll(@RequestParam(required = false) String titre,@RequestParam(required = false) String description,@RequestParam(required = false) String statut,@RequestParam(required = false) Date date) {

        try {
            List<Tache> taches = new ArrayList<Tache>();

            if (titre == null && description == null && statut ==null && date ==null  )
                taches = tacheRepository.findAll();
            else if(titre != null)
                taches = tacheRepository.findTacheByTitre(titre);
            else if( description != null)
                taches = tacheRepository.findTacheByDescription(description);
            else if( statut != null)
                taches = tacheRepository.findTacheByStatut(statut);
            else
                taches = tacheRepository.findTacheByDate(date);

            return new ResponseEntity<>(taches, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/tache/{id}")
    public ResponseEntity<Tache> getTacheById(@PathVariable(value = "id") Long id) {

        Tache tache = tacheRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found Tache with id = " + id));

        return new ResponseEntity<>(tache, HttpStatus.OK);
    }
    @PostMapping("/createTache")
    public ResponseEntity<Tache> createTache(@RequestBody Tache tacheRequest) {

        try {
            Tache tache = tacheRepository
                    .save(new Tache(tacheRequest.getTitre(),tacheRequest.getDescription(), tacheRequest.getStatut(),tacheRequest.getDate()));
            return new ResponseEntity<>(tache, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/updateTache/{id}")
    public ResponseEntity<Tache> updateTache(@PathVariable("id") Long id, @RequestBody Tache tacheRequest) {

        Tache tache = tacheRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("tache " + id + "not found"));

        tache.setTitre(tacheRequest.getTitre());
        tache.setDescription(tacheRequest.getDescription());
        tache.setStatut(tacheRequest.getStatut());
        tache.setDate(tacheRequest.getDate());

        return new ResponseEntity<>(tacheRepository.save(tache), HttpStatus.OK);
    }
    @DeleteMapping("/deleteTache/{id}")
    public ResponseEntity<HttpStatus> deleteTache(@PathVariable("id") Long id) {

        tacheRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
