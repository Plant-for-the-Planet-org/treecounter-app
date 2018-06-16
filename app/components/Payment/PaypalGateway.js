import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';

class PaypalGateway extends React.Component {
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

  render() {
    const {
      amount,
      currency,
      account,
      onSuccess,
      onError,
      onCancel
    } = this.props;

    const { showButton } = this.state;

    const CLIENT = {
      sandbox: account.authorization.client_id,
      production: account.authorization.client_id
    };

    const payment = () =>
      // eslint-disable-next-line react/prop-types
      paypal.rest.payment.create('sandbox', CLIENT, {
        transactions: [
          {
            amount: {
              total: amount,
              currency
            }
          }
        ]
      });

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
    return (
      <div>
        {showButton && (
          <paypal.Button.react
            env="sandbox"
            client={CLIENT}
            commit={false}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />
        )}
      </div>
    );
  }
}

PaypalGateway.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onCancel: PropTypes.func
};

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(
  PaypalGateway
);
