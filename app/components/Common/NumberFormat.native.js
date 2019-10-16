import PropTypes from 'prop-types';
import { currentUserProfileSelector } from '../../selectors';
import { connect } from 'react-redux';
import { currenciesSelector, getCurrency } from '../../selectors';
import { formatNumber } from '../../utils/utils';

const NumberFormat = ({
  data,
  locale,
  currency,
  userProfile,
  currencies
  // globalCurrency
}) => {
  if (!userProfile && currency) {
    userProfile = {
      currency: currency
    };
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
