import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import CardLayout from '../Common/Card';
import PaymentSelector from './PaymentSelector';
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

  openApp(status) {
    if (status === 'success') {
      window.location.href = 'trilliontreecampaign://paymentSuccess';
    } else {
      window.location.href = 'trilliontreecampaign://paymentFailed';
    }
  }

  render() {
    let { paymentInfo, paymentStatus } = this.props;
    let paymentMethods;
    if (paymentInfo && paymentInfo.paymentSetup) {
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
          {this.props.paymentStatus && this.props.paymentStatus.status ? (
            <div className="payment-success">
              <img src={check_green} />
              <div className={'gap'} />
              <TextBlock strong>
                {i18n.t('label.thankyou_planting', {
                  count: paymentInfo.treeCount
                })}
              </TextBlock>
              <div className={'gap'} />
              <TextBlock>
                <PrimaryButton onClick={() => this.openApp('success')}>
                  {i18n.t('label.go_back_to_app')}
                </PrimaryButton>
              </TextBlock>
            </div>
          ) : paymentStatus &&
            !paymentStatus.status &&
            paymentStatus.message ? (
            <div className="payment-success">
              <img src={attention} />
              <div className={'gap'} />
              <TextBlock strong>
                {i18n.t('label.error') + ' ' + paymentStatus.message}
              </TextBlock>
              <div className={'gap'} />
              <TextBlock>
                <PrimaryButton onClick={() => this.openApp('failed')}>
                  {i18n.t('label.go_back_to_app')}
                </PrimaryButton>
              </TextBlock>
            </div>
          ) : (
            <div className="payment-options-container">
              {paymentInfo && paymentInfo.paymentSetup ? (
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
                  paymentStatus={paymentStatus}
                  paymentDetails={{
                    amount: paymentInfo.amount,
                    currency: paymentInfo.currency,
                    treeCount: paymentInfo.treeCount
                  }}
                  context={{
                    treeCount: paymentInfo.treeCount,
                    tpoName: paymentInfo.tpoName,
                    giftTreeCounterName: paymentInfo.giftRecipient,
                    plantProjectName: paymentInfo.plantProjectName,
                    supportTreecounter: paymentInfo.supportedTreecounterName
                      ? { displayName: paymentInfo.supportedTreecounterName }
                      : null
                  }}
                  donationId={paymentInfo.id}
                  onFailure={data =>
                    debug('/////////////////// payment failure ', data)
                  }
                  onError={data =>
                    debug('/////////////////// payment error ', data)
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
  paymentInfo: PropTypes.object,
  paymentStatus: PropTypes.object
};
