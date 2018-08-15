import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getDrawerNavigator } from '../../components/Navigators/AppDrawerNavigator';
import { getAccessToken } from '../../utils/user';
import { loadTpos } from '../../actions/loadTposAction';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { currentUserProfileSelector } from '../../selectors';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class AppDrawerNavigatorContainer extends Component {
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
      const AppDrawerNavigator = getDrawerNavigator(this.state.isLoggedIn);
      return <AppDrawerNavigator />;
    }
    return <LoadingIndicator />;
  }

  static propTypes = {
    dispatch: PropTypes.func,
    loadUserProfile: PropTypes.func
  };
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    appDrawer: state.appDrawer,
    userProfile: currentUserProfileSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadUserProfile,
      loadTpos
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AppDrawerNavigatorContainer
);
