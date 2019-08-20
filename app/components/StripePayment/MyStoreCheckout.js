import React from 'react';
import { Elements } from 'react-stripe-elements';
// import PropTypes from 'prop-types';
import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
  handleArrowClick = () => {
    this.props.handleExpandedClicked('1');
  };
  render() {
    let props = this.props;
    return (
      <Elements>
        <InjectedCheckoutForm
          currency={props.currency}
          account={props.account}
          expanded={props.expanded}
          handleExpandedClicked={this.handleArrowClick}
        />
      </Elements>
    );
  }
}

export default MyStoreCheckout;
