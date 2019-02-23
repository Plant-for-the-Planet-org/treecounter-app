import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChallengesList from '../../components/Challenge/challengeList';

// Actions
import { userChallengesSelector } from '../../selectors/index';

class ChallengesListContainer extends React.Component {
  render() {
    return (
      <ChallengesList
        challenges={this.props.userChallenges}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => ({
  userChallenges: userChallengesSelector(state)
});

export default connect(mapStateToProps)(ChallengesListContainer);

ChallengesListContainer.propTypes = {
  userChallenges: PropTypes.array.isRequired,
  navigation: PropTypes.any
};
