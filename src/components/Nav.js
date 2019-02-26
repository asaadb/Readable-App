import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography, Toolbar, AppBar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Home } from "@material-ui/icons";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  homeLink: {
    color: "#FFFFFF"
  }
};

function Nav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Readable
          </Typography>
          <Button color="inherit">
            <NavLink to={"/"}>
              <Home className={classes.homeLink} />
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Nav);
