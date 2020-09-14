import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
//import { debug } from '../../debug';
import i18n from '../../locales/i18n';
import styles from '../../styles/currencies/treeCounterSelector';
import { formatNumber } from '../../utils/utils';
import { SelectTreeCount } from './DonationDetailsComponents/donationComponents.native';

class TreeCountSelector extends React.Component {
  constructor(props) {
    super(props);

    const {
      fixedDefaultTreeCount,
      variableDefaultTreeCount
    } = props.treeCountOptions;

    this.state = {
      isFixed: true,
      fixedTreeCount: variableDefaultTreeCount,
      variableTreeCount: fixedDefaultTreeCount,
      variableAmount: props.treeCountToAmount(variableDefaultTreeCount),
      value3Index: -1,
      fixedIndex: -1
    };

    props.onChange({
      treeCount: fixedDefaultTreeCount,
      amount: this.props.treeCountToAmount(fixedDefaultTreeCount)
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.currency !== nextProps.currency) {
      this.handleVariableTreeCountChange(this.state.variableTreeCount);
    }
  }
  handleFixedTreeCountChange = treeCount => {
    this.updateStateAndParent({
      fixedTreeCount: parseInt(treeCount),
      isFixed: true
    });
  };

  handleVariableTreeCountChange = treeCount => {
    if (treeCount === '') {
      treeCount = 0;
    }
    //debug('tree count changed', treeCount);
    this.updateStateAndParent({
      variableTreeCount: parseInt(treeCount),
      variableAmount: this.props.treeCountToAmount(treeCount)
    });
  };

  handleVariableAmountChange = amount => {
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
  };

  handleVariableTreeCountSelected = () => {
    this.updateStateAndParent({ isFixed: false });
  };

  updateStateAndParent(updates) {
    const newState = { ...this.state, ...updates };
    this.setState(newState);

    this.props.onChange({
      treeCount: newState.variableTreeCount,
      amount: newState.variableAmount
    });
  }
  getFormattedNumber(treeCount, symbol) {
    const { currency, treeCountToAmount } = this.props;
    try {
      const data = formatNumber(treeCountToAmount(treeCount), null, currency);
      return symbol ? data.replace(/[\d.,]/g, '') : data;
    } catch (err) {
      //debug('error formatting', err);
      return symbol ? currency : treeCountToAmount(treeCount) + ' ' + currency;
    }
  }

  render() {
    const { treeCountOptions } = this.props;
    let radio_props = [];
    treeCountOptions.fixedTreeCountOptions.map(treeCount => {
      let label = treeCount + ' ' + i18n.t('label.trees');
      radio_props.push({ label: label, value: treeCount });
    });

    let fixed_radio_props = [];
    fixed_radio_props.push({ label: '', value: this.state.variableTreeCount });

    return (
      <View style={styles.treecount_container}>
        <View style={styles.treecount_priceContainer_row}>
          <SelectTreeCount
            treeCount={this.state.variableTreeCount}
            setTreeCount={this.handleVariableTreeCountChange}
            selectedProject={this.props.selectedProject}
          />
        </View>
      </View>
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
