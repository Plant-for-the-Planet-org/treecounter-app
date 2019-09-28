/**
 * Root Component of both Android/iOS app
 * This component is just rendering App Drawer component which provides thr side navigation menu screen stack
 */

import React, { Component } from 'react';
//TODO import this first to avoid any init issue of i18n
import AppDrawerNavigatorContainer from '../../containers/Navigators/AppDrawerNavigatorContainer';
import { connect } from 'react-redux';
import { loadTpos } from '../../actions/loadTposAction';
import { bindActionCreators } from 'redux';
import { SafeAreaView } from 'react-navigation';
import { initLocale } from '../../actions/getLocale.native.js';

class App extends Component {
  componentDidMount() {
    initLocale();
    this.props.loadTpos();
  }
  render() {
    const backgroundColor = 'white';
    return (
      <SafeAreaView
        forceInset={{ top: 'never' }}
        style={{ flex: 1, backgroundColor: backgroundColor }}
      >
        <AppDrawerNavigatorContainer />
      </SafeAreaView>
    );
  }
}

// eslint-disable-next-line no-unused-vars
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
