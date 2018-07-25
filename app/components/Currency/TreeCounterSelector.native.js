import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import { tree } from '../../assets';
import { Text } from 'react-native';

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

  render() {
    const { treeCountOptions, currency, treeCountToAmount } = this.props;

    return <Text>Tree Text</Text>;
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
