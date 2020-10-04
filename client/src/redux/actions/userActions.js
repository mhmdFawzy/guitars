import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  UPDATE_USER_DATA,
} from "./actionTypes";
import axios from "axios";
import { USER_SERVER, PRODUCT_SERVER } from "./../../utils/serverRoutes";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => {
      return response.data;
    });
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => {
      return response.data;
    });
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
export function authUser() {
  const request = axios.get(`${USER_SERVER}/auth`).then((response) => {
    return response.data;
  });
  return {
    type: AUTH_USER,
    payload: request,
  };
}
export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`).then((response) => {
    return response.data;
  });
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
export function addToCart(id) {
  const request = axios
    .post(`${USER_SERVER}/addToCart?productId=${id}`)
    .then((response) => {
      return response.data;
    });
  return {
    type: ADD_TO_CART,
    payload: request,
  };
}
export function getCartItems(cartItemsId, userCart) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItemsId}&type=array`)
    .then((response) => {
      // console.log(response.data, userCart);
      response.data.map((cartItemServer) => {
        userCart.map((cartItemClient) => {
          if (cartItemServer._id === cartItemClient.id) {
            cartItemServer.quantity = cartItemClient.quantity;
          }
          return null;
        });
        return null;
      });
      return response.data;
    });
  return { type: GET_CART_ITEMS, payload: request };
}
export function removeCartItem(id) {
  const request = axios
    .get(`${USER_SERVER}/removeFromCart?_id=${id}`)
    .then((response) => {
      response.data.cartDetail.map((cartItemServer) => {
        response.data.cart.map((cartItemClient) => {
          if (cartItemServer._id === cartItemClient.id) {
            cartItemServer.quantity = cartItemClient.quantity;
          }
          return null;
        });
        return null;
      });
      return response.data;
    });
  return { type: REMOVE_CART_ITEM, payload: request };
}
export function updateUserData(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/update_profile`, dataToSubmit)
    .then((response) => {
      return response.data;
    });

  return {
    type: UPDATE_USER_DATA,
    payload: request,
  };
}
