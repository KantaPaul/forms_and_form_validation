import React, { Component } from 'react';
import classes from '../../assets/css/style.scss';
import ToolBar from '../../components/Navigation/Navigation';
import SideDrawer from '../SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerOpenHandler = () => {
    this.setState({
      showSideDrawer: true
    })
  }
  render() {
    return (
      <div className={classes.bgRed}>
        <div>Toolbar, Sidebar, Backdrop</div>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <ToolBar open={this.sideDrawerOpenHandler} />
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Layout;
