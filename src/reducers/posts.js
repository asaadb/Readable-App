import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  VOTE_POST
} from "../actions/posts";

export default function posts(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
    let newPosts = {}
      for(let post of action.posts) {
          newPosts[post.id] = post
      }
      return {
        ...state,
        ...newPosts,
      };
    case ADD_POST:
      return {
        ...state,
        ...action.post
      };
    case EDIT_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          title: action.title,
          body: action.body
        }
      };
    case VOTE_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          voteScore:
            action.option === "upVote"
              ? state[action.postId].voteScore + 1
              : state[action.postId].voteScore - 1
        }
      };
    case REMOVE_POST:
      const updatedState = { ...state };
      delete updatedState[action.postId];
      return updatedState;
    default:
      return state;
  }
}
