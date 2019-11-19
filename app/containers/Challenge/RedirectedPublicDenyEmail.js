import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { denyChallenge } from '../../actions/challengeActions';

const RedirectedPublicDenyEmail = lazy(() =>
  import('../../components/Challenge/RedirectedPublicDenyEmail')
);

class RedirectedPublicDenyEmailContainer extends React.Component {
  render() {
    return (
      <RedirectedPublicDenyEmail
        denyChallenge={this.props.denyChallenge.bind(
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
      denyChallenge
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(
  RedirectedPublicDenyEmailContainer
);

RedirectedPublicDenyEmailContainer.propTypes = {
  denyChallenge: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};
