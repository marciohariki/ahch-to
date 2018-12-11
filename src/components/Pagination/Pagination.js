import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import './Pagination.css'

export default class Pagination extends Component {
  static propTypes = {
    hasNext: PropTypes.bool,
    hasPrevious: PropTypes.bool,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className='PaginationContainer'>
        <Button text='Previous' onClick={this.props.onPrevious} enabled={this.props.hasPrevious}/>
        <Button text='Next' onClick={this.props.onNext} enabled={this.props.hasNext}/>
      </div>
    )
  }
}
