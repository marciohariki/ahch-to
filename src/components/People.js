import React from 'react'
import PropTypes from 'prop-types'

const People = ({people}) => (
  <ul>
    {people[0].map((p, i) =>
      <li key={i}>{p.name}</li>
    )}
  </ul>
)

People.propTypes = {
  people: PropTypes.array.isRequired
}

export default People