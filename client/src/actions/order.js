export const UPDATE_ORDER_TOTAL_PRICE = "UPDATE_ORDER_TOTAL_PRICE";
export const ADD_ORDER_ADDRESS_ID = "ADD_ORDER_ADDRESS_ID";
export const ORDER_COMPLETE = "ORDER_COMPLETE";

export function updateOrderTotalPrice(price) {
  return {
    type: UPDATE_ORDER_TOTAL_PRICE,
    payload: price
  };
}

export function addOrderAddressId(addressId) {
  return {
    type: ADD_ORDER_ADDRESS_ID,
    payload: addressId
  };
}

export function orderComplete() {
  return {
    type: ORDER_COMPLETE
  };
}