import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import { tree } from '../../assets';
import { Text, TextInput, View } from 'react-native';
import styles from '../../styles/currencies/treeCounterSelector';

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
    console.log('treeCountOptions.fixedTreeCountOptions)');
    console.log(treeCountOptions.fixedTreeCountOptions);
    return (
      <View style={styles.treecount_container}>
        <Text strong={true}>{i18n.t('label.no_of_trees')}</Text>
        {treeCountOptions.fixedTreeCountOptions.map(treeCount => {
          return (
            <View style={styles.treecount_price_conversion} key={treeCount}>
              <Text style={styles.counter_label}>
                {/* <input
                type="radio"
                value={treeCount}
                checked={
                  treeCount === this.state.fixedTreeCount &&
                  true === this.state.isFixed
                }
                onChange={evt =>
                  this.handleFixedTreeCountChange(evt.target.value)
                }
              /> */}
                {treeCount} {i18n.t('label.trees')}
              </Text>
              <Text>=</Text>
              <Text key={treeCount} style={styles.counter_label}>
                {treeCountToAmount(treeCount)} {currency}
              </Text>
            </View>
          );
        })}

        <View style={styles.treecount_price_conversion}>
          {/* <input
            type="radio"
            value={this.state.variableTreeCount}
            checked={!this.state.isFixed}
            onChange={evt =>
              this.handleVariableTreeCountSelected(evt.target.value)
            }
          /> */}
          <TextInput
            editable={!this.state.isFixed}
            keyboardType="numeric"
            onChangeText={evt =>
              this.handleVariableTreeCountChange(evt.target.value)
            }
            value={String(this.state.variableTreeCount)}
          />
          <Text key="variable"> {i18n.t('label.trees')}</Text>
          <Text>=</Text>

          <TextInput
            editable={!this.state.isFixed}
            keyboardType="numeric"
            onChangeText={evt =>
              this.handleVariableAmountChange(evt.target.value)
            }
            value={String(this.state.variableAmount)}
          />
          <Text> {currency}</Text>
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
