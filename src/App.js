import React, { Component, Fragment } from "react";
import Dashboard from "./components/Dashboard";
import Category from "./components/Category";
import PostDetail from "./components/PostDetail";
import NewPost from "./components/NewPost";
import { handleReceiveCategories } from "./actions/categories";
import { handleReceivePosts } from "./actions/posts";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveCategories());
    this.props.dispatch(handleReceivePosts());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Nav />
          <div className="App">
          {this.props.loading === true ? null : (
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/add_post" exact component={NewPost} />
              <Route path="/:category" exact component={Category} />
              <Route path="/:category/:post_id" exact component={PostDetail} />
              <Route  component={NotFound} />
            </Switch>
          )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({posts, categories}) {
  console.log('posts from msp: ', posts)
  return {
    loading:posts.length === 0 || categories.length === 0
  }
}

export default connect(mapStateToProps)(App);
