import { combineReducers } from "redux";
import user from "./user";
import products from "./products";
import siteInfo from "./site";

const rootReducer = combineReducers({
  user,
  products,
  siteInfo,
});
export default rootReducer;
