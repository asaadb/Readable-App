import React, { Component } from 'react';
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import {
  Badge,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import {
  ThumbsUpDown,
  ThumbUp,
  ThumbDown,
  Edit,
  Delete
} from "@material-ui/icons";

class Comments extends Component {
  handleVote = (option) => {
    console.log(option)
  }
  render() {
    const { comment } = this.props
    console.log('comments inside Comment', comment);
  return (
    <Card key={comment.id} className="comment">
      <CardContent>
        <div className="author">
          <span>
            {comment.author} commented {formatDate(comment.timestamp)}
          </span>
        </div>
        <div className="vote-body">
          <Typography noWrap className="comment-body">
            {comment.body}
          </Typography>
          <div className="vote-count">
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
        <CardActions className="action-icons">
          <IconButton color="primary" aria-label="open">
            <Edit />
          </IconButton>
          <IconButton color="secondary" aria-label="open">
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
        </CardActions>
      </CardContent>
    </Card>
  )
}
}


export default connect()(Comments)
