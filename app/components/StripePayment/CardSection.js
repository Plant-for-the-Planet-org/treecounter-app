import React from 'react';
import { CardElement } from 'react-stripe-elements';
// import PropTypes from 'prop-types';

class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement style={{ base: { fontSize: '18px' } }} />
      </label>
    );
  }
}

export default CardSection;
