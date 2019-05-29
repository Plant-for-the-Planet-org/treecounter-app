import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Menu from '../../components/Menu';
import {
  currentUserProfileSelector,
  userTreecounterSelector
} from '../../selectors/index';
import { toggleSideNavAction } from '../../actions/setSideNavAction';
import { clearSupport } from '../../actions/supportTreecounterAction';

// Actions
import { logoutUser } from '../../actions/authActions';
import {
  PublicSideMenuSchema,
  AuthenticatedSideMenuSchema
} from '../../layouts/sideMenu';

class SideMenuContainer extends Component {
  constructor() {
    super();
    this.state = {
      schema: [],
      loading: true
    };
  }
  componentWillMount() {
    if (!this.props.navigation) {
      this.props.loggedIn
        ? AuthenticatedSideMenuSchema('web.main').subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => console.log(error)
          )
        : PublicSideMenuSchema('web.main').subscribe(
            success => {
              if (success && success instanceof Array) {
                this.setState({ schema: success, loading: false });
              } else {
                console.log('error in fetching side menu');
              }
            },
            error => console.log(error)
          );
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn !== this.props.loggedIn && !this.props.navigation) {
      nextProps.loggedIn
        ? AuthenticatedSideMenuSchema('web.main').subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => console.log(error)
          )
        : PublicSideMenuSchema('web.main').subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => console.log(error)
          );
    }
  }

  render() {
    let path = undefined;
    let pathname = undefined;

    if (this.props.location) {
      pathname = this.props.location.pathname;
      path = pathname.substr(pathname.lastIndexOf('/') + 1);
    }

    return this.state.loading ? null : (
      <Menu
        isOpen={this.props.isOpen}
        userProfile={this.props.userProfile}
        menuData={this.state.schema}
        navigation={this.props.navigation}
        treecounter={this.props.treecounter}
        path={path}
        toggleSideNavAction={this.props.toggleSideNavAction}
        clearSupport={this.props.clearSupport}
        logoutUser={this.props.logoutUser}
        pathname={pathname}
        lastRoute={this.props.lastRoute}
      />
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.sideNav && state.sideNav.open,
  loggedIn: currentUserProfileSelector(state) !== null,
  userProfile: currentUserProfileSelector(state),
  lastRoute: state.lastRouteState.lastRoute,
  treecounter: userTreecounterSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { logoutUser, toggleSideNavAction, clearSupport },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer);

SideMenuContainer.propTypes = {
  isOpen: PropTypes.bool,
  loggedIn: PropTypes.bool,
  logoutUser: PropTypes.func.isRequired,
  navigation: PropTypes.any,
  location: PropTypes.object,
  toggleSideNavAction: PropTypes.func.isRequired,
  clearSupport: PropTypes.func,
  treecounter: PropTypes.object,
  userProfile: PropTypes.any,
  lastRoute: PropTypes.any
};
