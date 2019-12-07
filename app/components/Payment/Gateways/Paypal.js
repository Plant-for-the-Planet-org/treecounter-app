// eslint-disable-next-line no-unused-vars
/* global paypal */
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
      this.setState({ showButton: true });
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
    this.props.handleExpandedClicked('3');
  };

  render() {
    let paypal = window.paypal;
    const {
      amount,
      mode,
      currency,
      account,
      onSuccess,
      donationId
    } = this.props;

    const { showButton } = this.state;

    const CLIENT = {
      [mode]: account.authorization.client_id
    };
    const invoice_number = `ttc-${donationId}`;
    console.log(
      'invoice we are sending to paypal as donationId:',
      invoice_number
    );
    const payment = () => {
      return paypal.rest.payment.create(mode, CLIENT, {
        transactions: [
          {
            amount: {
              total: Math.round(amount * 100) / 100,
              currency
            },
            invoice_number: invoice_number
          }
        ]
      });
    };

    // see https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/customize-button/
    const buttonStyle = {
      color: 'silver', // gold | blue | silver | black
      shape: 'pill', // pill | rect
      label: 'pay', // checkout | credit | pay | buynow | paypal | installment
      size: 'large' // small | medium | large | responsive
    };

    // const onAuthorize = (data, actions) =>
    //   actions.payment.execute().then(() => {
    //     const payment = Object.assign({}, this.props.payment);
    //     payment.paid = true;
    //     payment.cancelled = false;
    //     payment.payerID = data.payerID;
    //     payment.paymentID = data.paymentID;
    //     payment.paymentToken = data.paymentToken;
    //     payment.returnUrl = data.returnUrl;
    //     onSuccess(payment);
    //   });

    const onAuthorize = data => {
      onSuccess(data);
    };

    const onError = data => {
      onSuccess(data);
    };

    const onCancel = data => {
      let error = {
        ...data,
        type: 'error',
        error: { message: 'Transaction cancelled' }
      };
      onSuccess(error);
    };

    let arrow = classnames({
      arrow: !this.props.expanded
    });
    let displayNone = classnames('centerize-paypal', {
      'display-none': !this.props.expanded
    });
    return (
      <form className="payment-option">
        <div onClick={this.handleArrowClick} className="payment-option-header">
          <img className="logo" src={payment_paypal} />
          <img className={arrow} src={payment_arrow} />
        </div>
        <div className={displayNone}>
          {showButton && (
            <paypal.Button.react
              env={mode}
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
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  mode: PropTypes.string,
  onSuccess: PropTypes.func
};

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(
  Paypal
);
