import React, { Component } from 'react'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

export default class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your Postal'
        },
        value: '',
        validation: {
          required: true,
          minLegth: 5,
          maxLegth: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: '',
        valid: true,
        validation: {}
      },
    },
    loading: false,
    formIsValid: false
  }

  orderhandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    let formData = {};
    for (let identifier in this.state.orderForm) {
      formData[identifier] = this.state.orderForm[identifier].value
    }
    let order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderdata: formData
    }
    axios.post('/orders.json', order).then(res => {
      this.setState({
        loading: false,
      })
      this.props.history.push('/')
    }).catch(err => {
      this.setState({
        loading: false
      })
    })
  }

  chcekValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLegth) {
      isValid = value.length >= rules.minLegth && isValid
    }
    if (rules.maxLegth) {
      isValid = value.length <= rules.maxLegth && isValid
    }
    return isValid;
  }

  inputChangehandler = (event, inputIdentifier) => {
    let updatedOrderForm = {
      ...this.state.orderForm
    }
    let updatedOrderFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedOrderFormElement.value = event.target.value
    updatedOrderFormElement.valid = this.chcekValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
    updatedOrderFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement
    let formIsValid = true;
    for (let identifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[identifier].valid && formIsValid
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  }

  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderhandler} className="mb-5">
        {formElementArray.map(formElement => (
          <Input 
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          key={formElement.id}
          invaild={!formElement.config.valid}
          shuldValidate={formElement.config.validation}
          touched={formElement.config.touched} 
          changed={(event) => this.inputChangehandler(event, formElement.id)}
          />
        ))}
        <button className="btn btn-success" onClick={this.orderhandler} disabled={!this.state.formIsValid}>Submit Your Order</button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className="container mt-5">
        {form}
      </div>
    )
  }
}
