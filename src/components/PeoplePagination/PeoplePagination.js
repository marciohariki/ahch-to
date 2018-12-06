import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { selectPage, fetchPeopleIfNeeded, invalidatePeople } from '../../actions/people_actions'
import './PeoplePagination.css'

export default class PeoplePagination extends Component {
    static propTypes = {
      hasNext: PropTypes.bool,
      haPrevious: PropTypes.bool,
      dispatch: PropTypes.func,
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
          <Button text='Previous' onClick={this.handlePreviousPage} enabled={this.props.hasPrevious} />
          <Button text='Next' onClick={this.handleNextPage} enabled={this.props.hasNext} />
        </div>
      )
    }
}
