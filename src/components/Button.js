import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Button extends Component {
    static propTypes = {
      onClick: PropTypes.func.isRequired,
      enabled: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }
  
    handleGoClick = (e) => {
      this.props.onClick(e)
    }
  
    render() {
      const buttonStyle = {
        flex: '1',
        margin: 'auto'
      }
      return (
        <button style={buttonStyle} onClick={this.handleGoClick}>
            {this.props.text}
        </button>
      )
    }
}
