import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { AppDrawerNavigator } from './DrawerConfig';
import { drawerRootListener } from '../../helpers/reduxHelpers.native';

class AppDrawerNavigatorContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    drawerNav: PropTypes.object.isRequired
  };

  render() {
    const { dispatch, drawerNav } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <AppDrawerNavigator
          navigation={addNavigationHelpers({
            dispatch,
            state: drawerNav,
            drawerRootListener
          })}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  drawerNav: state.drawerNav
});

export default connect(mapStateToProps)(AppDrawerNavigatorContainer);
