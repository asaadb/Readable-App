import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { ThumbUp, ThumbDown, Edit, Delete } from "@material-ui/icons";
import { handleVoteComment, handleDeleteComment } from "../actions/comments";

const styles = {
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    width: "100%"
  }
};

class CommentActions extends Component {
  handleVote = option => {
    const { dispatch } = this.props;
    const { id } = this.props.comment;
    dispatch(handleVoteComment({ id, option }));
  };
  handleRemove = () => {
    const { dispatch } = this.props;
    const { id, parentId } = this.props.comment;
    dispatch(handleDeleteComment({id, parentId}));
  };
  render() {
    return (
      <div style={styles.container}>
        <div>
          <IconButton color="primary" aria-label="open">
            <Edit />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="open"
            onClick={this.handleRemove}
          >
            <Delete />
          </IconButton>
        </div>
        <div>
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
      </div>
    );
  }
}

export default connect()(CommentActions);
