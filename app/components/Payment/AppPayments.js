import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import PaymentSelector from './PaymentSelector';
import { payPost } from '../../actions/paymentAction';
import { check_green, attention } from '../../assets';
import TextBlock from '../Common/Text/TextBlock';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n';

export default class AppPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedOption: '1',
      paymentStatus: null
    };
  }

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  handlePaymentApproved = paymentResponse => {
    payPost(paymentResponse, this.props.paymentInfo.token)
      .then(res => {
        console.log(res);
        this.setState({
          paymentStatus: 'success'
        });
      })
      .catch(err =>
        this.setState({
          paymentStatus: 'failed'
        })
      );
  };

  openApp(status) {
    if (status === 'success') {
      window.location.href = 'trilliontreecampaign://paymentSuccess';
    } else {
      window.location.href = 'trilliontreecampaign://paymentFailed';
    }
  }

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
          {this.state.paymentStatus === 'success' ? (
            <div className="payment-success">
              <img src={check_green} />
              <div className={'gap'} />
              <TextBlock strong={true}>
                {i18n.t('label.thankyou_planting', {
                  count: paymentInfo.treeCount
                })}
              </TextBlock>
              <div className={'gap'} />
              <TextBlock>
                <PrimaryButton onClick={() => this.openApp('success')}>
                  Go Back to App
                </PrimaryButton>
              </TextBlock>
            </div>
          ) : this.state.paymentStatus === 'failed' ? (
            <div className="payment-success">
              <img src={attention} />
              <div className={'gap'} />
              <TextBlock strong={true}>{'Payment Failed '}</TextBlock>
              <div className={'gap'} />
              <TextBlock>
                <PrimaryButton onClick={() => this.openApp('failed')}>
                  Go Back to App
                </PrimaryButton>
              </TextBlock>
            </div>
          ) : (
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
                    treeCount: paymentInfo.treeCount,
                    tpoName: paymentInfo.tpoName,
                    giftTreeCounterName: paymentInfo.giftRecipient,
                    plantProjectName: paymentInfo.plantProjectName,
                    supportTreecounter: paymentInfo.supportedTreecounterName
                      ? { displayName: paymentInfo.supportedTreecounterName }
                      : null
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
          )}
        </CardLayout>
      </div>
    );
  }
}

AppPayments.propTypes = {
  paymentInfo: PropTypes.object
};
