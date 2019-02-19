import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    console.log('Props: ', this.props)
    console.log('Posts: ', this.props.posts)
    const { posts, categories } = this.props
    return (
      <div className='container'>
        <section className='categories'>
          {categories.map(category => (
            <div className='category' key={category.name}>
            <Link to={`/${category.name}`} className="category-link">
              <h2>{category.name.toUpperCase()}</h2>
            </Link>
            </div>
          ))}
        </section>
        <section className='all-posts'>
          <h3> All Posts </h3>
          <ul className='posts'>
            {posts.map(post => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <p>id: {post.id}</p>
                <p>author: {post.author}</p>
                <p>body: {post.body}</p>
                <p>timestamp: {post.timestamp}</p>
                <p>Votes: {post.voteScore}</p>
                <p>Comments: {post.commentCount}</p>
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
