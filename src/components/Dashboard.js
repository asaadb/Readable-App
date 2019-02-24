import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Post from "./Post";
import AddIcon from "@material-ui/icons/Add";
import { withStyles, Fab } from "@material-ui/core";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: "fixed",
    right: 25,
    bottom: 25
  },
  add: {
    fontSize: 50,
    padding: 0
  }
});

class Dashboard extends Component {
  render() {
    console.log("Props: ", this.props);
    console.log("Posts: ", this.props.posts);
    const { posts, categories, classes } = this.props;
    return (
      <div className="container">
        <Link to="/add_post">
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
        <section className="categories">
          {categories.map(category => (
            <div className="category" key={category.name}>
              <Link to={`/${category.name}`} className="category-link">
                <h2>{category.name.toUpperCase()}</h2>
              </Link>
            </div>
          ))}
        </section>
        <section className="all-posts">
          <h3> All Posts </h3>
          <ul className="posts">
            {posts.map(post => (
              <Post post={post} key={post.id} />
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
    posts
  };
}
export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
