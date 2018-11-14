import React from 'react';
import { withRouter } from 'react-router-dom'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import classes from '../../assets/css/style.scss'


let burger = (props) => {
  // console.log(props)
  let transformIngredients = Object.keys(props.ingredients).map(ingredientKey => {
    return [...Array(props.ingredients[ingredientKey])].map((__, i) => {
      return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
    });
  }).reduce((arr, el) => {
    return arr.concat(el);
  }, [])

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top"/>
      {transformIngredients.length === 0 ? 'Please Update Ingredient' : transformIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
}

export default withRouter(burger);