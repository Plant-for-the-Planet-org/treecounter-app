/**
 * Root Component of both Android/iOS app
 * This component is just rendering App Drawer component which provides thr side navigation menu screen stack
 */

import React, { Component } from 'react';
import AppDrawerNavigatorContainer from '../../containers/Navigators/AppDrawerNavigatorContainer';
import { connect } from 'react-redux';
import { loadTpos } from '../../actions/loadTposAction';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentDidMount() {
    this.props.loadTpos();
  }
  render() {
    return <AppDrawerNavigatorContainer />;
  }
}

const mapStateToProps = state => ({
  // userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // loadUserProfile,
      // NotificationAction,
      loadTpos
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
