import { ADD_TO_CART } from "../actions";
import { REMOVE_FROM_CART } from "../actions";

const initialState = [];

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      const newState = state.filter(book => {
        if (book.id === action.payload) {
          return false;
        } else {
          return true;
        }
      });
      return newState;
    default:
      return state;
  }
}