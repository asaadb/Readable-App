import React, { Component } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  Fab,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { Comment } from "@material-ui/icons";
import Comments from "../components/Comments";
import Post from "../components/Post";
import {
  handleReceiveComments,
  handleCreateComment
} from "../actions/comments";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  container: {
    maxWidth: 1300,
    margin: "auto",
    margingBottom: 35
  },
  fab: {
    margin: theme.spacing.unit,
    position: "fixed",
    right: 25,
    bottom: 25
  },
  add: {
    fontSize: 50,
    padding: 0
  }
});

class PostDetail extends Component {
  state = {
    open: false,
    body: "",
    author: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  isDisabled = () => {
    const { body, author } = this.state;
    return body === "" || author === "";
  };

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, id } = this.props;
    const { author, body } = this.state;
    dispatch(handleCreateComment({ body, author, parentId: id }));
    this.setState({
      open: false,
      body: "",
      author: ""
    });
  };

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(handleReceiveComments(id));
  }

  render() {
    const { postComments, post, classes } = this.props;
    if (!post) {
      return <Redirect to="/NotFound" />;
    }
    return (
      <div className={classes.container}>
        <Post post={post} showLink={false} />
        {postComments.length > 0 &&
          postComments.map(comment => (
            <Comments key={comment.id} comment={comment} />
          ))}
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <Comment />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Comment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              variant="outlined"
              margin="dense"
              id="name"
              label="Name"
              type="name"
              fullWidth={true}
              onChange={this.handleChange("author")}
            />
            <TextField
              required
              variant="outlined"
              margin="dense"
              id="name"
              label="Comment"
              type="text"
              multiline={true}
              rows={5}
              fullWidth={true}
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
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps({ comments, posts }, ownProps) {
  const { post_id } = ownProps.match.params;
  const post = posts.find(post => post.id === post_id);
  const postComments = comments
    .filter(comment => comment.parentId === post_id)
    .sort((a, b) => a.timestamp - b.timestamp);
  return {
    post,
    id: post_id,
    postComments
  };
}
export default connect(mapStateToProps)(withStyles(styles)(PostDetail));
