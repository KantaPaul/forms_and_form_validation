import React, {Component} from 'react';
import BuildControl from './BuildControl/BuildControl'

class BuildControls extends Component {
  render() {
    let controls = [
      {label: 'Salad', type: 'salad'},
      {label: 'Bacon', type: 'bacon'},
      {label: 'Cheese', type: 'cheese'},
      {label: 'Meat', type: 'meat'},
    ]
    return (
      <div>
        {controls.map((ctrl) => {
          return (
            <BuildControl 
              key={ctrl.label} 
              label={ctrl.label} 
              added={() => this.props.addIngredients(ctrl.type)} 
              removed={() => this.props.removeIngredients(ctrl.type)}
              disabled={this.props.disabledInfo[ctrl.type]}
            />
          )
        })}
        <div className="text-center my-3">
          <button 
            className="btn btn-info" 
            onClick={this.props.purchasing} 
            disabled={!this.props.orderButtonDiabled}
          >
            ORDER NOW
          </button>
        </div>
      </div>
    )
  }
}

export default BuildControls;