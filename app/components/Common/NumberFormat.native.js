import PropTypes from 'prop-types';
import { currentUserProfileSelector } from '../../selectors';
import { connect } from 'react-redux';
import { currenciesSelector, getCurrency } from '../../selectors';
import { getPreferredCurrency } from '../../actions/globalCurrency.native.js';
import { formatNumber } from '../../utils/utils';
import { context } from '../../config';

const NumberFormat = ({
  data,
  locale,
  currency,
  userProfile,
  currencies,
  globalCurrency,
  force,
  handleCurrencyChange
}) => {
  if (!userProfile) {
    userProfile = {
      // we use redux currency or use EUR if not found for now, dont use localstorage currency for now
      currency: globalCurrency.currency || getPreferredCurrency()
    };
  }

  if (force && currency) {
    // force use provided currency
    userProfile.currency = currency;
  }
  else if (handleCurrencyChange && currency && userProfile.currency && currency != userProfile.currency) {
    handleCurrencyChange(userProfile.currency);
  }
  return formatNumber(data, locale, currency, userProfile, currencies);
};

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state),
  currencies: currenciesSelector(state),
  globalCurrency: getCurrency(state)
});

NumberFormat.propTypes = {
  data: PropTypes.any.isRequired,
  locale: PropTypes.string,
  currency: PropTypes.any,
  userProfile: PropTypes.any,
  currencies: PropTypes.any,
  globalCurrency: PropTypes.any
};

export default connect(mapStateToProps)(NumberFormat);
