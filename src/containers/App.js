import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectPage, fetchPeopleIfNeeded, invalidatePeople } from '../actions/people_actions'
import Picker from '../components/Picker'
import People from '../components/People'

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

  handleChange = nextPage => {
    this.props.dispatch(selectPage(nextPage))
  }

  handleNextPage = e => {
    e.preventDefault()

    const { dispatch, selectedPage } = this.props
    const next_page = (parseInt(selectedPage) + 1).toString()
    dispatch(invalidatePeople(next_page))
    dispatch(fetchPeopleIfNeeded(next_page))
  }

  handlePreviousPage = e => {
    e.preventDefault()

    const { dispatch, selectedPage } = this.props
    const previous_page = (parseInt(selectedPage) - 1).toString()
    dispatch(invalidatePeople(previous_page))
    dispatch(fetchPeopleIfNeeded(previous_page))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedPage } = this.props
    dispatch(invalidatePeople(selectedPage))
    dispatch(fetchPeopleIfNeeded(selectedPage))
  }

  render() {
    const { selectedPage, people, isFetching, hasNext, hasPrevious, lastUpdated } = this.props
    const isEmpty = people.length === 0
    return (
      <div>
        <Picker value={selectedPage}
                onChange={this.handleChange}
                options={[ '1', '2' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <People people={[people]} />
              {hasPrevious &&
                <button onClick={this.handlePreviousPage}>
                  Previous
                </button>
              }
              {hasNext &&
                <button onClick={this.handleNextPage}>
                  Next
                </button>
              }
            </div>
        }
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
    hasPrevious
  } = peopleByPage[selectedPage] || {
    isFetching: true,
    items: [],
    hasNext: false,
    hasPrevious: false
  }

  return {
    selectedPage,
    people,
    isFetching,
    hasNext,
    hasPrevious,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)