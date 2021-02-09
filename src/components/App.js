import React, { Component, useState } from 'react';
import logo from './../logo.svg';
import './../styles/App.css';
import CreateUser from './CreateUser'

import { Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {

  return (
    <div className="App">
      <Switch>
          <Route exact path="/" component={CreateUser} />
          <Route
            exact
            path="/login"
            component={LoginPage}
          />
        </Switch>
    </div>
  );
}

export default App;
