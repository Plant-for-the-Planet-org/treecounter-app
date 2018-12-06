import React from 'react';
import PropTypes from 'prop-types';
import TextBlock from '../Common/Text/TextBlock';
import i18n from '../../locales/i18n';
import { tree } from '../../assets';

class TreeCountSelector extends React.Component {
  constructor(props) {
    super(props);
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
    this.getVariableAmount = this.getVariableAmount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currency !== nextProps.currency) {
      this.handleVariableTreeCountChange(this.props.variableTreeCount);
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
    this.updateStateAndParent({
      variableTreeCount: treeCount
    });
  }

  getVariableAmount() {
    return this.props.treeCountToAmount(this.props.variableTreeCount);
  }

  handleVariableTreeCountSelected() {
    this.updateStateAndParent({ isFixed: false });
  }

  updateStateAndParent(updates) {
    this.props.onChange({
      isFixed: updates.isFixed,
      variableTreeCount: updates.variableTreeCount,
      fixedTreeCount: updates.fixedTreeCount
    });
  }

  render() {
    const { treeCountOptions, currency, treeCountToAmount } = this.props;

    return (
      <div className={'treecount-container'}>
        <TextBlock strong={true}>{i18n.t('label.no_of_trees')}</TextBlock>
        {treeCountOptions.fixedTreeCountOptions.map(treeCount => {
          return (
            <div className="treecount-price-conversion" key={treeCount}>
              <label key={treeCount} className="price-conversion__radio">
                <input
                  type="radio"
                  value={treeCount}
                  checked={
                    treeCount === this.props.fixedTreeCount &&
                    true === this.props.isFixed
                  }
                  onChange={evt =>
                    this.handleFixedTreeCountChange(evt.target.value)
                  }
                />
                {treeCount} {i18n.t('label.trees')}
              </label>
              <span className="price-conversion__equal">=</span>
              <span className="price-conversion__radio">
                {treeCountToAmount(treeCount)} {currency}
              </span>
            </div>
          );
        })}

        <div className="treecount-price-conversion">
          <label key="variable" className="price-conversion__radio">
            <input
              type="radio"
              value={this.props.variableTreeCount}
              checked={!this.props.isFixed}
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
                value={this.props.variableTreeCount}
                onChange={evt =>
                  this.handleVariableTreeCountChange(evt.target.value)
                }
              />{' '}
              {i18n.t('label.trees')}
            </div>
          </label>
          <span className="price-conversion__equal">=</span>
          <span className="price-conversion__radio">
            <input
              type="text"
              disabled={this.props.isFixed}
              value={this.props.variableAmount}
              onChange={evt =>
                this.handleVariableAmountChange(evt.target.value)
              }
            />{' '}
            {currency}
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
  variableTreeCount: PropTypes.number,
  fixedTreeCount: PropTypes.number,
  isFixed: PropTypes.bool,
  variableAmount: PropTypes.number
};

export default TreeCountSelector;
