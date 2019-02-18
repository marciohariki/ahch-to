import React from 'react';
import { connect } from 'react-redux';
import { func, object, string } from 'prop-types';

import { personsFetch } from '../actions';

class Persons extends React.Component {
  componentDidMount () {
    this.props.fetchPersons();
  };

  renderPersonList () {
    return (
      <div>
        <h1>Persons list</h1>
        <ul>
          {this.props.persons.map((person, key) => <li key={key}>{person.name}</li>)}
        </ul>
      </div>
    );
  }

  renderLoading () {
    return (
      <div>
        Loading...
      </div>
    );
  }

  render () {
    return this.props.status === 'fetching'
      ? this.renderLoading()
      : this.renderPersonList();
  }
}

const mapStateToProps = state => {
  const persons = state.persons.get('data');
  const status = state.persons.get('status');
  return {
    persons,
    status
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPersons () {
    return dispatch(personsFetch());
  }
});

Persons.propTypes = {
  fetchPersons: func.isRequired,
  persons: object.isRequired,
  status: string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
