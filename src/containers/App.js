import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectPage, fetchPeopleIfNeeded, invalidatePeople } from '../actions/people_actions'
import People from '../components/People'
import Header from '../components/Header'
import Button from '../components/Button'

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
    dispatch(invalidatePeople(nextPage))
    dispatch(fetchPeopleIfNeeded(nextPage))
    dispatch(selectPage(nextPage))
    
  }

  handlePreviousPage = e => {
    e.preventDefault()

    const { dispatch, selectedPage } = this.props
    const previousPage = (parseInt(selectedPage) - 1).toString()
    dispatch(invalidatePeople(previousPage))
    dispatch(fetchPeopleIfNeeded(previousPage))
    dispatch(selectPage(previousPage))
  }

  

  render() {
    const { selectedPage, people, isFetching, hasNext, hasPrevious, lastUpdated } = this.props
    const isEmpty = people.length === 0
    const buttonContainerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '700px',
      flex: '1',
      margin: 'auto'
    }
    return (
      <div>
        <Header />
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <People people={[people]} />
              <div style={buttonContainerStyle}>
                <Button text='Previous' onClick={this.handlePreviousPage} enabled={hasPrevious} />
                <Button text='Next' onClick={this.handleNextPage} enabled={hasPrevious} />
              </div>
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