import React from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import {
  Badge,
  Card,
  CardContent,
  Typography,
  CardActions,
  Avatar,
  withStyles
} from "@material-ui/core";
import { ThumbsUpDown } from "@material-ui/icons";
import CommentActions from "./CommentActions";

const styles = {
  comment: {
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
  avatar: {
    margin: "5px 10px 0 0",
    backgroundColor: "#2196f3"
  },
  author: {
    color: "#A9A9A9",
    fontSize: "1rem",
    margin: "5px 0",
    display: "flex",
    alignItems: "baseline"
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
    margin: 10
  }
};

const Comment = props => {
  const { comment, classes } = props;
  return (
    <Card className={classes.comment}>
      <CardContent className={classes.content}>
        <div className={classes.author}>
          <Avatar className={classes.avatar}>
            {comment.author[0].toUpperCase()}
          </Avatar>
          <span>
            {comment.author} commented {formatDate(comment.timestamp)}
          </span>
        </div>
        <div className={classes.voteBody}>
          <Typography>{comment.body}</Typography>
          <div className={classes.voteCount}>
            <Badge
              badgeContent={comment.voteScore}
              style={{ marginRight: 20 }}
              max={999}
              color="primary"
            >
              <ThumbsUpDown />
            </Badge>
          </div>
        </div>
        <CardActions>
          <CommentActions comment={comment} />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default connect()(withStyles(styles)(Comment));
