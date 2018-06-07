import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import PrimaryButton from '../Common/Button/PrimaryButton';

import {
  currentUserProfileSelector,
  selectedPlantProjectSelector
} from '../../selectors/index';
import CurrencySelector from '../GiftTrees/CurrencySelector';
import TreeCountSelector from '../GiftTrees/TreeCountSelector';
import PaymentSelector from './PaymentSelector';
import PlantProject from './PlantProject';

class DonationProcess extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentConfig: null,
      countryCurrency: null,
      currency: null,
      country: null,
      treeCount: null,
      amount: 0,
      defaultCurrency: null
    };

    this.updateCountryCurrency = this.updateCountryCurrency.bind(this);
    this.updateTreeCount = this.updateTreeCount.bind(this);
    this.paymentSuccessCallback = this.paymentSuccessCallback.bind(this);
    this.paymentFailedCallback = this.paymentFailedCallback.bind(this);
    this.paymentErrorCallback = this.paymentErrorCallback.bind(this);
  }

  componentDidMount() {
    console.log('########### componentDidMount', this.props);
    this.initializeState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('########### componentWillReceiveProps', nextProps);
    this.initializeState(nextProps);
  }

  initializeState(props) {
    console.log('########### initializeState', props);
    if (null === props.plantProject) {
      return;
    }

    console.log(currencies);
    const { userProfile, plantProject } = props;

    console.log(plantProject.paymentSetup);

    const paymentConfig = {
      ...plantProject.paymentSetup,
      currencies: {
        currency_names: {
          USD: 'dólar estadounidense',
          EUR: 'euro',
          CHF: 'franco suizo',
          GBP: 'libra esterlina',
          MXN: 'peso mexicano'
        },
        currency_rates: {
          EUR: {
            last_modified: 1528050547,
            rates: {
              CHF: '1.152579',
              EUR: '1.000000',
              GBP: '0.874172',
              MXN: '23.252459',
              USD: '1.166589'
            }
          }
        }
      }
    };

    const countryCurrency = this.getCountryCurrency(
      userProfile.country,
      paymentConfig
    );
    const treeCount = paymentConfig.treeCountOptions.variableDefaultTreeCount;
    const currency = plantProject.currency;
    const country = null === userProfile ? null : userProfile.country;
    const defaultCurrency = paymentConfig.countries[currency];

    const newState = {
      paymentConfig,
      countryCurrency,
      currency,
      country,
      defaultCurrency,
      treeCount: paymentConfig.countries[countryCurrency].defaultTreeCount,
      amount: this.getAmount(paymentConfig, currency, treeCount)
    };

    this.setState(newState);
  }

  // choose the countryCode/currency combination that matches the user's country (if any)
  getCountryCurrency(country, paymentConfig) {
    return Object.keys(paymentConfig.countries).find(countryCurrency => {
      const [countryCode] = countryCurrency.split('/');
      return (
        countryCode === country ||
        paymentConfig.countries[countryCurrency].isDefault === true
      );
    });
  }

  updateTreeCount(treeCount) {
    if (null === this.state.paymentConfig || null === this.state.currency) {
      return;
    }
    const newState = {
      treeCount: parseInt(treeCount),
      amount: this.getAmount(
        this.state.paymentConfig,
        this.state.currency,
        treeCount
      )
    };

    this.setState(newState);
  }

  updateCountryCurrency(countryCurrency) {
    if (null === this.state.paymentConfig) {
      return;
    }

    const currency = this.getCurrency(countryCurrency);
    const country = this.getCountry(countryCurrency);

    const newState = {
      countryCurrency,
      currency,
      country,
      amount: this.getAmount(
        this.state.paymentConfig,
        currency,
        this.state.treeCount
      )
    };

    this.setState(newState);
  }

  getCurrency(countryCurrency) {
    return countryCurrency.substr(countryCurrency.indexOf('/') + 1);
  }

  getAmount(paymentConfig, currency, treeCount) {
    return null === treeCount
      ? 0
      : paymentConfig.currencies[currency].treeValue * treeCount;
  }

  /*
  {
    "currency_names": {
        "USD": "dólar estadounidense",
        "EUR": "euro",
        "CHF": "franco suizo",
        "GBP": "libra esterlina",
        "MXN": "peso mexicano"
    },
    "currency_rates": {
        "EUR": {
            "last_modified": 1528050547,
            "rates": {
                "CHF": "1.152579",
                "EUR": "1.000000",
                "GBP": "0.874172",
                "MXN": "23.252459",
                "USD": "1.166589"
            }
        }
    }
}
   */
  getCurrencyOptions() {
    const currencyData = this.state.paymentConfig.currencies;
    return Object.keys(currencyData.currency_names).map(
      currencyCode => `${currencyCode} | ${currencyData[currencyCode]}`
    );
  }

  getCountryTreeCountOptions() {
    return this.state.paymentConfig.countries[this.state.countryCurrency]
      .treeCountOptions;
  }

  getPaymentMethods() {
    return this.state.paymentConfig.countries[this.state.countryCurrency]
      .paymentMethods;
  }

  paymentSuccessCallback(paymentData) {
    // TODO: put payment data into corresponding donation form field (serialize into JSON)
    console.log('paymentSuccessCallback', paymentData);
  }

  paymentFailedCallback(paymentData) {
    // TODO: figure out how to act, maybe show specific error popup, notify server, etc.
    console.log('paymentFailedCallback', paymentData);
  }

  paymentErrorCallback(paymentData) {
    // TODO: figure out how to act, maybe show specific error popup, notify server, etc.
    console.log('paymentErrorCallback', paymentData);
  }

  render() {
    console.log('render: ', this.state);
    if (null === this.state.paymentConfig) {
      return null;
    }

    const currencySelectorProps = {
      countryCurrencies: this.getCurrencyOptions()
    };

    const treeCountSelectorProps = {
      treeCountOptions: this.state.treeCountOptions,
      defaultTreeCount: this.state.treeCount,
      currency: this.state.currency
    };

    const paymentSelectorProps = {
      amount: this.state.amount,
      currency: this.state.currency,
      accounts: this.state.paymentConfig.accounts,
      paymentMethods: this.getPaymentMethods()
    };

    const containerStyle = {
      marginLeft: 250
    };
    /**
     * - determine default currency
     */

    return (
      <div style={containerStyle}>
        <PlantProject
          plantProject={plantProject}
          taxDeductableIn={this.state.paymentConfig.taxDeduction}
        />
        treeCount: {this.state.treeCount} | currency: {this.state.currency} |
        amount: {this.state.amount}
        <CurrencySelector
          {...currencySelectorProps}
          onChange={evt => this.updateCountryCurrency(evt.target.value)}
        />
        <TreeCountSelector
          {...treeCountSelectorProps}
          onChange={evt => this.updateTreeCount(evt.target.value)}
        />
        <PrimaryButton onClick={() => this.updateTreeCount(23)}>
          Set TreeCount
        </PrimaryButton>
        <PaymentSelector
          onSuccess={response => this.paymentSuccessCallback(response)}
          onFailure={response => this.paymentFailedCallback(response)}
          onError={response => this.paymentErrorCallback(response)}
          {...paymentSelectorProps}
        />
      </div>
    );
  }
}

DonationProcess.propTypes = {
  userProfile: Proptypes.object,
  plantProject: Proptypes.object
};

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state),
  plantProject: selectedPlantProjectSelector(state)
});

export default connect(mapStateToProps)(DonationProcess);
