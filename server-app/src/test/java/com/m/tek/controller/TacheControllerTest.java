package com.m.tek.controller;

import com.m.tek.dto.TacheDTO;
import com.m.tek.entities.Tache;
import com.m.tek.services.TacheSevice;
import jakarta.persistence.EntityNotFoundException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Optional;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TacheControllerTest {
    private static Logger logger = LogManager.getLogger(TacheControllerTest.class);
    @Mock
    TacheSevice mockTacheService;

    @InjectMocks
    TacheController underTest;

    @Test
    void create_shouldCreateTacheSuccessfully(){
        // given
        Tache tache = new Tache();
        tache.setTitre("tache");
        Optional<Tache> expected = Optional.of(tache);

        when(mockTacheService.create(anyLong(),any())).thenReturn(expected);

        // when
        TacheDTO request = new TacheDTO();
        ResponseEntity<Tache> response = underTest.create(1L,request);
        Tache actual = response.getBody();

        // then
        assertAll(
                () -> assertNotNull(actual),
                () -> assertEquals(HttpStatus.CREATED, response.getStatusCode()),
                () -> assertEquals(expected.get(), actual),
                () -> assertEquals(tache.getTitre(), actual.getTitre())
        );
        logger.info(HttpStatus.CREATED);
        logger.info(response.getStatusCode());
    }
    @Test
    void create_shouldReturnStatusBadRequest(){
        // given
        when(mockTacheService.create(anyLong(),any())).thenReturn(Optional.empty());

        // when
        TacheDTO request = new TacheDTO();
        ResponseEntity<Tache> response = underTest.create(1l,request);

        // then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        logger.error(response.getStatusCode());
    }

    @Test
    void getById_shouldReturnStatusNotFound_whenTacheIdNotExist(){
        // given
        when(mockTacheService.findById(anyLong())).thenReturn(null);

        // when
        ResponseEntity<TacheDTO> response = (ResponseEntity<TacheDTO>) underTest.getById(1L);
        TacheDTO actual = response.getBody();

        // then
        assertNull(actual);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        logger.info(response.getStatusCode());
        logger.error(HttpStatus.NOT_FOUND);
    }

    @Test
    void deleteById_shouldReturnStatusNotFound_whenTacheIdNotExist(){
        // given
        Mockito.doThrow(EntityNotFoundException.class).
                when(mockTacheService).deleteById(anyLong());

        // when
        ResponseEntity<Void> response = underTest.deleteTacheById(1L);

        // then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        logger.info(response.getStatusCode());
        logger.error(HttpStatus.NOT_FOUND);
    }
}