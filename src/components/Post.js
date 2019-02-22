import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import {
  Badge,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import {
  ThumbsUpDown,
  Comment,
  AccessTime,
} from "@material-ui/icons";
import { handleVotePost } from "../actions/posts";
import PostActions from './PostActions'

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
          <PostActions showLink={true} post={post} />
        </CardContent>
      </Card>
    );
  }
}

export default connect()(Post);
