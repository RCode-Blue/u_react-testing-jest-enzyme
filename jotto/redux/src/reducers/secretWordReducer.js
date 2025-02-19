import { actionTypes } from "../actions";

/**
 * @function secretWordReducer
 * @param {string} state - State before reducer
 * @param {object} action - Action sent to reducer
 * @param {string} - New state (secret word payload from action)
 */
export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload;
    default:
      return state;
  }
};
