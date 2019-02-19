import React, { Component } from 'react';
import Dashboard from './components/Dashboard'
import { handleReceiveCategories } from './actions/categories'
import { handleReceivePosts } from './actions/posts'
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveCategories())
    this.props.dispatch(handleReceivePosts())
  }
  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  }
}

export default connect()(App);
