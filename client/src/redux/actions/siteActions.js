import { SITE_SERVER } from "./../../utils/serverRoutes";
import { GET_SITE_DATA, UPDATE_SITE_DATA } from "./actionTypes";
import axios from "axios";
export function getSiteData() {
  const request = axios.get(`${SITE_SERVER}/site_data`).then((response) => {
    return response.data;
  });
  return {
    type: GET_SITE_DATA,
    payload: request,
  };
}
export function updateSiteData(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/site_data`, dataToSubmit)
    .then((response) => {
      return response.data;
    });
  return {
    type: UPDATE_SITE_DATA,
    payload: request,
  };
}
