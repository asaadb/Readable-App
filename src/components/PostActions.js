import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import {
  ThumbUp,
  ThumbDown,
  OpenInNew,
  Edit,
  Delete
} from "@material-ui/icons";
import {
  handleVotePost,
  handleRemovePost,
  handleUpdatePost
} from "../actions/posts";

const styles = {
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    width: "100%"
  }
};

class PostActions extends Component {
  state = {
    title: this.props.post.title,
    body: this.props.post.body,
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      title: this.props.post.title,
      body: this.props.post.body
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
    const { dispatch, post } = this.props;
    const { title, body } = this.state;
    const { id } = post;
    dispatch(handleUpdatePost({ id, title, body }));
    this.setState({
      open: false,
      body: "",
      title: ""
    });
  };

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
    const { title, body } = this.state;
    return (
      <div style={styles.container}>
        <div>
          {showLink === true && (
            <IconButton color="primary" aria-label="open">
              <Link to={`/${post.category}/${post.id}`}>
                <OpenInNew />
              </Link>
            </IconButton>
          )}
          <IconButton
            color="primary"
            aria-label="open"
            onClick={this.handleClickOpen}
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
          fullWidth={true}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              variant="outlined"
              margin="dense"
              id="name"
              label="title"
              type="title"
              fullWidth={true}
              value={title}
              onChange={this.handleChange("title")}
            />
            <TextField
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

export default connect()(PostActions);
