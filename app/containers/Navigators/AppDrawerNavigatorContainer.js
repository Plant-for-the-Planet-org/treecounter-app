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
import ProgressModal from '../../components/Common/ModalDialog/ProgressModal.native';
import { View } from 'react-native';

class AppDrawerNavigatorContainer extends Component {
  _AppDrawerNavigator = undefined;
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
      this.props.progressModel === nextProps.progressModel &&
      ((nextState.loading === this.state.loading &&
        nextState.isLoggedIn === this.state.isLoggedIn &&
        (!nextProps.userProfile && !this.props.userProfile)) ||
        (nextProps.userProfile &&
          this.props.userProfile &&
          nextProps.userProfile.id === this.props.userProfile.id))
    ) {
      return false;
    }
    if (this.props.progressModel === nextProps.progressModel) {
      this._AppDrawerNavigator = getDrawerNavigator(nextState.isLoggedIn);
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
      if (!this._AppDrawerNavigator) {
        this._AppDrawerNavigator = getDrawerNavigator(this.state.isLoggedIn);
      }

      return (
        <View style={{ flex: 1 }}>
          <this._AppDrawerNavigator />
          {this.props.progressModel ? <ProgressModal modalVisible /> : null}
        </View>
      );
    }
    return <LoadingIndicator />;
  }

  static propTypes = {
    dispatch: PropTypes.func,
    loadUserProfile: PropTypes.func,
    progressModel: PropTypes.bool
  };
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    appDrawer: state.appDrawer,
    userProfile: currentUserProfileSelector(state),
    progressModel: state.modelDialogState.progressModel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators(
      {
        loadUserProfile,
        loadTpos
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AppDrawerNavigatorContainer
);
