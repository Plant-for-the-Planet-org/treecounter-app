import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Menu from '../../components/Menu/index';

// Actions
import * as Sidebar from '../../actions/menuAction';
import { logoutUser } from '../../actions/authActions';

class SideMenuContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchAndSetMenuState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn && this.props.loggedIn)
      this.fetchAndSetMenuState();
  }

  fetchAndSetMenuState() {
    Sidebar.MenuAction(this.props.loggedIn)
      .then(({ data }) => {
        this.setState({ data: data });
        console.log('Recieved data for menu- ', data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log('OOPS! JWT Token Expired');
          this.props.logoutUser();
        }
      });
  }
  render() {
    console.log('Menu object', this.state.data);
    return <Menu isOpen={this.props.isOpen} menuData={this.state.data} />;
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
  logoutUser: PropTypes.func.isRequired
};
