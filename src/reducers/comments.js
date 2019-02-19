import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  VOTE_COMMENT
} from "../actions/comments";
import { REMOVE_POST } from "../actions/posts";

export default function comments(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      return state.concat(...action.comments);
    case ADD_COMMENT:
      return state.concat(...action.comment);
    case EDIT_COMMENT:
      let comment = state.find(comment => comment.id === action.comment.id);
      comment.body = action.comment.body;
      comment.timestamp = action.comment.timestamp;
      return state;
    case VOTE_COMMENT:
      if (action.option === "upVote") {
        state.find(comment => comment.id === action.id).voteScore += 1;
        return state;
      } else {
        state.find(comment => comment.id === action.id).voteScore -= 1;
        return state;
      }
    case REMOVE_COMMENT:
      const updatedState = state.filter(comment => comment.id !== action.id);
      return updatedState;
    case REMOVE_POST:
      const newState = state.filter(
        comment => comment.parentId !== action.postId
      );
      return newState;
    default:
      return state;
  }
}
