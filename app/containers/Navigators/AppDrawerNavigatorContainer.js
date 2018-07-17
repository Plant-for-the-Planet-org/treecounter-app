import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { AppDrawerNavigator } from '../../components/Navigators/AppDrawerNavigator';
import { drawerRootListener as addListener } from '../../helpers/reduxHelpers.native';

class AppDrawerNavigatorContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    this.state = {
      isLoggedIn: isLoggedIn
    };
  }

  async componentWillMount() {
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    if (isLoggedIn) {
      this.setState({ isLoggedIn: true });
    } else {
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userProfile !== this.props.userProfile) {
      let isLoggedIn = null !== nextProps.userProfile;
      this.setState({ isLoggedIn: isLoggedIn });
    }
  }
  render() {
    // getDrawerNavigator;
    return <AppDrawerNavigator />;
  }
}

const mapStateToProps = state => ({
  appDrawer: state.appDrawer,
  userProfile: PropTypes.object
});

export default connect(mapStateToProps)(AppDrawerNavigatorContainer);
