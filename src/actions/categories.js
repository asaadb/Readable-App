import * as API from "../utils/Api";

export const GET_CATEGORIES = "GET_CATEGORIES";

export function receiveCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  };
}
export function handleReceiveCategories() {
  return dispatch => {
    return API.getCategories().then(categories => {
      dispatch(receiveCategories(categories));
    });
  };
}
