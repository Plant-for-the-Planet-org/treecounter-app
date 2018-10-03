import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Redemption from '../../components/Redemption/index';
import { currentUserProfileSelector } from '../../selectors';
import { updateRoute } from '../../helpers/routerHelper';

class RedemptionContainer extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = {
      codeStatus: null,
      code: match.params.token,
      codeInfo: null,
      page_status: 'code-unknown'
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      // let isLoggedIn = null !== nextProps.userProfile;
      this.setState({ code: nextProps.match.params.token });
    }
  }
  validateCode = () => {
    console.log(this.refs.redemptionContainer.refs.redemptionForm.getValue());
    let value = this.refs.redemptionContainer.refs.redemptionForm.getValue();
    if (value) {
      updateRoute('app_giftRedemption', null, null, { token: value.code });
    }
  };
  render() {
    let isLoggedIn = this.props.userProfile ? true : false;
    return (
      <Redemption
        ref={'redemptionContainer'}
        code={this.state.code}
        page_status={this.state.page_status}
        code_info={this.state.codeInfo}
        codeStatus={this.state.codeStatus}
        updateRoute={this.props.route}
        isLoggedIn={this.props.userProfile}
        validateCode={this.validateCode}
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
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
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
  setRedemptionCode: PropTypes.func
};
