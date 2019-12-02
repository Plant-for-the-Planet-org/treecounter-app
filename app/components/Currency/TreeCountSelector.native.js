import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import { Text, TextInput, View } from 'react-native';
import styles from '../../styles/currencies/treeCounterSelector';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import { formatNumber, delimitNumbers } from '../../utils/utils';

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
      variableAmount: props.treeCountToAmount(variableDefaultTreeCount),
      value3Index: -1,
      fixedIndex: -1
    };

    props.onChange({
      treeCount: fixedDefaultTreeCount,
      amount: this.props.treeCountToAmount(fixedDefaultTreeCount)
    });
  }

  componentWillReceiveProps(nextProps) {
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
      console.log('error formatting', err);
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
          <View style={styles.treecount_price_radio_container}>
            <RadioForm>
              {/* To create radio buttons, loop through your array of options */}
              {radio_props.map((obj, i) => {
                return (
                  <RadioButton
                    wrapStyle={styles.radioContainer}
                    labelHorizontal
                    key={i}
                  >
                    <RadioButtonInput
                      buttonSize={13}
                      buttonWrapStyle={styles.radio_button}
                      buttonInnerColor={'#ec6453'}
                      buttonOuterColor={'#ec6453'}
                      obj={obj}
                      index={i}
                      isSelected={
                        obj.value === this.state.fixedTreeCount &&
                        this.state.isFixed
                      }
                      onPress={(value /* , index */) => {
                        this.handleFixedTreeCountChange(value);
                      }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelWrapStyle={styles.radio_label}
                      labelHorizontal
                      onPress={(value /* , index */) => {
                        this.handleFixedTreeCountChange(value);
                      }}
                    />
                  </RadioButton>
                );
              })}
            </RadioForm>
          </View>
          <View style={styles.treecount_price_conversion_column}>
            {treeCountOptions.fixedTreeCountOptions.map(treeCount => {
              return (
                <View
                  style={styles.treecount_price_conversion_text}
                  key={treeCount + 'container'}
                >
                  <View style={styles.treecount_price_conversion_text_equal}>
                    <Text>=</Text>
                  </View>
                  <View style={styles.treecount_price_conversion_text_input}>
                    <Text style={{ width: '100%' }} key={treeCount}>
                      {this.getFormattedNumber(treeCount)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.treecount_priceContainer_row}>
          <View style={styles.treecount_price_radio_container}>
            <RadioForm>
              {fixed_radio_props.map((obj, i) => {
                return (
                  <RadioButton
                    style={{ padding: 0, width: 30 }}
                    wrapStyle={styles.radioContainer}
                    labelHorizontal
                    key={i}
                  >
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      buttonWrapStyle={styles.radio_button}
                      buttonSize={13}
                      buttonInnerColor={'#ec6453'}
                      buttonOuterColor={'#ec6453'}
                      isSelected={!this.state.isFixed}
                      onPress={(value /* , index */) => {
                        this.handleVariableTreeCountSelected(value);
                      }}
                    />
                  </RadioButton>
                );
              })}
            </RadioForm>
            <View style={styles.radioContainer}>
              <View style={styles.radio_label}>
                <TextInput
                  editable={!this.state.isFixed}
                  underlineColorAndroid={'transparent'}
                  style={styles.treecount_price_conversion_text_input2}
                  keyboardType="numeric"
                  onChangeText={evt => this.handleVariableTreeCountChange(evt)}
                  value={String(this.state.variableTreeCount)}
                  autoCapitalize={'sentences'}
                />
                <Text
                  key="variable"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.treecount_price_conversion_label}
                >
                  {' ' + i18n.t('label.trees')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.treecount_price_conversion_text}>
            <View style={styles.treecount_price_conversion_text_equal}>
              <Text>=</Text>
            </View>
            <View style={styles.radio_label}>
              <TextInput
                editable={!this.state.isFixed}
                underlineColorAndroid={'transparent'}
                style={styles.treecount_price_conversion_text_input2}
                keyboardType="numeric"
                onChangeText={evt => this.handleVariableAmountChange(evt)}
                value={delimitNumbers(this.state.variableAmount)}
                autoCapitalize={'sentences'}
              />
              <Text
                key="variable"
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.treecount_price_conversion_label}
              >
                {' '}
                {this.getFormattedNumber(1, true)}
              </Text>
            </View>
          </View>
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
