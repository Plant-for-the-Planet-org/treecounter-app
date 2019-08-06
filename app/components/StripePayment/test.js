import React from 'react';
import PropTypes from 'prop-types';

import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe
} from 'react-stripe-elements';

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

const createOptions = (fontSize, padding) => {
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
        padding
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

createOptions.propTypes = {
  fontSize: PropTypes.string,
  padding: PropTypes.string
};

class _CardForm extends React.Component {
  handleSubmit = ev => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(payload => console.log('[token]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

_CardForm.propTypes = {
  stripe: PropTypes.object,
  fontSize: PropTypes.string,
  createToken: PropTypes.object
};

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px'
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({ elementFontSize: '18px' });
      }
    });
  }

  render() {
    const { elementFontSize } = this.state;
    return (
      <div className="Checkout">
        <h1>Available Elements</h1>
        <Elements>
          <CardForm fontSize={elementFontSize} />
        </Elements>
        {/* <Elements>
                    <SplitForm fontSize={elementFontSize} />
                </Elements>
                <Elements>
                    <PaymentRequestForm />
                </Elements>
                <Elements>
                    <IbanForm fontSize={elementFontSize} />
                </Elements>
                <Elements>
                    <IdealBankForm fontSize={elementFontSize} />
                </Elements> */}
      </div>
    );
  }
}

Checkout.propTypes = {
  stripe: PropTypes.object,
  createToken: PropTypes.func,
  fontSize: PropTypes.string,
  stripe: PropTypes.object
};

const App = () => {
  return (
    <StripeProvider apiKey="pk_test_0ahH0yMukgNzOEd0UppzUfsc">
      <Checkout />
    </StripeProvider>
  );
};

export default App;
