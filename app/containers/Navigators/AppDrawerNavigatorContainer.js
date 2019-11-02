/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getAppNavigator } from '../../components/Navigators/AppDrawerNavigator';
import { getAccessToken } from '../../utils/user';
import { loadTpos } from '../../actions/loadTposAction';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { currentUserProfileSelector } from '../../selectors';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import ProgressModal from '../../components/Common/ModalDialog/ProgressModal.native';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { fetchpledgeEventsAction } from '../../actions/pledgeEventsAction';
EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $primary: '#b9d384',
  $textColor: '#686060',
  $placeholderColor: '#e9e9e9',
  $colorPrimary: '#b7d37f',
  $colorPrimaryDark: '#b7d37f',
  $colorPrimaryAccent: '#e86f56',
  $colorPrimaryAccentLight: '#ec6453',
  $borderColor: '#aba2a2',
  $inputBorderColor: '#dad7d7',
  $backgroundScreen: '#f1f1f1',
  $colorError: '#ff0033',
  $colorRedeemBorder: '#9fc356',
  $colorRedeemInside: '#f5fbe8',
  $cardTextColor: '#686060',
  $lightTextColor: '#9c9b9b'
});

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
        (!nextProps.userProfile && !this.props.userProfile)) ||
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
  async componentWillMount() {
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    if (isLoggedIn) {
      this.setState({ loading: false, isLoggedIn: true });
    } else {
      let token = await getAccessToken();
      if (token) {
        this.props.loadUserProfile();
      } else {
        this.setState({ loading: false, isLoggedIn: false });
      }
    }
    this.props.fetchpledgeEventsAction();
  }
  componentWillReceiveProps(nextProps) {
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
          <ProgressModal />
        </View>
      );
    }
    return <LoadingIndicator />;
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
        loadTpos,
        fetchpledgeEventsAction
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AppDrawerNavigatorContainer
);
