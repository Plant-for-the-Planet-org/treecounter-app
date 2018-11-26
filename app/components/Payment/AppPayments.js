import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import PaymentSelector from './PaymentSelector';
import { payPost } from '../../actions/paymentAction';

export default class AppPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedOption: '1'
    };
  }

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  handlePaymentApproved = paymentResponse => {
    payPost(paymentResponse, this.props.paymentInfo.token).then(res => {
      console.log(res);
      window.location.href = 'trilliontreecampaign://paymentSuccess';
    });
  };

  render() {
    let { paymentInfo } = this.props;
    let paymentMethods;
    if (paymentInfo) {
      let countryCurrency = `${paymentInfo.country}/${paymentInfo.currency}`;
      const countryCurrencies = paymentInfo.paymentSetup.countries;
      if (!Object.keys(countryCurrencies).includes(countryCurrency)) {
        countryCurrency = paymentInfo.paymentSetup.defaultCountryKey;
      }
      paymentMethods =
        paymentInfo.paymentSetup.countries[countryCurrency].paymentMethods;
    }
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <CardLayout>
          <div className="payment-options-container">
            {paymentInfo ? (
              <PaymentSelector
                paymentMethods={paymentMethods}
                accounts={paymentInfo.paymentSetup.accounts}
                stripePublishableKey={
                  paymentInfo.paymentSetup.stripePublishableKey
                }
                amount={paymentInfo.amount}
                currency={paymentInfo.currency}
                expandedOption={this.state.expandedOption}
                handleExpandedClicked={this.handleExpandedClicked}
                context={{
                  treeCount: paymentInfo.treeCount
                }}
                onSuccess={paymentResponse =>
                  this.handlePaymentApproved(paymentResponse)
                }
                onFailure={data =>
                  console.log('/////////////////// payment failure ', data)
                }
                onError={data =>
                  console.log('/////////////////// payment error ', data)
                }
              />
            ) : null}
          </div>
        </CardLayout>
      </div>
    );
  }
}

AppPayments.propTypes = {
  paymentInfo: PropTypes.object
};
