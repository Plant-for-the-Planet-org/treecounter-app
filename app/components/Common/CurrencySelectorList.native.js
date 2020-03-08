/* eslint-disable react-native/no-color-literals */
import React, { Component } from 'react';
// import t from 'tcomb-form-native';
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Platform
} from 'react-native';
import Modal from 'react-native-modalbox';
import { currentUserProfileSelector, getCurrency } from '../../selectors/index';
import i18n from '../../locales/i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableItem from '../../components/Common/TouchableItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currencySort } from '../../utils/currency';
import { currenciesSelector } from '../../selectors';
import { fetchCurrencies } from '../../actions/currencies';
import { getCountryFlagImageUrl } from '../../actions/apiRouting';
import countryCodes from '../../assets/countryCodes.json';
import { setCurrencyAction } from '../../actions/globalCurrency';
import { updateUserProfile } from '../../actions/updateUserProfile';
import { ScrollView } from 'react-native-gesture-handler';
import { getProgressModelState } from '../../reducers/modelDialogReducer';

const backgroundColor = '#e4e4e4';
const activeColor = '#74ba00';
const defaultColor = '#4d5153';

const Loader = () => {
  return (
    <>
      <View style={[styles.loaderContainer]} />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2
        }}
      >
        <View
          style={[
            styles.loaderContent,
            { paddingVertical: 30, paddingHorizontal: 10 }
          ]}
        >
          <ActivityIndicator size={80} color={activeColor} />
          <Text
            style={{
              color: '#4D5153',
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 18,
              marginTop: 30,
              textAlign: 'center'
            }}
          >
            Setting up your default currency
          </Text>
        </View>
      </View>
    </>
  );
};

class CurrencySelectorList extends Component {
  state = {
    focus: 0,
    search: '',
    preferredCurrency: this.props.selectedCurrency
      ? this.props.selectedCurrency
      : this.props.globalCurrency.currency,
    show: this.props.show
  };
  // componentWillReceiveProps(nextProps) {
  //   if (
  //     // nextProps.selectedCurrency &&
  //     this.state.preferredCurrency !== nextProps.selectedCurrency
  //   ) {
  //     this.setState({ preferredCurrency: nextProps.selectedCurrency });
  //   } else if (
  //     this.state.preferredCurrency !== nextProps.globalCurrency.currency
  //   ) {
  //     this.setState({ preferredCurrency: nextProps.globalCurrency.currency });
  //   } else if (
  //     !nextProps.userProfile &&
  //     this.state.preferredCurrency != nextProps.globalCurrency.currency
  //   ) {
  //     //this.state.preferredCurrency && this.props.setCurrencyAction(this.state.preferredCurrency);
  //   }
  //   // {
  //   //   nextProps.userProfile &&
  //   //     nextProps.userProfile.currency &&
  //   //     this.setState({ preferredCurrency: nextProps.userProfile.currency }) &&
  //   //     this.props.setCurrencyAction(nextProps.userProfile.currency);
  //   // }

  //   if (!nextProps.currencies.currencies) {
  //     this.props.fetchCurrencies();
  //   }
  // }
  // async componentWillMount() {
  //   // this.setState({ preferredCurrency: getPreferredCurrency() });
  //   this.props.userProfile &&
  //     this.props.userProfile.currency &&
  //     this.setState({ preferredCurrency: this.props.userProfile.currency }) &&
  //     this.props.setCurrencyAction(this.props.userProfile.currency);
  // }
  async componentDidMount() {
    if (!this.props.currencies.currencies) {
      await this.props.fetchCurrencies();
    }
    if (!this.state.preferredCurrency && this.props.selectedCurrency) {
      this.setState({ preferredCurrency: this.props.selectedCurrency });
    } else if (
      !this.state.preferredCurrency &&
      this.props.globalCurrency.currency
    ) {
      this.setState({ preferredCurrency: this.props.globalCurrency.currency });
    }
    this.state.preferredCurrency &&
      this.props.setCurrencyAction(this.state.preferredCurrency);
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
  setSearch = (text = '') => {
    this.state.search !== text && this.setState({ search: text });
  };
  handleCurrencyChange = selectedOption => {
    this.setState({ preferredCurrency: selectedOption });
    this.props.handleCurrencyChange(selectedOption);
    // this.props.setCurrencyAction(selectedOption);
    // this.props.userProfile &&
    //   this.props.updateUserProfile({ currency: selectedOption }, 'currency');
  };
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
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12
          }}
        >
          <Image
            source={{
              uri: getCountryFlagImageUrl(
                this.getCountryCode(currency).currencyCountryFlag,
                'png',
                256
              )
            }}
            style={{ width: 16, height: 10 }}
          />
          <Text
            style={{
              width: 70,
              paddingLeft: 20,
              fontFamily: 'OpenSans-Bold',
              fontSize: 16,
              lineHeight: 22,
              color: this.isActive(currency) ? activeColor : defaultColor
            }}
          >
            {currency.value}
          </Text>
          <Text
            style={{
              paddingLeft: 12,
              lineHeight: 22,
              flex: 1,
              fontFamily: 'OpenSans-Regular',
              fontSize: 16,
              color: this.isActive(currency) ? activeColor : defaultColor
            }}
          >
            {currency.label}
          </Text>
          {this.isActive(currency) && (
            <Icon
              name="done"
              size={24}
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
        {this.props.progressModelState ? <Loader /> : null}
        <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              paddingHorizontal: 24
            }}
          >
            <View
              style={{
                opacity: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Platform.OS === 'ios' ? 54 : 20,
                marginBottom: 20
              }}
            >
              <TouchableItem onPress={this.onClosed}>
                <Icon name="close" size={30} color="#4d5153" />
              </TouchableItem>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: '#4d5153',
                  borderRadius: 20,
                  marginLeft: 20
                }}
              >
                <TextInput
                  style={{ height: 40, width: '84%' }}
                  onChangeText={text => {
                    this.setSearch(text);
                  }}
                  value={this.state.search}
                  placeholder={'Search'}
                  placeholderTextColor={'#4d5153'}
                  fontFamily="OpenSans-SemiBold"
                />
                <TouchableItem
                  style={{
                    width: 30
                  }}
                  onPress={() => {
                    this.setSearch();
                  }}
                >
                  {this.state.search ? (
                    <Icon name="close" size={24} color="#4d5153" />
                  ) : null}
                </TouchableItem>
              </View>
            </View>
            <ScrollView>
              <View>
                {this.state.search ? null : (
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: 16,
                      color: defaultColor,
                      marginTop: 20,
                      marginBottom: 10
                    }}
                  >
                    {i18n.t('label.featured_currencies')}
                  </Text>
                )}
                <FlatList
                  data={currenciesArray.slice(0, 2)}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
                />
              </View>
              <View>
                {this.state.search ? null : (
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: 16,
                      color: defaultColor,
                      marginTop: 12,
                      marginBottom: 10
                    }}
                  >
                    {i18n.t('label.all_currencies')}
                  </Text>
                )}
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
    currencies: currenciesSelector(state),
    progressModelState: getProgressModelState(state)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySelectorList);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    opacity: 0.8,
    zIndex: 1,
    ...StyleSheet.absoluteFillObject
  },
  loaderContent: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: 240
  }
});
