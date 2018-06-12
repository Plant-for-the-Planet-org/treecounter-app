import React from 'react';
import PropTypes from 'prop-types';

import type { InjectedProps } from '../Stripe/inject';

import { CardElement, injectStripe } from '../Stripe/stripeDefs';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  console.log('[change]', change);
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};
const createOptions = (fontSize: string, padding: ?string) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        },
        ...(padding ? { padding } : {})
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

class _StripeCC extends React.Component<InjectedProps & { fontSize: string }> {
  constructor(props) {
    super(props);
  }

  handleSubmit = ev => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(payload => {
          console.log('SUCESS', payload);
          this.props.onSuccess(payload);
        })
        .catch(error => this.props.onError(error));
    } else {
      this.props.onError("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Credit Card
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            hidePostalCode={true}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}

_StripeCC.propTypes = {
  stripe: PropTypes.object,
  fontSize: PropTypes.string,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFailure: PropTypes.func
};

const StripeCC = injectStripe(_StripeCC);

export default StripeCC;
