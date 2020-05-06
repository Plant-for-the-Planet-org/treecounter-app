import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { acceptChallenge } from '../../actions/challengeActions';
import RedirectedPrivateAcceptEmail from '../../components/Challenge/RedirectedPrivateAcceptEmail';

class RedirectedPrivateAcceptEmailContainer extends React.Component {
  render() {
    return (
      <RedirectedPrivateAcceptEmail
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

export default connect(null, mapDispatchToProps)(
  RedirectedPrivateAcceptEmailContainer
);

RedirectedPrivateAcceptEmailContainer.propTypes = {
  acceptChallenge: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};
