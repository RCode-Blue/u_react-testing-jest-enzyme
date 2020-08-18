import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsREducer";

export default combineReducers({
  success,
  guessedWords,
});
