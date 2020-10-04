import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAILS,
  CLEAR_PRODUCT_DETAILS,
} from "./actionTypes";
import axios from "axios";
import { PRODUCT_SERVER } from "./../../utils/serverRoutes";

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then((response) => {
      return response.data;
    });
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request,
  };
}
export function getProductsBySell() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then((response) => {
      return response.data;
    });
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request,
  };
}
export function getWoods() {
  const request = axios.get(`${PRODUCT_SERVER}/woods`).then((response) => {
    return response.data;
  });
  return {
    type: GET_WOODS,
    payload: request,
  };
}
export function getBrands() {
  const request = axios.get(`${PRODUCT_SERVER}/brands`).then((response) => {
    return response.data;
  });
  return {
    type: GET_BRANDS,
    payload: request,
  };
}

export function getProductsToShop(
  skip,
  limit,
  filters = [],
  previousState = []
) {
  const data = {
    skip,
    limit,
    filters,
  };
  const request = axios
    .post(`${PRODUCT_SERVER}/shop`, data)
    .then((response) => {
      response.data.articles = [...previousState, ...response.data.articles];
      return {
        size: response.data.size,
        articles: response.data.articles,
      };
    });
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request,
  };
}
export function addProduct(datatoSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/article`, datatoSubmit)
    .then((response) => {
      return response.data;
    });
  return {
    type: ADD_PRODUCT,
    payload: request,
  };
}
export function clearAddProductStata() {
  return {
    type: CLEAR_PRODUCT,
    payload: "",
  };
}
export function getProductsDetails(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then((response) => {
      console.log(response.data);
      return response.data[0];
    });
  return {
    type: GET_PRODUCT_DETAILS,
    payload: request,
  };
}
export function clearProductsDetails(id) {
  return {
    type: CLEAR_PRODUCT_DETAILS,
    payload: "",
  };
}
//   GET_PRODUCT_DETAILS,
//   CLEAR_PRODUCT_DETAILS,
