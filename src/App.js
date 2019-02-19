import React, { Component } from 'react';
import Dashboard from './components/Dashboard'
import Category from './components/Category'
import { handleReceiveCategories } from './actions/categories'
import { handleReceivePosts } from './actions/posts'
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveCategories())
    this.props.dispatch(handleReceivePosts())
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/:category" exact component={Category} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
