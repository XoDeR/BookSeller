import { SAVE_USER_DETAILS } from "../actions/user";
import adminEmails from "../modules/admin";
const initialState = {};

export default function books(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER_DETAILS:
      if (adminEmails.includes(action.payload.email)) {
        return {
          ...state,
          userData: action.payload,
          isLoggedIn: true,
          isAdmin: true
        };
      } else {
        return {
          ...state,
          userData: action.payload,
          isLoggedIn: true,
          isAdmin: false
        };
      }
    default:
      return state;
  }
}