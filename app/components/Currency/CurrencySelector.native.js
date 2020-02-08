import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import i18n from '../../locales/i18n';
import { connect } from 'react-redux';
import { getCurrency } from '../../selectors';
import { Dropdown } from 'react-native-material-dropdown';
import { currencySort } from './utils';
import { currentUserProfileSelector } from '../../selectors/index';
import { bindActionCreators } from 'redux';
import { setCurrencyAction } from '../../actions/globalCurrency';
class CurrencySelector extends React.PureComponent {
  constructor(props) {
    super(props);
    let { selectedCurrency, globalCurrency } = props;
    this.state = {
      selectedCurrency:
        (globalCurrency && globalCurrency.currency) || selectedCurrency
    };
  }
  componentDidMount() {
    if (this.props.globalCurrency) {
      this.setState(
        { selectedCurrency: this.props.globalCurrency.currency },
        () => {
          this.props.onChange(this.state.selectedCurrency);
        }
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('next props currency', nextProps);
    if (
      nextProps.globalCurrency &&
      nextProps.globalCurrency.currency !== this.state.selectedCurrency
    ) {
      this.setState({ selectedCurrency: nextProps.globalCurrency.currency });
      this.props.onChange(nextProps.globalCurrency.currency);
    }
    // if (nextProps.userProfile &&
    //   nextProps.userProfile.currency) {
    //   this.setState({ preferredCurrency: nextProps.userProfile.currency });
    //   this.props.setCurrencyAction(nextProps.userProfile.currency);
    //   this.props.onChange(nextProps.userProfile.currency);
    // }
  }
  render() {
    const { currencies } = this.props;
    const { selectedCurrency } = this.state;
    const currenciesArray = currencySort(Object.keys(currencies));

    const currenciesDropdownFormat = currenciesArray.map(item => {
      return { value: item, text: currencies[item] };
    });
    const textColor = '#686060';
    return (
      <Dropdown
        containerStyle={{
          width: '100%',
          marginLeft: 10,
          marginBottom: 10,
          paddingRight: 10,
          elevation: 2
        }}
        pickerStyle={{
          position: 'absolute',
          maxHeight: Dimensions.get('window').height
            ? Dimensions.get('window').height - 160
            : 400,
          top: 160,
          zIndex: 60
        }}
        itemCount={10}
        dropdownPosition={1}
        animationDuration={0}
        itemTextStyle={{
          fontSize: 13,
          color: textColor
        }}
        initialNumToRender={currenciesDropdownFormat.length}
        value={i18n.t(selectedCurrency)}
        textColor="rgba(104,96,96, 0.8)"
        selectedItemColor="rgba(104,96,96, 0.8)"
        labelExtractor={item => i18n.t(item.text)}
        valueExtractor={item => item.value}
        onChangeText={item => this.props.onChange(item)}
        data={currenciesDropdownFormat}
      />
    );
  }
}

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  globalCurrency: getCurrency(state),
  userProfile: currentUserProfileSelector(state)
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCurrencyAction
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
