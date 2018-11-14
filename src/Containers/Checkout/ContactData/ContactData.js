import React, { Component } from 'react'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

export default class ContactData extends Component {

  state = {
    orderForm : {
      name: '',  
      street: '',
      zipCode: '',
      email: '',
      deliveryMethod: '',
    },
    loading: false
  }

  orderhandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    let order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      name: this.state.name,
      email: this.state.email,
      street: this.state.street,
      zipCode: this.state.zipCode,
      deliveryMethod: this.state.deliveryMethod,
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

  eventChangehandler = (event) => {
    let name = this.refs.name.value,
        email = this.refs.email.value,
        street = this.refs.street.value,
        zipCode = this.refs.zip.value,
        deliveryMethod = this.refs.select.value;

    this.setState({
      name: name,
      email: email,
      street: street,
      zipCode: zipCode,
      deliveryMethod: deliveryMethod
    })
  }

  render() {
    let form = (
      <form onSubmit={this.orderhandler}>
          <div className="form-group">
            <input onChange={(event) => this.eventChangehandler(event)} type="text" className="form-control" name="name" ref="name" placeholder="Your Name Here"/>
          </div>
          <div className="form-group">
            <input onChange={(event) => this.eventChangehandler(event)} type="email" className="form-control" name="email" ref="email" placeholder="Your email Here"/>
          </div>
          <div className="form-group">
            <input onChange={(event) => this.eventChangehandler(event)} type="text" className="form-control" name="street" ref="street" placeholder="Your Street Here"/>
          </div>
          <div className="form-group">
            <input onChange={(event) => this.eventChangehandler(event)} type="text" className="form-control" name="zip" ref="zip" placeholder="Your ZIP Code Here"/>
          </div>
          <div className="form-group">
            <select onChange={(event) => this.eventChangehandler(event)} className="form-control" ref="select">
              <option value="fastest">Fastest</option>
              <option value="chipest">Chipest</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.orderhandler}>Submit Data</button>
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
