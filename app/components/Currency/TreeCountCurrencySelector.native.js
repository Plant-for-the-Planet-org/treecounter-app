import React from 'react';
import PropTypes from 'prop-types';

import CurrencySelector from './CurrencySelector';
import TreeCountSelector from './TreeCountSelector';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n';
import { Dimensions, View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject.native';
import { formatNumber, delimitNumbers } from '../../utils/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class TreeCountCurrencySelector extends React.PureComponent {
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
    // console.log('Tree Count currency selector called up');
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 35 }}
        enableOnAndroid
      >
        <CardLayout>
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.selectedProjectRow}>
              <Text>{this.props.selectedProject.name}</Text>
            </View>
            {this.props.giftTreeCounterName ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                  <Text>{delimitNumbers(this.state.selectedTreeCount)}</Text>
                  <Text style={styles.selectedProjectCol}>
                    {' '}
                    {i18n.t('label.trees')}
                  </Text>{' '}
                  {i18n.t('label.gift_to', {
                    name: this.props.giftTreeCounterName
                  })}
                </Text>
                {/*<Text>{this.props.giftTreeCounterName}</Text>*/}
              </View>
            ) : this.props.supportTreecounter &&
            this.props.supportTreecounter.displayName ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                  <Text>{delimitNumbers(this.state.selectedTreeCount)}</Text>
                  <Text style={styles.selectedProjectCol}>
                    {' '}
                    {i18n.t('label.trees')}
                  </Text>{' '}
                  {i18n.t('label.support_to', {
                    name: this.props.supportTreecounter.displayName
                  })}
                </Text>
                {/*<Text>{this.props.giftTreeCounterName}</Text>*/}
              </View>
            ) : (
              <View style={styles.selectedProjectRow}>
                <Text>{delimitNumbers(this.state.selectedTreeCount)}</Text>
                <Text style={styles.selectedProjectCol}>
                  {i18n.t('label.trees')}
                </Text>
              </View>
            )}

            <View style={styles.selectedProjectRow}>
              <Text>
                {i18n.t('label.amount')}
                {' : '}
                {formatNumber(
                  this.state.selectedAmount,
                  null,
                  this.state.selectedCurrency
                )}
              </Text>
            </View>
          </View>

          <CurrencySelector
            currencies={currencies}
            onChange={this.handleCurrencyChange}
            selectedCurrency={this.state.selectedCurrency}
          />

          <View style={{ width: Dimensions.get('window').width - 30 }}>
            <TreeCountSelector
              currency={this.state.selectedCurrency}
              amountToTreeCount={this.calculateTreeCount}
              treeCountToAmount={this.calculateAmount}
              onChange={this.handleTreeCountChange}
              treeCountOptions={treeCountOptions}
              defaultTreeCount={this.state.selectedTreeCount}
            />
          </View>

          {this.props.showNextButton ? (
            <PrimaryButton onClick={() => this.props.onNextClick()}>
              {i18n.t('label.next')}
            </PrimaryButton>
          ) : null}
        </CardLayout>
      </KeyboardAwareScrollView>
    );
  }
}

TreeCountCurrencySelector.propTypes = {
  currencies: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  treeCountOptions: PropTypes.object.isRequired,
  selectedTreeCount: PropTypes.number.isRequired,
  treeCost: PropTypes.number.isRequired,
  rates: PropTypes.object.isRequired,
  fees: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  selectedProject: PropTypes.object.isRequired
};

export default TreeCountCurrencySelector;
