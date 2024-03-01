import { combineReducers } from "redux";
import tacheReducer from "./tacheReducer";
import auth from "./auth";
export default combineReducers({
  auth,
  tacheReducer

});