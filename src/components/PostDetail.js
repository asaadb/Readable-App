import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Badge, Card, CardContent, Typography, CardActions } from "@material-ui/core";
import { ThumbsUpDown, AccessTime, Comment } from "@material-ui/icons";

import Comments from "../components/Comments";
import PostActions from "../components/PostActions";
import { handleReceiveComments } from "../actions/comments";

class PostDetail extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    console.log("id for post ", id);
    dispatch(handleReceiveComments(id));
  }
  render() {
    const { postComments, post } = this.props;
    if (post) {
      return (
        <div>
          <Card key={post.id} className="post">
            <CardContent>
              <Typography variant="h6" type="title">
                {post.title}
              </Typography>
              <div className="author">
                <AccessTime style={{ marginRight: 5 }} />
                <span>
                  {post.author} posted {formatDate(post.timestamp)}
                </span>
              </div>
              <div className="vote-body">
                <Typography className="post-body">{post.body}</Typography>
                <div className="vote-count">
                  <Badge
                    badgeContent={post.voteScore}
                    style={{ marginRight: 20 }}
                    max={999}
                    color="primary"
                  >
                    <ThumbsUpDown />
                  </Badge>
                  <Badge
                    badgeContent={post.commentCount}
                    max={999}
                    color="primary"
                  >
                    <Comment />
                  </Badge>
                </div>
              </div>
              <CardActions>
                <PostActions showLink={false} post={post} />
              </CardActions>
            </CardContent>
          </Card>
          {postComments.length > 0 &&
            postComments.map(comment => <Comments key={comment.id} comment={comment} />)}
        </div>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}

function mapStateToProps({ comments, posts }, ownProps) {
  const { post_id } = ownProps.match.params;
  const post = posts.find(post => post.id === post_id);
  const postComments = comments
    .filter(comment => comment.parentId === post_id)
    .sort((a, b) => a.timestamp - b.timestamp);
  console.log("The Comments from PostDetails: ", postComments);

  return {
    post,
    id: post_id,
    postComments
  };
}
export default connect(mapStateToProps)(PostDetail);
