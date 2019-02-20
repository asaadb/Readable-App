import React, { Component } from 'react';
import { connect } from "react-redux";
import Post from "./Post";

class Category extends Component {
  render() {
    const { categoryPosts } = this.props
    return (
      <div>
        <ul>
          {categoryPosts.map(post => (
            <Post id={post.id} key={post.id}/>
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
