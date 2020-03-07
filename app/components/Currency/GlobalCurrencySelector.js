import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
// import i18n from '../../locales/i18n.js';
import { currencySort } from './utils';
import { currenciesSelector } from '../../selectors';
import { fetchCurrencies } from '../../actions/currencies';
import {
  getPreferredCurrency,
  setCurrencyAction
} from '../../actions/globalCurrency';

const customStyles = {
  control: () => ({
    // none of react-select's styles are passed to <Control />
    display: 'flex',
    width: '100%',
    cursor: 'pointer'
  }),
  container: provided => ({
    ...provided,
    width: '100%',
    display: 'flex',
    cursor: 'pointer'
  }),
  menu: provided => ({
    ...provided,
    width: '100%',
    cursor: 'pointer',
    fontSize: '17px'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  indicatorsContainer: provided => {
    return {
      ...provided,
      padding: '0px'
    };
  },
  dropdownIndicator: provided => ({
    ...provided,
    paddingLeft: '0px'
  }),
  option: provided => ({
    ...provided,
    cursor: 'pointer'
  }),
  singleValue: (provided /* , state */) => {
    return {
      ...provided,
      border: 0,
      width: '100%',
      display: 'flex',
      marginLeft: 0,
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '17px'
    };
  },
  valueContainer: provided => {
    return { ...provided, paddingLeft: '4px' };
  }
};

class GlobalCurrencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferredCurrency: ''
    };
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  async UNSAFE_componentWillReceiveProps(nextProps) {
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
  async UNSAFE_componentWillMount() {
    this.setState({ preferredCurrency: getPreferredCurrency() });
  }
  async componentDidMount() {
    if (!this.props.currencies.currencies) {
      let curreniesData = await this.props.fetchCurrencies();
      debug('got fron fetch', curreniesData);
    }
    debug('setting', this.state);
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
          return { value: currency, label: currency };
        })
      : [
          {
            value: this.state.preferredCurrency,
            label: this.state.preferredCurrency
          }
        ];
  }
  handleCurrencyChange(selectedOption) {
    debug(selectedOption);
    this.updateState({ preferredCurrency: selectedOption.value });
    this.props.setCurrencyAction(selectedOption.value);
    this.props.userProfile &&
      this.props.updateUserProfile(
        { currency: selectedOption.value },
        'currency'
      );
  }
  render() {
    const currenciesArray = this.getCurrencyNames();
    return (
      <div className="global-selector currency">
        <div className="li-select">
          <Select
            defaultValue={{
              value: this.state.preferredCurrency,
              label: this.state.preferredCurrency
            }}
            value={{
              value: this.state.preferredCurrency,
              label: this.state.preferredCurrency
            }}
            menuPlacement="top"
            styles={customStyles}
            onChange={this.handleCurrencyChange}
            isSearchable={false}
            options={currenciesArray}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalCurrencySelector);
GlobalCurrencySelector.propTypes = {
  currencies: PropTypes.object,
  updateUserProfile: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  userProfile: PropTypes.object,
  setCurrencyAction: PropTypes.func
};
