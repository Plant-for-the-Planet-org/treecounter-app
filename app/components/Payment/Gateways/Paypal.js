import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';
import classnames from 'classnames';

import { payment_paypal, payment_arrow } from '../../../assets';

class Paypal extends React.Component {
  constructor(props) {
    super(props);

    window.React = React;
    window.ReactDOM = ReactDOM;

    this.state = {
      showButton: false
    };
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      //this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    const isLoadedButWasntLoadedBefore =
      !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  handleArrowClick = () => {
    if (this.props.expanded !== true) {
      this.props.handleExpandedClicked('3');
    } else {
      this.props.handleExpandedClicked('');
    }
  };

  render() {
    const {
      amount,
      currency,
      account,
      onSuccess,
      onError,
      onCancel
    } = this.props;

    console.log(
      '%%%%%%%%%%%% PaypalGateway ',
      'amount: ' + amount,
      'currency: ' + currency,
      account,
      onSuccess,
      onError,
      onCancel
    );
    const { showButton } = this.state;

    const CLIENT = {
      sandbox: account.authorization.client_id
    };

    const payment = () =>
      // eslint-disable-next-line react/prop-types
      paypal.rest.payment.create('sandbox', CLIENT, {
        transactions: [
          {
            amount: {
              total: Math.round(amount * 100) / 100,
              currency
            }
          }
        ]
      });

    // see https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/customize-button/
    const buttonStyle = {
      color: 'silver', // gold | blue | silver | black
      shape: 'pill', // pill | rect
      label: 'pay', // checkout | credit | pay | buynow | paypal | installment
      size: 'large' // small | medium | large | responsive
    };
    const onAuthorize = (data, actions) =>
      actions.payment
        .execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl
          };

          onSuccess(payment);
        })
        .catch(response => {
          console.log('----------- payment error:', response);
        });

    let arrow = classnames({
      arrow: !this.props.expanded
    });
    let displayNone = classnames('centerize-paypal', {
      'display-none': !this.props.expanded
    });

    console.log('CLIENT', CLIENT);
    return (
      <form className="payment-option">
        <div className="payment-option-header">
          <img className="logo" src={payment_paypal} />
          <img
            className={arrow}
            onClick={this.handleArrowClick}
            src={payment_arrow}
          />
        </div>
        <div className={displayNone}>
          {showButton && (
            <paypal.Button.react
              env="sandbox"
              style={buttonStyle}
              client={CLIENT}
              commit={false}
              payment={payment}
              onAuthorize={onAuthorize}
              onCancel={onCancel}
              onError={onError}
            />
          )}
        </div>
      </form>
    );
  }
}

Paypal.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onCancel: PropTypes.func
};

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(
  Paypal
);
