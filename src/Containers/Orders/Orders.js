import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../Containers/ErrorHandler/ErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  // fetching data
  componentDidMount() {
    axios.get('/orders.json')
    .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          // Adds one or more elements to the front of an array and returns the new length of the array.
            fetchedOrders.unshift({
                ...res.data[key],
                id: key
            });
        }
        this.setState({
          loading: false, 
          orders: fetchedOrders
        });
    })
    .catch(err => {
        this.setState({
          loading: false
        });
    });
  }

  render() {
    let order = (
      <div className="row">
        {/* show data */}
        {this.state.orders.map(order => (
          <div className=" col-lg-4 col-md-6" key={order.id}>
            <Order  
              price={order.price} 
              ingredients={order.ingredients}
            />
          </div>
        ))}
      </div>
    );
    // spinner add
    if (this.state.loading) {
      order = <Spinner />
    }
    return (
      <div className="container mt-5">
        {order}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)
