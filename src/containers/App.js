import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectPage, fetchPeopleIfNeeded, invalidatePeople } from '../actions/actions'
import Picker from '../components/Picker'
import People from '../components/People'

class App extends Component {
  static propTypes = {
    selectedPage: PropTypes.string.isRequired,
    people: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
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

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedPage } = this.props
    dispatch(invalidatePeople(selectedPage))
    dispatch(fetchPeopleIfNeeded(selectedPage))
  }

  render() {
    const { selectedPage, people, isFetching, lastUpdated } = this.props
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
    items: people
  } = peopleByPage[selectedPage] || {
    isFetching: true,
    items: []
  }

  return {
    selectedPage,
    people,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)