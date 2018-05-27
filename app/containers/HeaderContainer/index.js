import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

// Actions
import { logoutUser } from '../../actions/authActions';
import { currentUserProfileSelector } from '../../selectors/index';

class HeaderContainer extends React.Component {
  render() {
    return (
      <Header
        userProfile={this.props.userProfile}
        logoutUser={this.props.logoutUser}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutUser
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

HeaderContainer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  userProfile: PropTypes.object
};
