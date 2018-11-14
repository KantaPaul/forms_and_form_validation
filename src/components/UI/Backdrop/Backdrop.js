import React from 'react';
import classes from '../../../assets/css/style.scss'

let backdrop = (props) => {
  return props.show ? <div className={classes.backdrop} onClick={props.clicked}></div> : null
}

export default backdrop;