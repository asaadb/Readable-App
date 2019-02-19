import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  VOTE_POST
} from "../actions/posts";

export default function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return state.concat(...action.posts);
    case ADD_POST:
      return state.concat(...action.post);
    case EDIT_POST:
      let post = state.find(post => post.id === action.postId);
      post.body = action.post.body;
      post.title = action.post.title;
      return state;
    case VOTE_POST:
      if (action.option === "upVote") {
        state.find(post => post.id === action.postId).voteScore += 1;
        return state;
      } else {
        state.find(post => post.id === action.postId).voteScore -= 1;
        return state;
      }
    case REMOVE_POST:
      const updatedState = state.filter(post => post.id !== action.postId);
      return updatedState;
    default:
      return state;
  }
}
