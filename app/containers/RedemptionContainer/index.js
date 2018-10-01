import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import Redemption from '../../components/Redemption/index';
import { currentUserProfileSelector } from '../../selectors';
import { getAccessToken } from '../../utils/user';
import { updateRoute } from '../../helpers/routerHelper';

class RedemptionContainer extends Component {
  constructor(props) {
    super(props);
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    this.state = {
      code: this.props.match.params.token,
      isLoggedIn: isLoggedIn,
      codeStatus: null,
      codeInfo: null,
      page_status: 'code-unknown'
    };
  }

  async componentWillMount() {
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    if (isLoggedIn) {
      this.setState({ isLoggedIn: true });
    } else {
      let token = await getAccessToken();
      if (token) {
        this.props.loadUserProfile();
      } else {
        this.setState({ isLoggedIn: false });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userProfile !== this.props.userProfile) {
      let isLoggedIn = null !== nextProps.userProfile;
      this.setState({ isLoggedIn: isLoggedIn });
    }
  }
  validateCode(data) {
    updateRoute('app_redemption', null, null, { token: data });
  }
  render() {
    return (
      <Redemption
        code={this.props.match.params.token}
        page_status={this.state.page_status}
        code_info={this.state.codeInfo}
        codeStatus={this.state.codeStatus}
        updateRoute={this.props.route}
        isLoggedIn={this.state.isLoggedIn}
        validateCode={data => this.validateCode(data)}
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
      loadUserProfile,
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RedemptionContainer
);

RedemptionContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }),
  route: PropTypes.func,
  userProfile: PropTypes.object,
  loadUserProfile: PropTypes.func,
  setRedemptionCode: PropTypes.func
};
