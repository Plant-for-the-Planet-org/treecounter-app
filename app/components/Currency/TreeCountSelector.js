import React from 'react';
import PropTypes from 'prop-types';
import TextBlock from '../Common/Text/TextBlock';
import i18n from '../../locales/i18n';
import { formatNumber } from '../../utils/utils';
class TreeCountSelector extends React.Component {
  constructor(props) {
    super(props);

    const {
      fixedDefaultTreeCount,
      variableDefaultTreeCount
    } = props.treeCountOptions;

    this.state = {
      isFixed: true,
      fixedTreeCount: fixedDefaultTreeCount,
      variableTreeCount: variableDefaultTreeCount,
      variableAmount: props.treeCountToAmount(variableDefaultTreeCount)
    };

    props.onChange({
      treeCount: fixedDefaultTreeCount,
      amount: this.props.treeCountToAmount(fixedDefaultTreeCount)
    });

    this.handleFixedTreeCountChange = this.handleFixedTreeCountChange.bind(
      this
    );
    this.handleVariableTreeCountChange = this.handleVariableTreeCountChange.bind(
      this
    );
    this.handleVariableAmountChange = this.handleVariableAmountChange.bind(
      this
    );
    this.handleVariableTreeCountSelected = this.handleVariableTreeCountSelected.bind(
      this
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currency !== nextProps.currency) {
      this.handleVariableTreeCountChange(this.state.variableTreeCount);
    }
  }
  handleFixedTreeCountChange(treeCount) {
    this.updateStateAndParent({
      fixedTreeCount: parseInt(treeCount),
      isFixed: true
    });
  }

  handleVariableTreeCountChange(treeCount) {
    if (treeCount === '') {
      treeCount = 0;
    }
    this.updateStateAndParent({
      variableTreeCount: parseInt(treeCount),
      variableAmount: this.props.treeCountToAmount(treeCount)
    });
  }

  handleVariableAmountChange(amount) {
    if (amount === '') {
      amount = 0;
    }

    const treeCount = this.props.amountToTreeCount(amount);
    if (isNaN(treeCount)) {
      return;
    }
    this.updateStateAndParent({
      variableAmount: parseInt(amount),
      variableTreeCount: treeCount
    });
  }

  handleVariableTreeCountSelected() {
    this.updateStateAndParent({ isFixed: false });
  }

  updateStateAndParent(updates) {
    const newState = { ...this.state, ...updates };
    this.setState(newState);

    this.props.onChange({
      treeCount: newState.isFixed
        ? newState.fixedTreeCount
        : newState.variableTreeCount,
      amount: newState.isFixed
        ? this.props.treeCountToAmount(newState.fixedTreeCount)
        : newState.variableAmount
    });
  }
  getFormattedNumber(treeCount, symbol) {
    const { currency, treeCountToAmount } = this.props;
    try {
      const data = formatNumber(treeCountToAmount(treeCount), null, currency);
      return symbol ? data.replace(/[\d.,]/g, '') : data;
    } catch (err) {
      return symbol ? currency : treeCountToAmount(treeCount) + ' ' + currency;
    }
  }
  render() {
    const { treeCountOptions } = this.props;

    return (
      <div className={'treecount-container'}>
        <TextBlock strong>{i18n.t('label.no_of_trees')}</TextBlock>
        {treeCountOptions.fixedTreeCountOptions.map(treeCount => {
          return (
            <div className="treecount-price-conversion" key={treeCount}>
              <label key={treeCount} className="price-conversion__radio">
                <input
                  type="radio"
                  value={treeCount}
                  checked={
                    treeCount === this.state.fixedTreeCount &&
                    true === this.state.isFixed
                  }
                  onChange={evt =>
                    this.handleFixedTreeCountChange(evt.target.value)
                  }
                />
                {treeCount} {i18n.t('label.trees')}
              </label>
              <span className="price-conversion__equal">=</span>
              <span className="price-conversion__amount">
                {this.getFormattedNumber(treeCount)}
              </span>
            </div>
          );
        })}

        <div className="treecount-price-conversion">
          <label key="variable" className="price-conversion__radio">
            <input
              type="radio"
              value={this.state.variableTreeCount}
              checked={!this.state.isFixed}
              onChange={evt =>
                this.handleVariableTreeCountSelected(evt.target.value)
              }
            />
            <div
              className="inputContainer"
              onClick={evt =>
                this.handleVariableTreeCountSelected(evt.target.value)
              }
            >
              <input
                type="text"
                value={this.state.variableTreeCount}
                onChange={evt =>
                  this.handleVariableTreeCountChange(evt.target.value)
                }
              />{' '}
              {i18n.t('label.trees')}
            </div>
          </label>
          <span className="price-conversion__equal">=</span>
          <span className="price-conversion__amount">
            <input
              type="text"
              disabled={this.state.isFixed}
              value={String(this.state.variableAmount)}
              onChange={evt =>
                this.handleVariableAmountChange(evt.target.value)
              }
            />{' '}
            {this.getFormattedNumber(1, true)}
          </span>
        </div>
      </div>
    );
  }
}

TreeCountSelector.propTypes = {
  treeCountOptions: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  treeCountToAmount: PropTypes.func.isRequired,
  amountToTreeCount: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  defaultTreeCount: PropTypes.number.isRequired
};

export default TreeCountSelector;
