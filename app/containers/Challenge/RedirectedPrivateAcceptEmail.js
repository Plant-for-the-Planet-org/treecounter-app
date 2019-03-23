import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { acceptChallenge } from '../../actions/challengeActions';
import RedirectedEmail from '../../components/Challenge/RedirectedPublicDenyEmail';

class RedirectedPrivateAcceptEmailContainer extends React.Component {
  render() {
    return (
      <RedirectedEmail
        acceptChallenge={this.props.acceptChallenge.bind(
          this,
          this.props.match.params.token
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      acceptChallenge
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(RedirectedEmailContainer);

RedirectedPrivateAcceptEmailContainer.propTypes = {
  acceptChallenge: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};
