import * as API from "../utils/api";
import uuid from "uuid";
import { showLoading, hideLoading } from 'react-redux-loading'

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

export function updatePost({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  };
}

export function votePost({ id, option }) {
  return {
    type: VOTE_POST,
    id,
    option
  };
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    id
  };
}

export function handleReceivePosts() {
  return dispatch => {
    dispatch(showLoading())
    return API.getAllPosts().then(posts => {
      dispatch(receivePosts(posts));
      dispatch(hideLoading())
    });
  };
}

export function handleAddPost({ title, body, author, category }) {
  return dispatch => {
    let id = uuid();
    let timestamp = Date.now();
    return API.addPost({ title, body, author, category, id, timestamp }).then(
      res => {
        dispatch(createPost(res));
      }
    );
  };
}

export function handleUpdatePost({ id, title, body }) {
  return dispatch => {
    return API.editPost({ id, title, body }).then(post => {
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
