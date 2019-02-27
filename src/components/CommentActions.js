import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton,   TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button } from "@material-ui/core";
import { ThumbUp, ThumbDown, Edit, Delete } from "@material-ui/icons";
import { handleVoteComment, handleDeleteComment, handleEditComment } from "../actions/comments";

const styles = {
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    width: "100%"
  }
};

class CommentActions extends Component {
  state = {
    body: this.props.comment.body,
    open:false,

  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      body: this.props.comment.body,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  isDisabled = () => {
    const { body, title } = this.state;
    return body === "" || title === "";
  };
  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, comment } = this.props;
    const { body } = this.state;
    const { id } = comment
    dispatch(handleEditComment({ id, body }))
    this.setState({
      open: false,
      body: "",
    });
  };
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
    const { body } = this.state
    return (
      <div style={styles.container}>
        <div>
          <IconButton color="primary" aria-label="open" onClick={this.handleClickOpen}>
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              variant="outlined"
              margin="dense"
              id="body"
              label="Body"
              type="text"
              multiline={true}
              rows={5}
              fullWidth={true}
              value={body}
              onChange={this.handleChange("body")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.isDisabled()}
              onClick={this.handleSubmit}
              type="submit"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(CommentActions);
