import React from 'react'
import PropTypes from 'prop-types'

const HeaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#010150',
    color: "white",
    fontSize: "18px",
    fontFamily: 'Courier'
}

const Header = () => (
  <div style={HeaderStyle}>
    <h1>Star Wars</h1>
  </div>
)

export default Header