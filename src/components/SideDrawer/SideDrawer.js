import React from 'react';
import NavigationItems from '../Navigation/NavigatrionItems';
import classes from '../../assets/css/style.scss';
import Backdrop from '../UI/Backdrop/Backdrop';

let sideDrawer = (props) => {
  let attachedClasses = [classes.sidedrawer, classes.close];
  if (props.open) {
    attachedClasses = [classes.sidedrawer, classes.open]
  }
  // console.log(props)
  return (
      <div>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
          <nav className="navbar">
            <ul className="navbar-nav mr-auto">
              <NavigationItems link="/" active={true}>Burger Builder</NavigationItems>
              <NavigationItems link="/">Check Out</NavigationItems>
            </ul>
          </nav>
        </div>
      </div>
  )
}

export default sideDrawer;