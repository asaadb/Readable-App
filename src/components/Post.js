import React, { Component } from "react";
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
  Comment,
  ThumbUp,
  ThumbDown,
  AccessTime,
  OpenInNew,
  Edit,
  Delete
} from "@material-ui/icons";

class Post extends Component {
  render() {
    const { post } = this.props;
    return (
      <Card key={post.id} className="post">
        <CardContent>
          <Typography variant="h6" noWrap type="title">
            {post.title}
          </Typography>
          <div className="author">
            <AccessTime style={{ marginRight: 5 }} />
            <span>
              {post.author} posted {formatDate(post.timestamp)}
            </span>
          </div>
          <div className="vote-body">
            <Typography noWrap variant="p" className="post-body">
              {post.body}
            </Typography>
            <div className="vote-count">
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
          <CardActions className="action-icons">
            <IconButton color="primary" aria-label="open">
              <OpenInNew />
            </IconButton>
            <IconButton color="primary" aria-label="open">
              <Edit />
            </IconButton>
            <IconButton color="secondary" aria-label="open">
              <Delete />
            </IconButton>
            <IconButton color="primary" aria-label="open">
              <ThumbUp />
            </IconButton>
            <IconButton color="secondary" aria-label="open">
              <ThumbDown />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

export default connect()(Post);
