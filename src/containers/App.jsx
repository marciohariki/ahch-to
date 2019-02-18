import React from 'react';
import Persons from './Persons';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../history';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Persons} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
