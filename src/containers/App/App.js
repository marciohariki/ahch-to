import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPeopleIfNeeded } from '../../actions/people_actions'
import PeopleList from '../../components/PeopleList/PeopleList'
import Header from '../../components/Header/Header'
import ReactLoading from 'react-loading'
import PeoplePagination from '../../components/PeoplePagination/PeoplePagination'
import Error from '../../components/Error/Error'
import './App.css'

class App extends Component {
  static propTypes = {
    selectedPage: PropTypes.string.isRequired,
    people: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedPage } = this.props
    dispatch(fetchPeopleIfNeeded(selectedPage))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedPage !== this.props.selectedPage) {
      const { dispatch, selectedPage } = this.props
      dispatch(fetchPeopleIfNeeded(selectedPage))
    }
  }

  render() {
    const { selectedPage, people, isFetching, hasNext, hasPrevious, didInvalidate } = this.props
    const isEmpty = people.length === 0
    let content
    if(isFetching) {
      content = <ReactLoading type='spinningBubbles' color='#ffd700' height={'10%'} width={'10%'} /> 
    } else if (didInvalidate) {
      content = <Error />
    } else if (isEmpty) {
      content = <h2>There is nothing to show.</h2>
    } else {
      content = (
        <div className='Content'>
          <PeopleList people={people} />
          <PeoplePagination hasNext={hasNext} hasPrevious={hasPrevious} dispatch={this.props.dispatch} selectedPage={selectedPage}/>
        </div>
      )
    }
    return (
      <div>
        <Header />
        <div className='AppContainer'> 
          {content}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedPage, peopleByPage } = state
  const {
    isFetching,
    lastUpdated,
    items: people,
    hasNext,
    hasPrevious,
    didInvalidate
  } = peopleByPage[selectedPage] || {
    isFetching: true,
    items: [],
    hasNext: false,
    hasPrevious: false,
    didInvalidate: false
  }

  return {
    selectedPage,
    people,
    isFetching,
    hasNext,
    hasPrevious,
    lastUpdated,
    didInvalidate
  }
}

export default connect(mapStateToProps)(App)