import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import i18n from '../../locales/i18n.js';
import { currencySort } from './utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currenciesSelector } from '../../selectors';
import { fetchCurrencies } from '../../actions/currencies';
import {
  getPreferredCurrency,
  setPreferredCurrency
} from '../../actions/globalCurrency';

import { updateUserProfile } from '../../actions/updateUserProfile';
import { ProfilePic } from '../../assets';

class GlobalCurrencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferredCurrency: ''
    };
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  async componentWillMount() {
    this.setState({ preferredCurrency: getPreferredCurrency() });
  }
  async componentDidMount() {
    if (!this.props.currencies.currencies) {
      this.props.fetchCurrencies();
    }
  }
  updateState(data) {
    this.setState(data);
  }
  getCurrencyNames() {
    return this.props.currencies.currencies
      ? currencySort(
          Object.keys(this.props.currencies.currencies.currency_names)
        )
      : [];
  }
  handleCurrencyChange({ target: { value } } = event) {
    this.updateState({ preferredCurrency: value });
    setPreferredCurrency(value);
    this.props.userProfile &&
      this.props.updateUserProfile({ currency: value }, 'currency');
  }
  render() {
    const currenciesArray = this.getCurrencyNames();
    return (
      <div className="global-selector currency">
        <div>
          <select
            onChange={this.handleCurrencyChange}
            value={this.state.preferredCurrency}
          >
            {currenciesArray.map(value => {
              return (
                <option value={value} key={value}>
                  {value}
                </option>
              );
            })}
          </select>
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
      updateUserProfile
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GlobalCurrencySelector
);
GlobalCurrencySelector.propTypes = {
  currencies: PropTypes.object,
  updateUserProfile: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  userProfile: PropTypes.object
};
