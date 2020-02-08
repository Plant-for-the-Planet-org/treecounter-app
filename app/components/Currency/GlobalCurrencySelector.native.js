/* eslint-disable react-native/no-color-literals */
import React, { Component } from 'react';
// import t from 'tcomb-form-native';
import { Text, View, FlatList, Image } from 'react-native';
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

const backgroundColor = 'gray';
const activeColor = '#89b53a';
const defaultColor = '#4d5153';
class GlobalCurrencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferredCurrency: props.globalCurrency.currency,
      show: props.show
    };
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log('next props in global', nextProps);
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
      console.log('got fron fetch', curreniesData);
    }
    if (!this.state.preferredCurrency && this.props.globalCurrency.currency) {
      this.setState({ preferredCurrency: this.props.globalCurrency.currency });
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
    console.log('handle currency change', selectedOption);
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
            style={{ width: 30, height: 20, alignSelf: 'center' }}
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
    console.log('this state', this.state);
    return (
      <View style={{ backgroundColor: backgroundColor, flex: 1, margin: 20 }}>
        <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
          <Modal
            isOpen={show}
            position={'bottom'}
            onClosed={this.onClosed}
            backdropPressToClose
            coverScreen
            keyboardTopOffset={0}
            swipeToClose
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
          </Modal>
        </View>
      </View>
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
