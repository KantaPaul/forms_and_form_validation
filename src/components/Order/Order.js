import React, { Component } from 'react'

class Order extends Component {
  render() {

    // object to array convert
    let ingredients = [];
    for (let ingredientsName in this.props.ingredients) {
      ingredients.push({
        amount: this.props.ingredients[ingredientsName],
        name: ingredientsName
      })
    }

    // output ingredents value
    let ingredientsOutPut = ingredients.map(ingredient => {
      return (
        <span key={ingredient.name} style={{margin: '0 2px'}} className="badge badge-dark">
          {ingredient.name.toUpperCase()} <span style={{marginLeft: '2px'}} className="badge badge-light">{ingredient.amount}</span>
        </span>
      )
    })

    return (
      <div className="single-card my-3">
        <div className="card">
          <div className="card-body">
            <p className="card-text">Ingredients: {ingredientsOutPut}</p>
            <h6 className="card-subtitle">Price <strong>{Number.parseFloat(this.props.price).toFixed(2)}</strong></h6>
          </div>
        </div>
      </div>
    )
  }
}

export default Order
