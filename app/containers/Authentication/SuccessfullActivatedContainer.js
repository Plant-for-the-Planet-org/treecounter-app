import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import SuccessfullyActivatedAccount from '../../components/Authentication/SuccessfullyActivated';
import { accountActivate } from '../../actions/signupActions';
// eslint-disable-next-line no-unused-vars
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { connect } from 'react-redux';

class SuccessfullyActivatedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
  }

  componentWillMount() {
    if (
      this.props.navigation
        ? this.props.navigation.getParam('token')
        : this.props.match.params.token
    ) {
      this.props
        .accountActivate(
          this.props.navigation
            ? this.props.navigation.getParam('token')
            : this.props.match.params.token
        )
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.setState({ success: true });
        })
        .catch(err => {
          console.log(err);
          this.setState({ success: false });
        });
    } else {
      this.setState({ success: true });
    }
  }
  render() {
    return <SuccessfullyActivatedAccount success={this.state.success} />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      accountActivate
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(
  SuccessfullyActivatedContainer
);

SuccessfullyActivatedContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired,
  accountActivate: PropTypes.any,
  navigation: PropTypes.any
};
