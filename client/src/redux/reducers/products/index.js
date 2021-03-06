import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_WOOD,
  GET_PRODUCT_DETAILS,
  CLEAR_PRODUCT_DETAILS,
} from "./../../actions/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_WOODS:
      return { ...state, woods: action.payload };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size,
      };
    case ADD_BRAND:
      if (action.payload.success) {
        return {
          ...state,
          addBrand: action.payload.success,
          brands: action.payload.brands,
        };
      }
      break;
    case ADD_WOOD:
      if (action.payload.success) {
        return {
          ...state,
          addBrand: action.payload.success,
          woods: action.payload.woods,
        };
      }
      break;

    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    case GET_PRODUCT_DETAILS:
      return { ...state, prodDetails: action.payload };
    case CLEAR_PRODUCT_DETAILS:
      return { ...state, prodDetails: action.payload };
    default:
      return { ...state };
  }
}
