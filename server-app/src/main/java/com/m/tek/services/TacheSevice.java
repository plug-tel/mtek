package com.m.tek.services;

import com.m.tek.dto.TacheDTO;
import com.m.tek.entities.Tache;
import com.m.tek.repository.TacheRepository;
import com.m.tek.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TacheSevice {
    private final TacheRepository tacheRepository;
    private final UserRepository userRepository;
    public TacheSevice(TacheRepository tacheRepository,UserRepository userRepository) {
        this.tacheRepository = tacheRepository;
        this.userRepository = userRepository;
    }
    @Transactional(readOnly = true)
    public List<TacheDTO> getAll(Long userId) {

        final List<TacheDTO> tacheDTOList = new ArrayList<TacheDTO>();

        tacheRepository.findTacheByUserId(userId)
                    .forEach(tache -> {

                        TacheDTO tacheDto = new TacheDTO();
                        if(tache != null){
                            tacheDto.setId(tache.getId());
                            tacheDto.setUser(tache.getUser().getId());
                            tacheDto.setTitre(tache.getTitre());
                            tacheDto.setDescription(tache.getDescription());
                            tacheDto.setStatut(tache.getStatut());
                            tacheDto.setDate(tache.getDate());

                        }
                        tacheDTOList.add(tacheDto);

                    });

        return tacheDTOList;
    }
    @Transactional(readOnly = true)
    public List<TacheDTO> getTaches(String titre, String description, String statut ) {

        final List<TacheDTO> tacheDTOList = new ArrayList<TacheDTO>();

                tacheRepository.findTacheByCreteria(titre,description,statut)
                        .forEach(tachef -> {
                            TacheDTO tacheDto = new TacheDTO();
                            if (tachef != null) {
                                tacheDto.setId(tachef.getId());
                                tacheDto.setTitre(tachef.getTitre());
                                tacheDto.setDescription(tachef.getDescription());
                                tacheDto.setStatut(tachef.getStatut());
                                tacheDto.setDate(tachef.getDate());
                            }
                            tacheDTOList.add(tacheDto);
                        });
        return tacheDTOList;
    }
    @Transactional
    public Optional<Tache> create(Long userId, TacheDTO request){

        Optional<Tache> tache = userRepository.findById(userId).map(user -> {
            request.setUser(user.getId());
            Tache newTache = new Tache();
            newTache.setTitre(request.getTitre());
            newTache.setDescription(request.getDescription());
            newTache.setStatut(request.getStatut());
            newTache.setDate(request.getDate());
            newTache.setUser(user);
            return tacheRepository.save(newTache);

        } );
        return  tache;
    }
    @Transactional
    public Optional<Tache> update(TacheDTO request, Long tacheId){
       Tache tache = tacheRepository.findById(tacheId)
                .orElseThrow(() -> new RuntimeException("Tache not found"));;

        tache.setTitre(request.getTitre());
        tache.setDescription(request.getDescription());
        tache.setStatut(request.getStatut());
        tache.setDate(request.getDate());
        return Optional.of(tacheRepository.save(tache));
    }

    @Transactional(readOnly = true)
    public TacheDTO findById(long id){
        final Tache tache =  tacheRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException());

        TacheDTO tacheDto = new TacheDTO();
        if(tache != null){
            tacheDto.setId(tache.getId());
            tacheDto.setTitre(tache.getTitre());
            tacheDto.setDescription(tache.getDescription());
            tacheDto.setStatut(tache.getStatut());
            tacheDto.setDate(tache.getDate());
        }

        return tacheDto;
    }
    @Transactional
    public void deleteById(long id){
        final Tache tache =  tacheRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException());

        tacheRepository.deleteById(id);
    }
}
