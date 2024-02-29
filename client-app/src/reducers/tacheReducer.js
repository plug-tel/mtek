import {
  CREATE_TACHE,
  RETRIEVE_TACHES,
  UPDATE_TACHE,
  DELETE_TACHE,
} from "actions/types";

const initialState = [];

function tacheReducer(taches = initialState, action) {
  const { type, payload } = action;

  switch (type) {
  
    case CREATE_TACHE:
      return [...taches, payload];

    case UPDATE_TACHE:
      return taches.map((tache) => {
        if (tache.id === payload.id) {
          return {
            ...tache,
            ...payload,
          };
        } else {
          return tache;
        }
      });

    case DELETE_TACHE:
      return taches.filter(({ id }) => id !== payload.id);

    default:
      return taches;
  }
};

export default tacheReducer;