import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import './Button.css'

export default class Button extends Component {
    static propTypes = {
      onClick: PropTypes.func.isRequired,
      enabled: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }
  
    handleGoClick = (e) => {
      if (this.props.enabled) {
        this.props.onClick(e)
      }
    }
  
    render() {
      const buttonClasses = classNames({
        'Button': true,
        'ButtonDisabled': !this.props.enabled
      });
  
      return (
        <div className={buttonClasses} onClick={this.handleGoClick}>
            {this.props.text}
        </div>
      )
    }
}
