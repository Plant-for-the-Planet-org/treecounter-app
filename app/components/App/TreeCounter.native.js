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
import { fetchCurrencies } from '../../actions/currencies';
class App extends Component {
  componentDidMount() {
    initLocale();
    this.props.fetchCurrencies();
    // TODO: at this time the locale isn't yet defined, so this API call is currently done with locale = undefined
    // Is there any way to wait with this API call until the locale is defined?
    this.props.loadTpos();
  }
  render() {
    const backgroundColor = 'white';
    return (
      <SafeAreaView
        forceInset={{ top: 'never', bottom: 'always' }}
        style={{ flex: 1, backgroundColor: backgroundColor }}
      >
        <AppDrawerNavigatorContainer />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (/* state */) => ({
  // userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCurrencies,
      // loadUserProfile,
      // NotificationAction,
      loadTpos
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
