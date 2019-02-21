import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  VOTE_COMMENT
} from "../actions/comments";
import { REMOVE_POST } from "../actions/posts";

export default function comments(state = [], action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_COMMENTS:
      return newState.concat(...action.comments);
    case ADD_COMMENT:
      return newState.concat(...action.comment);
    case EDIT_COMMENT:
      let comment = newState.find(comment => comment.id === action.comment.id);
      comment.body = action.comment.body;
      comment.timestamp = action.comment.timestamp;
      return newState;
    case VOTE_COMMENT:
      if (action.option === "upVote") {
        newState.find(comment => comment.id === action.id).voteScore += 1;
        return newState;
      } else {
        newState.find(comment => comment.id === action.id).voteScore -= 1;
        return newState;
      }
    case REMOVE_COMMENT:
      return newState.filter(comment => comment.id !== action.id);
    case REMOVE_POST:
      return newState.filter( comment => comment.parentId !== action.id);
    default:
      return state;
  }
}
