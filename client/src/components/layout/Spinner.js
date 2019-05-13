import React, { Fragment } from 'react'
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img src={spinner} style={{width: "200px", margin: 'auth', display: 'block'}} alt="loading..."/>
  </Fragment>
)

export default Spinner
