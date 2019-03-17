import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChallengesList from '../../components/Challenge/challengeList';

// Actions
import { challengeStatus } from '../../actions/challengeActions';
import { userChallengesSelector } from '../../selectors';

class ChallengesListContainer extends React.Component {
  render() {
    return (
      <ChallengesList
        challenges={this.props.userChallenges}
        navigation={this.props.navigation}
        challengeStatus={this.props.challengeStatus}
      />
    );
  }
}

const mapStateToProps = state => ({
  userChallenges: userChallengesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      challengeStatus
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ChallengesListContainer
);

ChallengesListContainer.propTypes = {
  userChallenges: PropTypes.array.isRequired,
  challengeStatus: PropTypes.func,
  navigation: PropTypes.any
};
