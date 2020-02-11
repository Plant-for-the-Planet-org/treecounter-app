/* eslint-disable react-native/no-color-literals */
import React, { Component, useState } from 'react';
// import t from 'tcomb-form-native';
import { Text, View, FlatList, Image, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { currentUserProfileSelector, getCurrency } from '../../selectors/index';
import i18n from '../../locales/i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableItem from '../../components/Common/TouchableItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currencySort } from './utils';
import { currenciesSelector } from '../../selectors';
import { fetchCurrencies } from '../../actions/currencies';
import { getCountryFlagImageUrl } from '../../actions/apiRouting';
import countryCodes from '../../assets/countryCodes.json';
import { setCurrencyAction } from '../../actions/globalCurrency';
import { updateUserProfile } from '../../actions/updateUserProfile';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const backgroundColor = '#e4e4e4';
const activeColor = '#74ba00';
const defaultColor = '#676c6e';

class GlobalCurrencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: 0,
      search: '',
      preferredCurrency: props.globalCurrency.currency,
      show: props.show
    };
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.preferredCurrency != nextProps.globalCurrency.currency) {
      this.setState({ preferredCurrency: nextProps.globalCurrency.currency });
    } else if (
      !nextProps.userProfile &&
      this.state.preferredCurrency != nextProps.globalCurrency.currency
    ) {
      //this.state.preferredCurrency && this.props.setCurrencyAction(this.state.preferredCurrency);
    }
    {
      nextProps.userProfile &&
        nextProps.userProfile.currency &&
        this.setState({ preferredCurrency: nextProps.userProfile.currency }) &&
        this.props.setCurrencyAction(nextProps.userProfile.currency);
    }

    if (!nextProps.currencies.currencies) {
      this.props.fetchCurrencies();
    }
  }
  async componentWillMount() {
    // this.setState({ preferredCurrency: getPreferredCurrency() });
    this.props.userProfile &&
      this.rops.userProfile.currency &&
      this.setState({ preferredCurrency: this.props.userProfile.currency }) &&
      this.props.setCurrencyAction(this.props.userProfile.currency);
  }
  async componentDidMount() {
    if (!this.props.currencies.currencies) {
      let curreniesData = await this.props.fetchCurrencies();
    }
    if (!this.state.preferredCurrency && this.props.globalCurrency.currency) {
      this.setState({ preferredCurrency: this.props.globalCurrency.currency });
    }
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
        )
          .map(currency => {
            return {
              value: currency,
              label: this.props.currencies.currencies.currency_names[currency]
            };
          })
          .filter(
            currency =>
              currency.value.includes(this.state.search.toUpperCase()) ||
              currency.label
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
          )
      : [
          {
            value: this.state.preferredCurrency,
            label: this.state.preferredCurrency
          }
        ];
  }
  setSearch(text = '') {
    this.state.search !== text && this.setState({ search: text });
  }
  handleCurrencyChange(selectedOption) {
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
  getCountryCode = currency =>
    countryCodes.find(c => c.code == currency.value) || {};
  isActive = currency => currency.value == this.state.preferredCurrency;
  keyExtractor = d => d.value;
  renderItem = ({ item: currency }) => {
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
          <Image
            source={{
              uri: getCountryFlagImageUrl(
                this.getCountryCode(currency).countryCode,
                'png',
                256
              )
            }}
            style={{ width: 24, height: 16, alignSelf: 'center' }}
          />
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
    return (
      <Modal
        isOpen={show}
        position={'left'}
        onClosed={this.onClosed}
        backdropPressToClose
        coverScreen
        keyboardTopOffset={0}
        swipeToClose
      >
        <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
          {/* <Text style={{ marginLeft: 10, paddingTop: 5, color: defaultColor }}>Currency</Text> */}
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              padding: 10,
              paddingTop: 3,
              margin: 10
            }}
          >
            <View
              style={{
                height: 45,
                opacity: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                marginLeft: 20
              }}
            >
              <TouchableItem
                // key={button.type}
                style={{
                  width: 50,
                  padding: 10
                }}
                onPress={this.onClosed}
              >
                <Icon name="close" size={30} color="#4d5153" />
              </TouchableItem>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: '#4d5153',
                  borderWidth: this.state.focus,
                  borderRadius: 20,
                  marginRight: 20
                }}
              >
                <TextInput
                  style={{ height: 40, flex: 1, paddingLeft: 20 }}
                  onChangeText={text => {
                    this.setSearch(text);
                  }}
                  value={this.state.search}
                  placeholder={'Search'}
                  placeholderTextColor={'#4d5153'}
                  onFocus={() => {
                    this.setState({ focus: 1 });
                  }}
                  onBlur={() => {
                    this.setState({ focus: 0 });
                  }}
                />
                <TouchableItem
                  style={{
                    width: 30
                  }}
                  onPress={() => {
                    this.setSearch();
                  }}
                >
                  <Icon name="close" size={24} color="#4d5153" />
                </TouchableItem>
              </View>
            </View>
            <ScrollView>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 10 }}>
                  {i18n.t('label.featured_currencies')}
                </Text>
                <FlatList
                  data={currenciesArray.slice(0, 2)}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 10 }}>
                  {i18n.t('label.all_currencies')}
                </Text>
              </View>
              <FlatList
                data={currenciesArray.slice(2)}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    globalCurrency: getCurrency(state),
    userProfile: currentUserProfileSelector(state),
    currencies: currenciesSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCurrencies,
      setCurrencyAction,
      updateUserProfile
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GlobalCurrencySelector
);
