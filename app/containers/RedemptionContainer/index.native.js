import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Redemption from '../../components/Redemption/index.native';
import { currentUserProfileSelector } from '../../selectors';
import { updateRoute } from '../../helpers/routerHelper';
import {
  validateCodeAction,
  setRedemptionCodeAction
} from '../../actions/redemptionAction';

class RedemptionContainer extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const code = this.props.navigation.state.params.code
      ? this.props.navigation.state.params.code
      : '';
    const type = this.props.navigation.state.params.type
      ? this.props.navigation.state.params.type
      : '';
    return (
      <Redemption
        navigation={this.props.navigation}
        validateCodeAction={validateCodeAction}
        setRedemptionCode={this.props.setRedemptionCodeAction}
        code={code}
        type={type}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: currentUserProfileSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setRedemptionCodeAction,
      route: (routeName, id, params, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id, params)
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RedemptionContainer
);

RedemptionContainer.propTypes = {
  match: PropTypes.object,
  route: PropTypes.func,
  userProfile: PropTypes.object,
  setRedemptionCode: PropTypes.func,
  setAccessDenied: PropTypes.func,
  navigation: PropTypes.any,
  location: PropTypes.object
};
