import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import {
  ThumbUp,
  ThumbDown,
  OpenInNew,
  Edit,
  Delete
} from "@material-ui/icons";
import { handleVotePost, handleRemovePost } from "../actions/posts";

class PostActions extends Component {
  handleVote = option => {
    const { dispatch } = this.props;
    const { id } = this.props.post;
    dispatch(handleVotePost({ id, option }));
  };
  handleRemove = () => {
    const { dispatch } = this.props;
    const { id } = this.props.post;
    dispatch(handleRemovePost(id));
  };
  render() {
    const { post, showLink } = this.props;
    return (
      <div>
        {showLink && (
          <IconButton color="primary" aria-label="open">
            <Link to={`/${post.category}/${post.id}`}>
              <OpenInNew />
            </Link>
          </IconButton>
        )}
        <IconButton
          color="primary"
          aria-label="open"
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="open"
          onClick={this.handleRemove}
        >
          <Delete />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="open"
          onClick={() => this.handleVote("upVote")}
        >
          <ThumbUp />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="open"
          onClick={() => this.handleVote("downVote")}
        >
          <ThumbDown />
        </IconButton>
      </div>
    );
  }
}

export default connect()(PostActions);
