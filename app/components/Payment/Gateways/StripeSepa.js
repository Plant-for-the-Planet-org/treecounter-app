import React from 'react';
import PropTypes from 'prop-types';

import type { InjectedProps } from '../Stripe/inject';

import { IbanElement, injectStripe } from '../Stripe/stripeDefs';

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
        fontSize: '8pt',
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

class _StripeSepa extends React.Component<
  InjectedProps & { fontSize: string }
> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = ev => {
    const { currency, context } = this.props;
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createSource({
          type: 'sepa_debit',
          currency: currency,
          owner: {
            name: context.donorName,
            email: context.donorEmail
          },
          mandate: {
            notification_method: 'email'
          }
        })
        .then(payload => this.props.onSuccess(payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    const style = { color: '#666666', fontWeight: 'normal', fontSize: '.8em' };

    console.log('CONTEXT: ', this.props);

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          IBAN
          <IbanElement
            supportedCountries={['SEPA']}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <div id="mandate-acceptance" style={style}>
          By providing your IBAN and confirming this payment, you are
          authorizing {this.props.context.tpoName} and Stripe, our payment
          service provider, to send instructions to your bank to debit your
          account and your bank to debit your account in accordance with those
          instructions. You are entitled to a refund from your bank under the
          terms and conditions of your agreement with your bank. A refund must
          be claimed within 8 weeks starting from the date on which your account
          was debited.
        </div>
        <button>Pay</button>
      </form>
    );
  }
}

const StripeSepa = injectStripe(_StripeSepa);

_StripeSepa.propTypes = {
  stripe: PropTypes.object,
  fontSize: PropTypes.string,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFailure: PropTypes.func
};

export default StripeSepa;
