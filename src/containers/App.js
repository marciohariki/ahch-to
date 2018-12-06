import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectPage, fetchPeopleIfNeeded, invalidatePeople } from '../actions/people_actions'
import PeopleList from '../components/PeopleList/PeopleList'
import Header from '../components/Header/Header'
import ReactLoading from 'react-loading';
import PeoplePagination from '../components/PeoplePagination/PeoplePagination';

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
    const { people, isFetching, hasNext, hasPrevious } = this.props
    const isEmpty = people.length === 0
    const contentContainerStyle = {
      opacity: isFetching ? 0.5 : 1,
      margin: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '700px',
      height: '500px',
      flex: '1',
      flexDirection: 'column',
      margin: 'auto',
      marginTop: '35px'
    }
    const contentStyle = {
      width: '100%',
      margin: '20px'
    }
    return (
      <div>
        <Header />
        <div style={contentContainerStyle}> 
          {isEmpty
            ? (isFetching ? 
                <ReactLoading type='spinningBubbles' color='#ffd700' height={'20%'} width={'20%'} /> : 
                <h2>Empty.</h2>
              )
            : 
              <div style={contentStyle}>
                <PeopleList people={people} />
                <PeoplePagination hasNext={hasNext} hasPrevious={hasPrevious} onNext={this.handleNextPage} onPrevious={this.handlePreviousPage}/>
              </div>
          }

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