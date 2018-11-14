import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import CheckOutSummary from '../../components/Order/CheckoutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData'

class CheckOut extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  }

  componentWillMount() {
    let query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let price = 0;
    for (let parma of query.entries()) {
      if (parma[0] === 'price') {
        price = parma[1]
      } else {
        ingredients[parma[0]] = +parma[1]
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    })
  }

  checkoutCancelHandeler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandeler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div className="text-center">
        <CheckOutSummary 
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandeler}
          checkoutContinue={this.checkoutContinueHandeler}
        />
        <Route  
          path='/checkout/contact-data' 
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} 
        />
      </div>
    )
  }
}

export default CheckOut;
