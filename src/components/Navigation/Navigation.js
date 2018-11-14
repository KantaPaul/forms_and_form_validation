import React from 'react';
import NavigationItems from './NavigatrionItems';
import classes from '../../assets/css/style.scss';

let toolBar = (props) => {
  return (
      <div className={classes.navbargroup}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-toggler-icon" onClick={props.open}></span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <NavigationItems exact link="/">Burger Builder</NavigationItems>
            <NavigationItems link="/orders">Orders</NavigationItems>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default toolBar;