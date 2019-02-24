import React, { Component } from "react";
import { connect } from "react-redux";

import Comments from "../components/Comments";
import Post from "../components/Post";
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
        <div style={{maxWidth:1300, margin:'auto'}}>
          <Post post={post} showLink={false} />
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
