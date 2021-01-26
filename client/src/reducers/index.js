import { combineReducers } from "redux";

import BooksReducer from "./books";
import CartsReducer from "./cart";
import QuantityReducer from "./quantity";
import ButtonsReducer from "./button";
import UserReducer from "./user";
import OrderReducer from "./order";

import { reducer as formReducer } from "redux-form";
import { USER_LOGOUT } from "../actions/user";
import { ORDER_COMPLETE } from "../actions/order";

const appReducer = combineReducers({
  bookList: BooksReducer,
  cartItems: CartsReducer,
  bookQuantity: QuantityReducer,
  orderDetails: OrderReducer,
  areButtonsDisabled: ButtonsReducer,
  form: formReducer,
  user: UserReducer
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  } else if (action.type === ORDER_COMPLETE) {
    state = {
      ...state,
      cartItems: undefined,
      bookQuantity: undefined,
      orderDetails: undefined,
      areButtonsDisabled: undefined
    };
  }
  return appReducer(state, action);
};

export default rootReducer;