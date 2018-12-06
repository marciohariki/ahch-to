import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPeopleIfNeeded, selectPage } from '../../actions/people_actions'
import PeopleList from '../../components/PeopleList/PeopleList'
import Header from '../../components/Header/Header'
import ReactLoading from 'react-loading'
import Pagination from '../../components/Pagination/Pagination'
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

  handleNextPage = e => {
    e.preventDefault()

    const { dispatch, selectedPage } = this.props
    const nextPage = (parseInt(selectedPage) + 1).toString()
    dispatch(fetchPeopleIfNeeded(nextPage))
    dispatch(selectPage(nextPage))
    
  }

  handlePreviousPage = e => {
    e.preventDefault()

    const { dispatch, selectedPage } = this.props
    const previousPage = (parseInt(selectedPage) - 1).toString()
    dispatch(fetchPeopleIfNeeded(previousPage))
    dispatch(selectPage(previousPage))
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
          <Pagination hasNext={hasNext} hasPrevious={hasPrevious} 
              onNext={this.handleNextPage} onPrevious={this.handlePreviousPage}/>
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