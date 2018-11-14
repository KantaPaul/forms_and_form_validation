import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

let errorHandler = (WrapComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount () {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req;
      })
      this.resInterceptors = axios.interceptors.response.use(resp => resp, error => {
        this.setState({error: error})
      })
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    render () {
      return (
        <div>
          <Modal show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapComponent {...this.props} />
        </div>
      )
    }
  }
}

export default errorHandler;