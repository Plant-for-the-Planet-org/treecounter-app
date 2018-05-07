import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { AppDrawerNavigator } from '../../components/Navigators/AppDrawerNavigator';
import { drawerRootListener as addListener } from '../../helpers/reduxHelpers.native';

class AppDrawerNavigatorContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    appDrawer: PropTypes.object.isRequired
  };

  render() {
    const { dispatch, appDrawer } = this.props;
    return (
      <AppDrawerNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: appDrawer,
          addListener
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  appDrawer: state.appDrawer
});

export default connect(mapStateToProps)(AppDrawerNavigatorContainer);
