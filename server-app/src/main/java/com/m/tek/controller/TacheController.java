package com.m.tek.controller;

import com.m.tek.dto.TacheDTO;
import com.m.tek.entities.Tache;
import com.m.tek.repository.TacheRepository;

import com.m.tek.services.TacheSevice;
import jakarta.persistence.EntityNotFoundException;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tache")
public class TacheController {

    @Autowired
    private TacheSevice tacheService;
    private static Logger logger = LogManager.getLogger(TacheController.class);
    @Autowired
    TacheRepository tacheRepository;

    @GetMapping("/allTaches/{userId}")
    public ResponseEntity<List<TacheDTO>> getAll(@PathVariable(value = "userId") Long userId){
        final List<TacheDTO> tacheDTOList = tacheService.getAll(userId);
        logger.info("Getting all taches with userId: {}, and data: {}", userId, tacheDTOList);
        return new ResponseEntity<>(tacheDTOList, HttpStatus.OK);
    }
    @GetMapping("/allTachesByCriteria")
    public ResponseEntity<List<TacheDTO>> filterTaches(@RequestParam(required = false) String titre,
                                                       @RequestParam(required = false) String description,
                                                       @RequestParam(required = false) String statut
                                                       ){

        final List<TacheDTO> tacheDTOList = tacheService.getTaches(titre,description,statut);

        logger.info("Getting all taches by specific creteria  {}", tacheDTOList);

        return new ResponseEntity<>(tacheDTOList, HttpStatus.OK);
    }

    @GetMapping("/tache/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        final TacheDTO tacheDto = tacheService.findById(id);
        if(tacheDto == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(tacheDto, HttpStatus.OK);
    }

    @PostMapping("/createTache/{userId}")
    public ResponseEntity<Tache> create(@PathVariable(value = "userId") Long userId,@RequestBody TacheDTO request){
        Optional<Tache> tache = tacheService.create(userId,request);

        logger.info("new tache was created", tache);
        return new ResponseEntity<>(tache.get(), HttpStatus.CREATED);
    }

    @PutMapping("/updateTache/{id}")
    public ResponseEntity<Tache> updateTache(@RequestBody TacheDTO tacheRequest, @PathVariable("id") Long tacheID) {
        Optional<Tache> tache = tacheService.update(tacheRequest,tacheID);
        return new ResponseEntity<>(tache.get(),HttpStatus.OK);
    }

    @DeleteMapping("/deleteTache/{id}")
    public ResponseEntity<Void> deleteTacheById(@PathVariable Long id){
        try{
            tacheService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
