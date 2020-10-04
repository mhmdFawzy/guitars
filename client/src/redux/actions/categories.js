import { ADD_BRAND, ADD_WOOD } from "./actionTypes";
import axios from "axios";
import { PRODUCT_SERVER } from "./../../utils/serverRoutes";
export function addBrand(dataToSubmit, existingBrands) {
  const request = axios
    .post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then((response) => {
      let brands = [...existingBrands, response.data.brand];
      return {
        success: response.data.success,
        brands,
      };
    });
  return {
    type: ADD_BRAND,
    payload: request,
  };
}
export function addWood(dataToSubmit, existingBrands) {
  const request = axios
    .post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
    .then((response) => {
      let woods = [...existingBrands, response.data.wood];
      return {
        success: response.data.success,
        woods,
      };
    });
  return {
    type: ADD_WOOD,
    payload: request,
  };
}
