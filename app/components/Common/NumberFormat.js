import PropTypes from 'prop-types';
import { currentUserProfileSelector } from '../../selectors';
import { connect } from 'react-redux';
import { formatNumber } from '../../utils/utils';

const NumberFormat = ({ data, locale, currency }) => {
  return formatNumber(data, locale, currency);
};

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state)
});

NumberFormat.propTypes = {
  data: PropTypes.any.isRequired,
  locale: PropTypes.string,
  currency: PropTypes.any,
  userProfile: PropTypes.any
};

export default connect(mapStateToProps)(NumberFormat);
