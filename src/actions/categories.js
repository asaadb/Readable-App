import * as API from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_CATEGORIES = "GET_CATEGORIES";

export function receiveCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  };
}
export function handleReceiveCategories() {
  return dispatch => {
    dispatch(showLoading())
    return API.getCategories().then(categories => {
      dispatch(receiveCategories(categories));
      dispatch(hideLoading())
    });
  };
}
