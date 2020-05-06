import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import { currentUserProfileSelector } from '../../selectors';
import { toggleSideNavAction } from '../../actions/setSideNavAction';
import { clearSupport } from '../../actions/supportTreecounterAction';
import { saveItem, fetchItem } from '../../stores/localStorage.native';
import Constants from '../../utils/const';
import {
  PublicSideMenuSchema,
  AuthenticatedSideMenuSchema
} from '../../layouts/sideMenu';
import TabComponent from '../../components/Menu/Tabcomponent';

class BottomTabContainer extends Component {
  constructor() {
    super();
    this.state = {
      schema: [],
      loading: true
    };
  }
  componentDidMount() {
    const isLoggedin = this.props.loggedIn;
    fetchItem(
      isLoggedin
        ? Constants.storageKeys.AuthenticatedSideMenuSchema
        : Constants.storageKeys.PublicSideMenuSchema
    ).then(data => {
      if (data) {
        try {
          this.setState({ schema: JSON.parse(data) });
        } catch (err) {
          debug(err);
        }
      }
    })
    .catch(error => debug(error));
    isLoggedin
      ? AuthenticatedSideMenuSchema('mobile.bottom').subscribe(
          success => {
            this.setState({ schema: success[0].menuItems, loading: false }),
              saveItem(
                Constants.storageKeys.AuthenticatedSideMenuSchema,
                JSON.stringify(success[0].menuItems)
              );
          },
          error => debug(error)
        )
      : PublicSideMenuSchema('mobile.bottom').subscribe(
          success => {
            if (success && success instanceof Array) {
              this.setState({ schema: success[0].menuItems, loading: false });
              saveItem(
                Constants.storageKeys.PublicSideMenuSchema,
                JSON.stringify(success[0].menuItems)
              );
            } else {
              debug('error in fetching side menu');
            }
          },
          error => debug(error)
        );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn !== this.props.loggedIn) {
      nextProps.loggedIn
        ? AuthenticatedSideMenuSchema('mobile.bottom').subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => debug(error)
          )
        : PublicSideMenuSchema('mobile.bottom').subscribe(
            success => this.setState({ schema: success, loading: false }),
            error => debug(error)
          );
    }
  }

  render() {
    return this.state.loading && this.state.schema.length == 0 ? null : (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flex: 1,
          width: '100%',
          borderTopColor: '#ecf0f1',
          borderTopWidth: 1
        }}
      >
        <TabComponent
          userProfile={this.props.userProfile}
          menuData={this.state.schema}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.sideNav && state.sideNav.open,
  loggedIn: currentUserProfileSelector(state) !== null,
  userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleSideNavAction, clearSupport }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabContainer);

BottomTabContainer.propTypes = {
  loggedIn: PropTypes.bool,
  navigation: PropTypes.any,
  userProfile: PropTypes.any
};
