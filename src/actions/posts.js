import * as API from "../utils/Api";
import uuid from "uuid";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const REMOVE_POST = "REMOVE_POST";
export const VOTE_POST = "VOTE_POST";

export function receivePosts(posts) {
  return {
    type: GET_POSTS,
    posts
  };
}

export function createPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function updatePost({ postId, title, body }) {
  return {
    type: EDIT_POST,
    postId,
    title,
    body
  };
}

export function votePost({ postId, option }) {
  return {
    type: VOTE_POST,
    postId,
    option
  };
}

export function removePost(postId) {
  return {
    type: REMOVE_POST,
    postId
  };
}

export function handleReceivePosts() {
  return dispatch => {
    return API.getAllPosts().then(posts => {
      dispatch(receivePosts(posts));
    });
  };
}

export function handleAddPost({ title, body, author, category }) {
  return dispatch => {
    let id = uuid();
    let timestamp = Date.now();
    return API.addPost({ title, body, author, category, id, timestamp }).then(
      res => {
        dispatch(createPost({ title, body, author, category, id, timestamp }));
      }
    );
  };
}

export function handleUpdatePost({ postId, title, body }) {
  return dispatch => {
    return API.editPost({ postId, title, body }).then(post => {
      dispatch(updatePost(post));
    });
  };
}

export function handleVotePost({ id, option }) {
  return dispatch => {
    return API.voteOnPost({ id, option }).then(() => {
      dispatch(votePost({ id, option }));
    });
  };
}

export function handleRemovePost(id) {
  return dispatch => {
    return API.deletePost(id).then(() => {
      dispatch(removePost(id));
    });
  };
}
