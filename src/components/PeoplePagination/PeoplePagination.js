import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { selectPage, fetchPeopleIfNeeded, invalidatePeople } from '../../actions/people_actions'
import './PeoplePagination.css'

export default class PeoplePagination extends Component {
    static propTypes = {
      onNext: PropTypes.func.isRequired,
      onPrevious: PropTypes.func.isRequired,
      hasNext: PropTypes.bool.isRequired,
      haPrevious: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired,
      selectedPage: PropTypes.string.isRequired
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
      return (
        <div className='PeoplePaginationContainer'>
          <Button text='Previous' onClick={this.onPrevious} enabled={this.props.hasPrevious} />
          <Button text='Next' onClick={this.onNext} enabled={this.props.hasNext} />
        </div>
      )
    }
}
