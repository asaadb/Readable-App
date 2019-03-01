import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Post from "./Post";
import AddIcon from "@material-ui/icons/Add";
import {
  withStyles,
  Fab,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";

const styles = theme => ({
  container: {
    width: "100%",
    maxWidth: 1500,
    marginLeft: "auto",
    marginRight: "auto"
  },
  fab: {
    margin: theme.spacing.unit,
    position: "fixed",
    right: 25,
    bottom: 25
  },
  categories: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "row wrap",
    margin: theme.spacing.unit
  },
  card: {
    margin: theme.spacing.unit,
    width: 200
  },
  title: {
    fontSize: "1.2rem",
    textAlign: "center"
  },
  categoryLink: {
    textDecoration: "none"
  }
});

const Dashboard = props => {
  const { posts, categories, classes } = props;
  return (
    <div className={classes.container}>
      <Link to="/add_post">
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Link>
      <section className={classes.categories}>
        {categories.map(category => (
          <Card className={classes.card} key={category.name}>
            <CardContent>
              <Typography className={classes.title} variant="h3">
                {category.name}
              </Typography>
              <Link to={`/${category.name}`} className={classes.categoryLink}>
                <OpenInNew />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="all-posts">
        <h3 className="section-header"> All Posts </h3>
        <ul className="posts">
          {posts.map(post => (
            <Post post={post} key={post.id} showLink={true} />
          ))}
        </ul>
      </section>
    </div>
  );
};

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
