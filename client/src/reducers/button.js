import { DISABLE_BUTTON } from "../actions/button";
import { ENABLE_BUTTON } from "../actions/button";

const initialState = {};

export default function button(state = initialState, action) {
  switch (action.type) {
    case DISABLE_BUTTON:
      return { ...state, [action.payload]: true };
    case ENABLE_BUTTON:
      return { ...state, [action.payload]: false };
    default:
      return state;
  }
}