import request from "superagent";

export const REQUEST_BOOKS = "REQUEST_BOOKS";
export const ADD_TO_CART = "ADD_TO_CART";
export const INIT_QUANTITY = "INIT_QUANTITY";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export function requestBooks() {
  const data = request.get("/api/books");
  return {
    type: REQUEST_BOOKS,
    payload: data
  };
}

export function addToCart(book) {
  return {
    type: ADD_TO_CART,
    payload: book
  };
}

export function removeFromCart(bookId) {
  return {
    type: REMOVE_FROM_CART,
    payload: bookId
  };
}

export function initQuantity(id) {
  return {
    type: INIT_QUANTITY,
    payload: id
  };
}

export function updateQuantity(id, qty) {
  return {
    type: UPDATE_QUANTITY,
    payload: { id: id, qty: qty }
  };
}