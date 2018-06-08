import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';

class StripeCcGateway extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { amount, currency, account, target, context } = this.props;
    console.log(amount, currency, account, target, context);
    return (
      <div>
        <StripeCheckout
          token={data => console.log('%%%% TOKEN RECEIVED', data)}
          stripeKey={account.authorization.publishable_key}
          name={context.tpoName} // the pop-in header title
          description={`${context.treeCount} trees`} // the pop-in header subtitle
          image={context.image} // the pop-in header image (default none)
          ComponentClass="div"
          panelLabel="Donate" // prepended to the amount in the bottom pay button
          amount={amount * 100} // cents
          currency={currency}
          reconfigureOnUpdate={true}
          allowRememberMe={false}
          email={context.email}
          triggerEvent="onClick" // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`, useful if you're using React-Tap-Event-Plugin
        >
          <button onClick={() => onClick()}>
            <span>
              Use your own child component, which gets wrapped in whatever
              component you pass into as "ComponentClass" (defaults to span)
            </span>
          </button>
        </StripeCheckout>
        <div>StripeCC: {target}</div>
        <div>
          {account.authorization.publishable_key} {target}
        </div>
      </div>
    );
  }
}

StripeCcGateway.propTypes = {
  amount: PropTypes.number.isRequired,
  context: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string
};

export default StripeCcGateway;
