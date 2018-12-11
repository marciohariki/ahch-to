import React from 'react'
import ErrorImage from '../../images/r2d2.jpg';
import './Error.css'


const Error = () => (
  <div className='ErrorContainer'>
    <img className='ErrorImage' src={ErrorImage} alt="img"/>
    <p className='ErrorText'>An error has occured. Please try again later.</p>
  </div>
);

export default Error
