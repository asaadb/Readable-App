import React from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { withStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const styles = {
  container: {
    width: "100%",
    maxWidth: 1500,
    marginLeft: "auto",
    marginRight: "auto"
  },
  noPost: {
    textAlign: "center",
    fontSize: "1rem"
  }
};

const Category = props => {
  const { categoryPosts, classes, category } = props;
  if (!category) {
    return <Redirect to="/NotFound" />;
  }
  return (
    <div>
      <div className={classes.container}>
        <h3 className="section-header"> {category.name} </h3>
        {categoryPosts.length === 0 && (
          <p className={classes.noPost}>
            There are no posts related to {category.name}
          </p>
        )}
        <ul className="posts">
          {categoryPosts.map(post => (
            <Post post={post} key={post.id} showLink={true} />
          ))}
        </ul>
      </div>
    </div>
  );
};

function mapStateToProps({ posts, categories }, ownProps) {
  const { category } = ownProps.match.params;
  const categoryPosts = posts.filter(post => post.category === category);
  const categoryObj = categories.find(item => item.name === category);
  return {
    category: categoryObj,
    categoryPosts
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Category));
