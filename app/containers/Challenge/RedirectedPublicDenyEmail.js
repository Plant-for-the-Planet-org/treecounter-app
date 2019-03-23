import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { denyChallenge } from '../../actions/challengeActions';
import RedirectedEmail from '../../components/Challenge/RedirectedPublicDenyEmail';

class RedirectedPublicDenyEmailContainer extends React.Component {
  render() {
    return (
      <RedirectedEmail denyChallenge={this.props.denyChallenge.bind(this)} />
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

export default connect(null, mapDispatchToProps)(RedirectedEmailContainer);

RedirectedPublicDenyEmailContainer.propTypes = {
  denyChallenge: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};
