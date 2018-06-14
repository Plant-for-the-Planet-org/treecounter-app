import React from 'react';
import PropTypes from 'prop-types';

import CurrencySelector from './CurrencySelector';
import TreeCountSelector from './TreeCountSelector';

class TreeCountCurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCurrency: props.selectedCurrency,
      selectedTreeCount: props.selectedTreeCount,
      selectedAmount: 0,
      baseCurrency: props.baseCurrency,
      countryCurrencies: props.countryCurrencies,
      userCountry: props.userCountry,
      currencies: props.currencies,
      rates: props.currencies.currency_rates[props.baseCurrency].rates
    };

    this.calculateAmount = this.calculateAmount.bind(this);
    this.calculateTreeCount = this.calculateTreeCount.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleTreeCountChange = this.handleTreeCountChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTreeCount !== this.state.selectedTreeCount) {
      this.setState({
        selectedTreeCount: nextProps.selectedTreeCount
      });
    }
  }

  handleCurrencyChange(currency) {
    this.updateStateAndParent({ selectedCurrency: currency });
  }

  handleTreeCountChange(treeCountData) {
    this.updateStateAndParent({
      selectedTreeCount: treeCountData.treeCount,
      selectedAmount: treeCountData.amount
    });
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
      (amount - this.getFees()) / (this.props.treeCost * this.getRate())
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
      directPaymentAvailable,
      directCurrencies
    );
    return directPaymentAvailable ? 0 : 777; // some amount TBD
  }

  updateStateAndParent(updates) {
    console.log('######## updateStateAndParent: ', updates);
    const newState = { ...this.state, ...updates };
    this.setState(newState);

    this.props.onChange({
      currency: newState.selectedCurrency,
      amount: newState.selectedAmount,
      treeCount: newState.selectedTreeCount
    });
  }

  render() {
    const { currencies, treeCountOptions } = this.props;

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
          onChange={this.handleTreeCountChange}
          treeCountOptions={treeCountOptions}
          defaultTreeCount={this.state.selectedTreeCount}
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
  onChange: PropTypes.func.isRequired,
  treeCountOptions: PropTypes.object.isRequired,
  countryCurrencies: PropTypes.array.isRequired,
  userCountry: PropTypes.string
};

export default TreeCountCurrencySelector;
