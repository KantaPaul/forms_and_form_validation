import React, {Component} from 'react';
import classes from '../../../assets/css/style.scss';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render () {
    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={classes.Modal} style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100%)',
          opacity: this.props.show ? '1' : '0',
          visibility: this.props.show ? 'visible' : 'hidden'
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal;