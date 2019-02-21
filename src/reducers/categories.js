import { GET_CATEGORIES } from "../actions/categories";

export default function categories(state = [], action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_CATEGORIES:
      return newState.concat(action.categories)
    default:
      return state;
  }
}
