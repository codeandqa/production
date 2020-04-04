import { combineReducers } from "redux";
import beerReducer from "./beerReducer";

// combine reducers into state
export default combineReducers({
  beer: beerReducer
});
