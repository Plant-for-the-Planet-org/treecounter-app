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
      selectedAmount: 0
    };

    this.calculateAmount = this.calculateAmount.bind(this);
    this.calculateTreeCount = this.calculateTreeCount.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleTreeCountChange = this.handleTreeCountChange.bind(this);
  }
  componentDidMount() {
    this.handleTreeCountChange({
      treeCount: this.state.selectedTreeCount,
      amount: this.calculateAmount(this.state.selectedTreeCount)
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    return (
      Math.round(treeCount * this.props.treeCost * this.getRate() * 100) / 100 +
      this.props.fees
    );
  }

  calculateTreeCount(amount) {
    return Math.floor(
      (amount - this.props.fees) / (this.props.treeCost * this.getRate())
    );
  }

  getRate() {
    return parseFloat(this.props.rates[this.state.selectedCurrency]);
  }

  updateStateAndParent(updates) {
    const newState = { ...this.state, ...updates };
    this.setState(newState, () => {
      this.props.onChange({
        currency: newState.selectedCurrency,
        amount: newState.selectedAmount,
        treeCount: newState.selectedTreeCount
      });
    });
  }

  render() {
    const { currencies, treeCountOptions } = this.props;
    return (
      <div>
        <CurrencySelector
          currencies={currencies}
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
  currencies: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  treeCountOptions: PropTypes.object.isRequired,
  selectedTreeCount: PropTypes.number.isRequired,
  treeCost: PropTypes.any.isRequired,
  rates: PropTypes.object.isRequired,
  fees: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TreeCountCurrencySelector;
