import { UPDATE_ORDER_TOTAL_PRICE } from "../actions/order";
import { ADD_ORDER_ADDRESS_ID } from "../actions/order";

const initialState = {};

export default function updateOrderDetails(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORDER_TOTAL_PRICE:
      return { ...state, price: action.payload };
    case ADD_ORDER_ADDRESS_ID:
      return { ...state, addressId: action.payload };
    default:
      return state;
  }
}