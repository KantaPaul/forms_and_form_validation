import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout/layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import classes from './assets/css/style.scss'
import CheckOut from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

let notFound = () => {
  return (
    <div className="text-center">
      <h1 className="display-4">404</h1>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout />
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/orders" component={Orders} />
            <Route component={notFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

let app = document.getElementById('app');

ReactDOM.render(<App />, app);
