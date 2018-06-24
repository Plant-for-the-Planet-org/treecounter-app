import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Menu from '../../components/Menu';
import { currentUserProfileSelector } from '../../selectors/index';
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
      schema: {},
      loading: true
    };
  }
  componentDidMount() {
    this.props.loggedIn
      ? AuthenticatedSideMenuSchema.subscribe(
          success => this.setState({ schema: success, loading: false }),
          error => console.log(error)
        )
      : PublicSideMenuSchema.subscribe(
          success => this.setState({ schema: success, loading: false }),
          error => console.log(error)
        );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn !== this.props.loggedIn) {
      nextProps.loggedIn
        ? AuthenticatedSideMenuSchema.subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => console.log(error)
          )
        : PublicSideMenuSchema.subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => console.log(error)
          );
    }
  }

  render() {
    let { pathname } = this.props.location;
    let path = pathname.substr(pathname.lastIndexOf('/') + 1);
    return this.state.loading ? null : (
      <Menu
        isOpen={this.props.isOpen}
        menuData={this.state.schema}
        navigation={this.props.navigation}
        path={path}
        toggleSideNavAction={this.props.toggleSideNavAction}
        clearSupport={this.props.clearSupport}
      />
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.sideNav && state.sideNav.open,
  loggedIn: currentUserProfileSelector(state) !== null
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
  clearSupport: PropTypes.func
};
