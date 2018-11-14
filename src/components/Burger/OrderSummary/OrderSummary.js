import React from 'react';

let orderSummary = (props) => {
  let ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return <li key={igKey} className="list-group-item list-group-item-action list-group-item-primary"><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
  })
  return (
    <div>
      <div className="text-center mb-2">
        <h3>Your Order</h3>
        <p>A delicious burger</p>
      </div>
      <ul className="list-group mb-2">
        {ingredientSummary}
      </ul>
      <p>Total Price : <strong>{props.price.toFixed(2)}</strong></p>
      <p><strong>Continue To Checkout</strong></p>
      <div>
        <button onClick={props.cancled} className="btn btn-danger mr-2">CANCELD</button>
        <button onClick={props.continue} className="btn btn-primary">CONTINUE</button>
      </div>
    </div>
  )
}

export default orderSummary;