import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import SuccessfullyActivatedAccount from '../../components/Authentication/SuccessfullyActivated';
import { accountActivate } from '../../actions/signupActions';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import connect from 'react-redux/es/connect/connect';

class SuccessfullyActivatedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
  }

  componentWillMount() {
    this.props
      .accountActivate(this.props.match.params.token)
      .then(res => {
        console.log('in container');
        this.setState({ success: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ success: false });
      });
  }
  render() {
    console.log(this.state);
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
  accountActivate: PropTypes.any
};
