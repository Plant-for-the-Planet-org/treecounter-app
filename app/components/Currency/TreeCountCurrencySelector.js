import React from 'react';
import PropTypes from 'prop-types';

import CurrencySelector from './CurrencySelector';
import TreeCountSelector from './TreeCountSelector';

class TreeCountCurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCurrency: props.selectedCurrency,
      selectedTreeCount: 0,
      baseCurrency: props.baseCurrency,
      currencies: props.currencies,
      rates: props.currencies.currency_rates[props.baseCurrency].rates
    };

    this.props.onCurrencyChange(props.selectedCurrency);

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
    const rate = parseFloat(this.state.rates[this.state.selectedCurrency]);
    return Math.round(treeCount * this.props.treeCost * rate * 100) / 100;
  }

  calculateTreeCount(amount) {
    // TODO: should we use some money library here?
    const rate = parseFloat(this.state.rates[this.state.selectedCurrency]);
    return Math.floor(amount / (this.props.treeCost * rate));
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
  treeCountOptions: PropTypes.object.isRequired
};

export default TreeCountCurrencySelector;
