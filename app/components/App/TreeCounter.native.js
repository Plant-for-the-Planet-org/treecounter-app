/**
 * Root Component of both Android/iOS app
 * This component is just rendering App Drawer component which provides thr side navigation menu screen stack
 */

import React, { Component } from 'react';
import AppDrawerNavigatorContainer from '../../containers/Navigators/AppDrawerNavigatorContainer';

export default class App extends Component {
  render() {
    return <AppDrawerNavigatorContainer />;
  }
}
