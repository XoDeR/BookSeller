import { REQUEST_BOOKS } from "../actions";

const initialState = {
  data: []
};

export default function books(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BOOKS:
      return {
        ...state,
        data: action.payload.body
      };
    default:
      return state;
  }
}