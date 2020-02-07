/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from 'react';
// import t from 'tcomb-form-native';
import { Text, View, Platform, ScrollView, FlatList } from 'react-native';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import { currentUserProfileSelector, getCurrency } from '../../selectors/index';
import i18n from '../../locales/i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableItem from '../../components/Common/TouchableItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currencySort } from './utils';
import { currenciesSelector } from '../../selectors';
import { fetchCurrencies } from '../../actions/currencies';
import {
  getPreferredCurrency,
  setCurrencyAction
} from '../../actions/globalCurrency';
import { getCdnMedia } from '../../reducers/configReducer';

const backgroundColor = 'gray';
const activeColor = '#89b53a';
const defaultColor = '#4d5153';
class GlobalCurrencySelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      preferredCurrency: props.globalCurrency.currency || 'EUR',
      show: props.show
    };
    console.log(props.globalCurrency);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  async componentWillReceiveProps(nextProps) {
    if (!nextProps.userProfile) {
      this.props.setCurrencyAction(this.state.preferredCurrency);
    } else {
      nextProps.userProfile &&
        nextProps.userProfile.currency &&
        this.setState({ preferredCurrency: nextProps.userProfile.currency }) &&
        this.props.setCurrencyAction(nextProps.userProfile.currency);
    }

    if (!nextProps.currencies.currencies) {
      await this.props.fetchCurrencies();
    }
  }
  async componentWillMount() {
    // this.setState({ preferredCurrency: getPreferredCurrency() });
  }
  async componentDidMount() {
    if (!this.props.currencies.currencies) {
      let curreniesData = await this.props.fetchCurrencies();
      console.log('got fron fetch', curreniesData);
    }
    console.log('setting', this.state);
    this.state.preferredCurrency &&
      this.props.setCurrencyAction(this.state.preferredCurrency);
  }
  updateState(data) {
    this.setState(data);
  }

  getCurrencyNames() {
    return this.props.currencies.currencies
      ? currencySort(
          Object.keys(this.props.currencies.currencies.currency_names)
        ).map(currency => {
          return {
            value: currency,
            label: this.props.currencies.currencies.currency_names[currency]
          };
        })
      : [
          {
            value: this.state.preferredCurrency,
            label: this.state.preferredCurrency
          }
        ];
  }
  handleCurrencyChange(selectedOption) {
    console.log(selectedOption);
    this.updateState({ preferredCurrency: selectedOption });
    this.props.setCurrencyAction(selectedOption);
    this.props.userProfile &&
      this.props.updateUserProfile({ currency: selectedOption }, 'currency');
  }
  onClosed = () => {
    this.props.hideCurrencyModal({
      show: false
    });
  };
  isActive = currency => currency.value == this.state.preferredCurrency;
  _keyExtractor = d => d.value;
  _renderItem = ({ item: currency }) => {
    return (
      <TouchableItem
        onPress={() => {
          this.handleCurrencyChange(currency.value);
        }}
      >
        <View
          key={currency.value}
          style={{ flexDirection: 'row', marginLeft: 10 }}
        >
          <Icon name="flag" size={32} color={defaultColor} style={{}} />
          <Text
            style={{
              padding: 10,
              width: '17%',
              fontSize: 15,
              fontWeight: 'bold',
              color: this.isActive(currency) ? activeColor : defaultColor
            }}
          >
            {currency.value}
          </Text>
          <Text
            style={{
              padding: 10,
              width: '45%',
              color: this.isActive(currency) ? activeColor : defaultColor
            }}
          >
            {currency.label}
          </Text>
          {this.isActive(currency) && (
            <Icon
              name="done"
              size={32}
              color="#89b53a"
              style={{
                marginLeft: 5
              }}
            />
          )}
        </View>
      </TouchableItem>
    );
  };
  render() {
    const { show } = this.props;
    const currenciesArray = this.getCurrencyNames();
    console.log(
      'preferred currency;',
      this.state.preferredCurrency,
      currenciesArray
    );
    return (
      <View style={{ backgroundColor: backgroundColor, flex: 1, margin: 20 }}>
        <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
          <Modal
            isOpen={show}
            position={'top'}
            onClosed={this.onClosed}
            backdropPressToClose={false}
            coverScreen
            keyboardTopOffset={0}
            swipeToClose={true}
          >
            <View
              style={{
                height: 70,
                opacity: 1
              }}
            >
              <TouchableItem
                // key={button.type}
                style={{
                  height: 70
                }}
                onPress={this.onClosed}
              >
                <Icon
                  name="close"
                  size={32}
                  color="#4d5153"
                  style={{
                    top: 25,
                    left: 18
                  }}
                />
              </TouchableItem>
            </View>
            <FlatList
              data={currenciesArray}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </Modal>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    globalCurrency: getCurrency(state),
    currentUserProfile: currentUserProfileSelector(state),
    currencies: currenciesSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCurrencies,
      setCurrencyAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GlobalCurrencySelector
);
