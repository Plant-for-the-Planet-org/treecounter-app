import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

const Header = lazy(() => import('../../components/Header'));

// Actions
import { logoutUser } from '../../actions/authActions';
import {
  moreNotificationAction,
  markSeenNotificationAction
} from '../../actions/notificationAction';

import { updateProfileDedication } from '../../actions/updateUserProfile';
import {
  currentUserProfileSelector,
  userFeedsSelector
} from '../../selectors/index';
import { updateRoute } from '../../helpers/routerHelper';

class HeaderContainer extends React.Component {
  render() {
    return (
      <Header
        userProfile={this.props.userProfile}
        logoutUser={this.props.logoutUser}
        updateRoute={this.props.route}
        userFeeds={this.props.userFeeds}
        fetchMoreNotifications={this.props.moreNotificationAction}
        markSeenNotificationAction={this.props.markSeenNotificationAction}
        updateProfileDedication={this.props.updateProfileDedication}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutUser,
      moreNotificationAction,
      markSeenNotificationAction,
      updateProfileDedication,
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state),
  userFeeds: userFeedsSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

HeaderContainer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  route: PropTypes.func,
  moreNotificationAction: PropTypes.func,
  markSeenNotificationAction: PropTypes.func,
  userProfile: PropTypes.object,
  userFeeds: PropTypes.object,
  updateProfileDedication: PropTypes.func
};
