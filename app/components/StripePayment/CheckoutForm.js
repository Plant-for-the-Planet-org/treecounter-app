import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    console.log('Component Did Mount!!!!');
    console.log(this.props.stripe);
  }

  async submit(ev) {
    ev.preventDefault();
    try {
      debugger;
      const token = await this.props.stripe.createToken({
        name: 'Jenny Rosen'
      });
      console.log('token');
      console.log(token);
    } catch (e) {
      throw e;
    }
    // User clicked submit
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

CheckoutForm.propTypes = {
  stripe: PropTypes.object,
  createToken: PropTypes.func
};
