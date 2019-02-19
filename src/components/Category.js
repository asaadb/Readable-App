import React, { Component } from 'react';
import { connect } from "react-redux";

class Category extends Component {
  render() {
    const { categoryPosts } = this.props
    return (
      <div>
        <ul>
          {categoryPosts.map(post => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>id: {post.id}</p>
              <p>author: {post.author}</p>
              <p>body: {post.body}</p>
              <p>timestamp: {post.timestamp}</p>
              <p>Votes: {post.voteScore}</p>
              <p>Comments: {post.commentCount}</p>
            </li>
          ))
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps( { posts },  ownProps) {
  const { category } =  ownProps.match.params
  const categoryPosts = posts.filter(post => post.category === category)
  return {
    categoryPosts,
  };
}
export default connect(mapStateToProps)(Category);
