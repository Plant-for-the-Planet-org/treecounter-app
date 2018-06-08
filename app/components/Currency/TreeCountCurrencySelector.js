import React from 'react';
import PropTypes from 'prop-types';

import CurrencySelector from './CurrencySelector';
import TreeCountSelector from './TreeCountSelector';

class TreeCountCurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    console.log('================ PROPS ', props);
    this.state = {
      selectedCurrency: props.selectedCurrency,
      selectedTreeCount: 0,
      baseCurrency: props.baseCurrency,
      currencies: props.currencies,
      countryCurrencies: props.countryCurrencies,
      userCountry: props.userCountry,
      rates: props.currencies.currency_rates[props.baseCurrency].rates
    };

    this.calculateAmount = this.calculateAmount.bind(this);
    this.calculateTreeCount = this.calculateTreeCount.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleTreeCountChange = this.handleTreeCountChange.bind(this);
  }

  handleCurrencyChange(currency) {
    this.setState({ selectedCurrency: currency });
    this.props.onCurrencyChange(currency);
  }

  handleTreeCountChange(treeCount) {
    this.setState({ selectedTreeCount: treeCount });
    this.props.onTreeCountChange(treeCount);
  }

  calculateAmount(treeCount) {
    // TODO: should we use some money library here?
    return (
      Math.round(treeCount * this.props.treeCost * this.getRate() * 100) / 100 +
      this.getFees()
    );
  }

  calculateTreeCount(amount) {
    // TODO: should we use some money library here?
    return Math.floor(
      amount - this.getFees() / (this.props.treeCost * this.getRate())
    );
  }

  getRate() {
    return parseFloat(this.state.rates[this.state.selectedCurrency]);
  }

  getFees() {
    const directCurrencies = this.state.countryCurrencies.map(
      countryCurrency => {
        const [, currency] = countryCurrency.split('/');
        return currency;
      }
    );
    const directPaymentAvailable = directCurrencies.includes(
      this.state.selectedCurrency
    );
    console.log(
      '########### directPaymentAvailable: ',
      directCurrencies,
      directPaymentAvailable,
      this.state
    );
    return directPaymentAvailable ? 0 : 1.777; // some amount TBD
  }

  render() {
    const { currencies, treeCountOptions, onTreeCountChange } = this.props;

    return (
      <div>
        <CurrencySelector
          currencies={currencies.currency_names}
          onChange={this.handleCurrencyChange}
          selectedCurrency={this.state.selectedCurrency}
        />
        <TreeCountSelector
          currency={this.state.selectedCurrency}
          amountToTreeCount={this.calculateTreeCount}
          treeCountToAmount={this.calculateAmount}
          onChange={onTreeCountChange}
          treeCountOptions={treeCountOptions}
          defaultTreeCount={50}
        />
      </div>
    );
  }
}

TreeCountCurrencySelector.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  currencies: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  selectedTreeCount: PropTypes.number.isRequired,
  treeCost: PropTypes.number.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  onTreeCountChange: PropTypes.func.isRequired,
  treeCountOptions: PropTypes.object.isRequired,
  countryCurrencies: PropTypes.array.isRequired,
  userCountry: PropTypes.string
};

export default TreeCountCurrencySelector;
