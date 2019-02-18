import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  VOTE_COMMENT
} from "../actions/comments";
import { REMOVE_POST } from "../actions/posts";

export default function comments(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        ...action.comments
      };
    case ADD_COMMENT:
      return {
        ...state,
        ...action.comment
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          body: action.comment.body,
          timestamp: action.comment.timestamp
        }
      };
    case VOTE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore:
            action.option === "upVote"
              ? state[action.id].voteScore + 1
              : state[action.id].voteScore - 1
        }
      };
    case REMOVE_COMMENT:
      const updatedState = { ...state };
      delete updatedState[action.id];
      return updatedState;
    case REMOVE_POST:
      const preState = state;
      const newStateKeys = Object.keys(preState).filter(
        key => preState[key].parentId !== action.postId
      );
      const newState = {};
      for (let key of newStateKeys) {
        newState[key] = preState[key];
      }
      return newState;
    default:
      return state;
  }
}
