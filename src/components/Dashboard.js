import React, { Component } from 'react';
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    console.log('Props: ', this.props)
    console.log('Posts: ', this.props.posts)
    const { posts, categories } = this.props
    return (
      <div className='container' >
        <section className='categories'>
          {categories.map(category => (
            <div className='category' key={category.name}>
              <h2>{category.name.toUpperCase()}</h2>
            </div>
          ))}
        </section>
        <section className='all-posts'>
          <h3> All Posts </h3>
          <ul className='posts'>
            {Object.keys(posts).map(postId => (
              <li key={postId}>
                <h4>{posts[postId].title}</h4>
                <p>id: {posts[postId].id}</p>
                <p>author: {posts[postId].author}</p>
                <p>body: {posts[postId].body}</p>
                <p>timestamp: {posts[postId].timestamp}</p>
                <p>Votes: {posts[postId].voteScore}</p>
                <p>Comments: {posts[postId].commentCount}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts,
  };
}
export default connect(mapStateToProps)(Dashboard);
