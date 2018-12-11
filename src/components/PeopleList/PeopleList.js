import React from 'react'
import PropTypes from 'prop-types'
import './PeopleList.css'

function getIdByUrl(url) {
  const splittedUrl = url.split('/');
  return ("0" + splittedUrl[splittedUrl.length - 2]).slice(-2)
}

const PeopleList = ({people}) => (
  <div className='PeopleContainer'>
    {people.map((p, i) =>
      <div className='PeopleItem' key={i}>
        <div className='PeopleId'>{getIdByUrl(p.url)}</div>
        <div className='PeopleName'>{p.name}</div>
      </div>
    )}
  </div>
);

PeopleList.propTypes = {
  people: PropTypes.array.isRequired
};

export default PeopleList