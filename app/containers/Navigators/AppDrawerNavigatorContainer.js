/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getAppNavigator } from '../../components/Navigators/AppDrawerNavigator';
import { getAccessToken, getAuth0AccessToken } from '../../utils/user';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { currentUserProfileSelector } from '../../selectors';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { View } from 'react-native';
import { fetchpledgeEventsAction } from '../../actions/pledgeEventsAction';


class AppDrawerNavigatorContainer extends Component {
  _AppNavigator = undefined;
  constructor(props) {
    super(props);
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    this.state = {
      loading: true,
      isLoggedIn: isLoggedIn
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    //If there is no change in the user login state then don't re-render the component
    if (
      (nextState.loading === this.state.loading &&
        nextState.isLoggedIn === this.state.isLoggedIn &&
        !nextProps.userProfile &&
        !this.props.userProfile) ||
      (nextProps.userProfile &&
        this.props.userProfile &&
        nextProps.userProfile.id === this.props.userProfile.id)
    ) {
      return false;
    }
    // shouldComponentUpdate should be pure !!
    this._AppNavigator = getAppNavigator(
      nextState.isLoggedIn,
      nextProps.userProfile
    );
    return true;
  }
  async UNSAFE_componentWillMount() {
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    if (isLoggedIn) {
      this.setState({ loading: false, isLoggedIn: true });
    } else {
      let auth0Token = await getAuth0AccessToken();
      let token = await getAccessToken();
      if (auth0Token || token) {
        this.props.loadUserProfile().catch(() => {
          this.setState({ loading: false, isLoggedIn: false });
        });
      } else {
        this.setState({ loading: false, isLoggedIn: false });
      }
    }
    this.props.fetchpledgeEventsAction();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.userProfile !== this.props.userProfile) {
      let isLoggedIn = null !== nextProps.userProfile;
      if (isLoggedIn !== this.state.isLoggedIn) {
        this.setState({ loading: false, isLoggedIn: isLoggedIn });
      }
    }
  }
  render() {
    if (!this.state.loading) {
      if (!this._AppNavigator) {
        this._AppNavigator = getAppNavigator(
          this.state.isLoggedIn,
          this.props.userProfile
        );
      }

      return (
        <View style={{ flex: 1 }}>
          <this._AppNavigator />
        </View>
      );
    }
    return <LoadingIndicator contentLoader screen="worldLoader" />;
  }

  static propTypes = {
    dispatch: PropTypes.func,
    loadUserProfile: PropTypes.func,
    fetchpledgeEventsAction: PropTypes.func
  };
}

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
        fetchpledgeEventsAction
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawerNavigatorContainer);
