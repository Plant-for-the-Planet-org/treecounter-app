import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import { tree } from '../../assets';
import { Text, TextInput, View } from 'react-native';
import styles from '../../styles/currencies/treeCounterSelector';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

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
    let radio_props = [];
    treeCountOptions.fixedTreeCountOptions.map(treeCount => {
      let label = treeCount + '         ' + i18n.t('label.trees');
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
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      buttonSize={15}
                      buttonInnerColor={'#ec6453'}
                      buttonOuterColor={'#ec6453'}
                      obj={obj}
                      index={i}
                      isSelected={
                        obj.value === this.state.fixedTreeCount &&
                        this.state.isFixed
                      }
                      onPress={(value, index) => {
                        this.handleFixedTreeCountChange(value);
                      }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                );
              })}
            </RadioForm>
          </View>
          <View style={styles.treecount_price_conversion_Column}>
            {treeCountOptions.fixedTreeCountOptions.map(treeCount => {
              return (
                <View
                  style={styles.treecount_price_conversion_Text}
                  key={treeCount + 'container'}
                >
                  <Text style={styles.treecount_price_conversion_Text_equal2}>
                    =
                  </Text>
                  <Text
                    style={styles.treecount_price_conversion_Text_input}
                    key={treeCount}
                  >
                    {treeCountToAmount(treeCount)}
                  </Text>
                  <Text style={styles.treecount_price_conversion_Text_currency}>
                    {' '}
                    {currency}
                  </Text>
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
                    labelHorizontal={true}
                    key={i}
                  >
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      buttonSize={15}
                      buttonInnerColor={'#ec6453'}
                      buttonOuterColor={'#ec6453'}
                      isSelected={!this.state.isFixed}
                      onPress={(value, index) => {
                        this.handleVariableTreeCountSelected(value);
                      }}
                    />
                  </RadioButton>
                );
              })}
            </RadioForm>

            <TextInput
              editable={!this.state.isFixed}
              style={styles.treecount_price_conversion_Text_input}
              keyboardType="numeric"
              onChangeText={evt =>
                this.handleVariableTreeCountChange(evt.target.value)
              }
              value={String(this.state.variableTreeCount)}
            />
            <Text
              key="variable"
              style={styles.treecount_price_conversion_lebel}
            >
              {i18n.t('label.trees')}
            </Text>
          </View>
          <View style={styles.treecount_price_conversion_Text}>
            <Text style={styles.treecount_price_conversion_Text_equal2}>=</Text>

            <TextInput
              editable={!this.state.isFixed}
              style={styles.treecount_price_conversion_Text_input2}
              keyboardType="numeric"
              onChangeText={evt =>
                this.handleVariableAmountChange(evt.target.value)
              }
              value={String(this.state.variableAmount)}
            />
            <Text style={styles.treecount_price_conversion_Text_currency}>
              {currency}
            </Text>
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
