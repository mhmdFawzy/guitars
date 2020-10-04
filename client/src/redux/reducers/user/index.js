import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  UPDATE_USER_DATA,
} from "../../actions/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case UPDATE_USER_DATA:
      return { ...state, updateUser: action.payload };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_CART_ITEMS:
      return { ...state, cart: action.payload };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cartDetail,
        },
      };

    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };

    default:
      return state;
  }
}
