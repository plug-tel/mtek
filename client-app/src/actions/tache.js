import {
    CREATE_SUCCESS,
    GETONE_SUCCESS,
    CREATE_FAIL,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    GETALL_FAIL,
    SET_MESSAGE,
    DELETE_TACHE,
  } from "./types";
import TacheService from "services/TacheService";

export const getTacheById = (id) => (dispatch) => {
  return TacheService.getTacheById().then(
      (response) => {
          dispatch({
            type: GETONE_SUCCESS,
            payload: response.data,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type:  GETALL_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const create = (data,userId) => (dispatch) => {
    return TacheService.create(data,userId).then(
      (response) => {
        dispatch({
          type: CREATE_SUCCESS,
          payload: response.data,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: CREATE_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
export const updateTache = (id,data) => (dispatch) => {
    return TacheService.update(id,data).then(
      (response) => {
        dispatch({
          type: UPDATE_SUCCESS,
          payload: response.data,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: UPDATE_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

export const deleteTache = (id) => async (dispatch) => {
    try {
      await TacheService.deleteTache(id);
      dispatch({
        type: DELETE_TACHE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  