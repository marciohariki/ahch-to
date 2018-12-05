import React from 'react'
import PropTypes from 'prop-types'

const PeopleContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  maxWidth: '700px',
  flex: '1',
  flexDirection: 'column',
  margin: 'auto'
}

const ItemPeopleStyle = {
  borderBottom: '1px solid grey',
  width: '100%',
  display: 'flex',
  height: '40px',
  alignItems: 'center',
  fontFamily: 'Courier'
}

const PeopleNameTextStyle = {
  color: '#8a8888',
  flexGrow: 1
}

const PeopleIdTextStyle = {
  color: 'black',
  width: '30px',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold'
}

function getIdByUrl(url) {
  const splittedUrl = url.split('/')
  return ("0" + splittedUrl[splittedUrl.length -2]).slice(-2)
}

const People = ({people}) => (
  <div style={PeopleContainerStyle}>
    {people[0].map((p, i) =>
      <div style={ItemPeopleStyle}>
        <div style={PeopleIdTextStyle}>{getIdByUrl(p.url)}</div>
        <div style={PeopleNameTextStyle}>{p.name}</div>
      </div>
    )}
  </div>
)

People.propTypes = {
  people: PropTypes.array.isRequired
}

export default People