import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import classes from '../../assets/css/style.scss';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';

let INGREDIENT_PRICE = {
  salad: .5,
  bacon: .4,
  cheese: .7,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseAble: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('https://my-burger-5ae37.firebaseio.com/ingredients.json').then(response => {
      this.setState ({
        ingredients: response.data
      })
    }).catch(err => {
      this.setState({
        error: true
      })
    })
  }

  pruchasehandler = (ingredients) => {
    let sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0)

    this.setState({
      purchaseAble: sum > 0
    })
  }

  addIngredients = (type) => {
    let oldCount = this.state.ingredients[type];
    let updateConunt = oldCount + 1;
    let updateIngredients = {
      ...this.state.ingredients
    }
    updateIngredients[type] = updateConunt;
    let oldPrice = this.state.totalPrice;
    let priceAddition = INGREDIENT_PRICE[type];
    let newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    })
    this.pruchasehandler(updateIngredients)
  }

  removeIngredients = (type) => {
    let oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    let newCount = oldCount - 1;
    let updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = newCount;
    let oldPrice = this.state.totalPrice;
    let priceAddition = INGREDIENT_PRICE[type];
    let newPrice = oldPrice - priceAddition;
    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    })
    this.pruchasehandler(updateIngredients)
  }

  purchasingHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelhandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinuehandler = () => {
    let queryParama = [];
    for (let i in this.state.ingredients) {
      queryParama.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParama.push('price=' + this.state.totalPrice)
    let queryString = queryParama.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {

    let disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let oederSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if(this.state.ingredients) {
      burger = (
        <div>
            <Burger ingredients={this.state.ingredients}/>
            <div className="text-center mb-2">
              <p className={classes.totalPrice}>Total Price is : <strong>{this.state.totalPrice.toFixed(2)}</strong></p>
            </div>
            <div className={classes.controlPanle}>
              <BuildControls 
                addIngredients={this.addIngredients} 
                removeIngredients={this.removeIngredients}
                disabledInfo={disabledInfo}
                purchasing={this.purchasingHandler}
                orderButtonDiabled={this.state.purchaseAble}
              />
            </div>
        </div>
      )
      oederSummary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice} cancled={this.purchaseCancelhandler} continue={this.purchaseContinuehandler} />
    }
    if (this.state.loading) {
      oederSummary = <Spinner />
    }

    return (
      <div>
        <div className={classes.burgerwraper}>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandler}>
            {oederSummary}
          </Modal>
          {burger}
        </div>
      </div>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);
