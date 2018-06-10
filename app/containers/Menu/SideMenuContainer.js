import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Menu from '../../components/Menu';
import sideMenuData from '../../server/sidemenu';

// Actions
import { logoutUser } from '../../actions/authActions';

class SideMenuContainer extends Component {
  render() {
    let menuData = this.props.loggedIn
      ? sideMenuData.loggedIn
      : sideMenuData.loggedOut;
    return (
      <Menu
        isOpen={this.props.isOpen}
        menuData={menuData}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.sideNav && state.sideNav.open
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logoutUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer);

SideMenuContainer.propTypes = {
  isOpen: PropTypes.bool,
  loggedIn: PropTypes.bool,
  logoutUser: PropTypes.func.isRequired,
  navigation: PropTypes.any
};
