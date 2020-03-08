import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import Menu from '../../components/Menu';
import {
  currentUserProfileSelector,
  userTreecounterSelector,
  getCurrency
} from '../../selectors/index';
import { setCurrencyAction } from '../../actions/globalCurrency';
import { toggleSideNavAction } from '../../actions/setSideNavAction';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { clearSupport } from '../../actions/supportTreecounterAction';
// Actions
import { logoutUser } from '../../actions/authActions';
import { updateUserProfile } from '../../actions/updateUserProfile';
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
  UNSAFE_componentWillMount() {
    if (!this.props.navigation) {
      this.props.loggedIn
        ? AuthenticatedSideMenuSchema('web.main').subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => debug(error)
          )
        : PublicSideMenuSchema('web.main').subscribe(
            success => {
              if (success && success instanceof Array) {
                this.setState({ schema: success, loading: false });
              } else {
                debug('error in fetching side menu');
              }
            },
            error => debug(error)
          );
    } else {
      this.setState({ loading: false });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn !== this.props.loggedIn && !this.props.navigation) {
      nextProps.loggedIn
        ? AuthenticatedSideMenuSchema('web.main').subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => debug(error)
          )
        : PublicSideMenuSchema('web.main').subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => debug(error)
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
        {...this.props}
        menuData={this.state.schema}
        path={path}
        pathname={pathname}
      />
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.sideNav && state.sideNav.open,
  loggedIn: currentUserProfileSelector(state) !== null,
  userProfile: currentUserProfileSelector(state),
  lastRoute: state.lastRouteState.lastRoute,
  treecounter: userTreecounterSelector(state),
  preferredCurrency: getCurrency(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutUser,
      toggleSideNavAction,
      clearSupport,
      selectPlantProjectAction,
      setCurrencyAction,
      updateUserProfile
    },
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
  selectPlantProjectAction: PropTypes.func,
  clearSupport: PropTypes.func,
  treecounter: PropTypes.object,
  userProfile: PropTypes.any,
  lastRoute: PropTypes.any
};
