import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import {
  Badge,
  Card,
  CardContent,
  Typography,
  CardActions,
  withStyles
} from "@material-ui/core";
import { ThumbsUpDown, Comment, AccessTime } from "@material-ui/icons";
import PostActions from "./PostActions";

const styles = {
  post: {
    width: 450,
    margin: "1rem",
    display: "flex"
  },
  postDetail: {
    margin: "1rem",
    display: "flex"
  },
  content: {
    width: "95%",
    display: "flex",
    flexFlow: "column",
    boxSizing: "border-box",
    margin: 10
  },
  title: {
    fontSize: "2rem"
  },
  author: {
    color: "#A9A9A9",
    fontSize: "1rem",
    margin: "10px 0"
  },
  voteBody: {
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.5rem"
  },
  voteCount: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    margin: "1rem"
  },
  postCount: {
    marginLeft: 10,
    display: "flex",
    flexFlow: "row nowrap"
  }
};

class Post extends Component {
  render() {
    const { post, classes, showLink } = this.props;
    return (
      <Card
        className={showLink ? classes.post : classes.postDetail}
      >
        <CardContent className={classes.content}>
          {showLink === true ? (
            <Typography variant="h6" noWrap type="title">
              {post.title}
            </Typography>
          ) : (
            <Typography variant="h6" type="title">
              {post.title}
            </Typography>
          )}
          <div className={classes.author}>
            <AccessTime style={{ marginRight: 5 }} />
            <span>
              {post.author} posted {formatDate(post.timestamp)}
            </span>
          </div>
          <div className={classes.voteBody}>
            {showLink === true ? (
              <Typography noWrap>{post.body}</Typography>
            ) : (
              <Typography>{post.body}</Typography>
            )}
            <div className={classes.postCount}>
              <Badge
                badgeContent={post.voteScore}
                style={{ marginRight: 20 }}
                max={999}
                color="primary"
              >
                <ThumbsUpDown />
              </Badge>
              <Badge badgeContent={post.commentCount} max={999} color="primary">
                <Comment />
              </Badge>
            </div>
          </div>
          <CardActions>
            <PostActions showLink={showLink} post={post} />
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

export default connect()(withStyles(styles)(Post));
