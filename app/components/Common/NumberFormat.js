import React from 'react';
import PropTypes from 'prop-types';
import { currentUserProfileSelector } from '../../selectors';
import { connect } from 'react-redux';
import { currenciesSelector } from '../../selectors';
import { getPreferredCurrency } from '../../actions/globalCurrency';
import { formatNumber } from '../../utils/utils';
const NumberFormat = ({ data, locale, currency, userProfile, currencies }) => {
  if (!userProfile) {
    userProfile = { currency: getPreferredCurrency() };
  }
  return formatNumber(data, locale, currency, userProfile, currencies);
};

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state),
  currencies: currenciesSelector(state)
});

NumberFormat.propTypes = {
  data: PropTypes.any.isRequired,
  locale: PropTypes.string,
  currency: PropTypes.any,
  userProfile: PropTypes.any,
  currencies: PropTypes.any
};

export default connect(mapStateToProps)(NumberFormat);
