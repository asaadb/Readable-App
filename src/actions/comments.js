import * as API from "../utils/api";
import uuid from "uuid";
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";

export function receiveComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  };
}

export function createComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function updateComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

export function voteComment({ id, option }) {
  return {
    type: VOTE_COMMENT,
    id,
    option
  };
}

export function removeComment({id, parentId}) {
  return {
    type: REMOVE_COMMENT,
    id,
    parentId
  };
}

export function handleReceiveComments(id) {
  return dispatch => {
    dispatch(showLoading())
    return API.getCommentsForPost(id).then(comments => {
      dispatch(receiveComments(comments));
      dispatch(hideLoading())
    })
    .catch(error => {
      alert('Sorry, there was an error fetching comments from the server')
      console.log('ERROR: ', error)
    });
  };
}

export function handleCreateComment({ body, author, parentId }) {
  let id = uuid();
  let timestamp = Date.now();
  return dispatch => {
    return API.addComment({ body, author, parentId, id, timestamp }).then(
      comment => {
        dispatch(createComment(comment));
      })
      .catch(error => {
        alert('Sorry, there was an error')
        console.log('ERROR: ', error)
      });
  };
}

export function handleEditComment({ id, body }) {
  let timestamp = Date.now();
  return dispatch => {
    return API.editComment({ id, body, timestamp }).then(() => {
      dispatch(updateComment({ id, timestamp, body }));
    })
    .catch(error => {
      alert('Sorry, there was an error')
      console.log('ERROR: ', error)
    });
  };
}

export function handleVoteComment({ id, option }) {
  return dispatch => {
    return API.voteOnComment({ id, option }).then(() => {
      dispatch(voteComment({ id, option }));
    })
    .catch(error => {
      alert('Sorry, there was an error')
      console.log('ERROR: ', error)
    });
  };
}

export function handleDeleteComment({id, parentId}) {
  return dispatch => {
    return API.deleteComment(id).then(() => {
      dispatch(removeComment({id, parentId}));
    })
    .catch(error => {
      alert('Sorry, there was an error')
      console.log('ERROR: ', error)
    });
  };
}
