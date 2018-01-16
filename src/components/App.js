/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import Signup from './Signup';

class App extends Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Signup}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
