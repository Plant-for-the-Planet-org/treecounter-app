import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AppHeader from '../../components/AppHeader';

// Actions
import { logoutUser } from '../../actions/authActions';
import { currentUserProfileSelector } from '../../selectors/index';

class AppHeaderContainer extends React.Component {
  render() {
    return (
      <AppHeader
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

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);

AppHeaderContainer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  userProfile: PropTypes.object
};
