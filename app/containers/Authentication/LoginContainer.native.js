/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getAppNavigator } from '../../components/Navigators/AppDrawerNavigator';
import { getAccessToken } from '../../utils/user';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { currentUserProfileSelector } from '../../selectors';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { View } from 'react-native';
import { fetchpledgeEventsAction } from '../../actions/pledgeEventsAction';
import { auth0Login, auth0Logout, userLogout } from '../../actions/auth0Actions';
import { updateRoute } from '../../helpers/routerHelper';
import { logoutUser } from '../../actions/authActions';

function LoginContainer(props) {
  const [loading, setLoading] = React.useState(true);
  const [userProfile, setUserProfile] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [fetchUserProfile, setFetchUserProfile] = React.useState(false);

  React.useEffect(() => {
    // If user profile is already there and mode is not equal to logout do not perform the steps 
    if (props.navigation && !fetchUserProfile) {
      let mode = props.navigation.getParam('mode', 'login');
      if (mode) {
        if (mode === 'signup') {
          auth0Login(true).then((res) => {
            updateRoute('app_signup', props.navigation);
          })
        }
        else if (mode === 'logout') {
          auth0Logout().then((res) => {
            props.logoutUser();
            updateRoute('app_homepage', props.navigation);
          })
        }
        else {
          auth0Login(false).then((res) => {
            setFetchUserProfile(true)
          })
        }
      }
    }
  }, [props.navigation])

  React.useEffect(() => {
    async function loadState() {
      // If user profile is present store it in the state and set isLoggedIn as true.
      if (props.userProfile) {
        setUserProfile(props.userProfile)
        setIsLoggedIn(true);
        setLoading(false)
      }
      else {
        let token = await getAccessToken();
        if (token) {
          props.loadUserProfile();
        } else {
          setLoading(false);
          setIsLoggedIn(false);
          updateRoute('app_homepage', props.navigation);
        }
      }
    }
    if (fetchUserProfile) {
      loadState();
    }
  }, [props.userProfile, fetchUserProfile]);

  const white = '#fff';

  let AppNavigator;
  if (!loading && !AppNavigator) {
    AppNavigator = getAppNavigator(
      isLoggedIn,
      userProfile
    );
  }


  return !loading ? AppNavigator ? <AppNavigator /> :
    (
      <View style={{ flex: 1, backgroundColor: white }}>
        <LoadingIndicator contentLoader screen="worldLoader" />
      </View>
    ) : (
      <View style={{ flex: 1, backgroundColor: white }}>
        <LoadingIndicator contentLoader screen="worldLoader" />
      </View>
    )
}

LoginContainer.propTypes = {
  dispatch: PropTypes.func,
  loadUserProfile: PropTypes.func,
  logoutUser: PropTypes.func.isRequired,
  fetchpledgeEventsAction: PropTypes.func
};

const mapStateToProps = state => {
  return {
    appDrawer: state.appDrawer,
    userProfile: currentUserProfileSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators(
      {
        loadUserProfile,
        fetchpledgeEventsAction,
        logoutUser
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
