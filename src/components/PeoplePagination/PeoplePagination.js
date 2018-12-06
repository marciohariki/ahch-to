import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import './PeoplePagination.css'

export default class PeoplePagination extends Component {
    static propTypes = {
      onNext: PropTypes.func.isRequired,
      onPrevious: PropTypes.func.isRequired,
      hasNext: PropTypes.bool.isRequired,
      haPrevious: PropTypes.bool.isRequired
    }
  
    handleGoClick = (e) => {
      if (this.props.enabled) {
        this.props.onClick(e)
      }
    }
  
    render() {
      return (
        <div className='PeoplePaginationContainer'>
          <Button text='Previous' onClick={this.props.onPrevious} enabled={this.props.hasPrevious} />
          <Button text='Next' onClick={this.props.onNext} enabled={this.props.hasNext} />
        </div>
      )
    }
}
