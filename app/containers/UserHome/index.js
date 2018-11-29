import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  userTreecounterDataSelector,
  currentUserProfileSelector,
  currentUserProfileIdSelector,
  sortedUserContributionsSelector
} from '../../selectors';

import UserHome from '../../components/UserHome';

class UserHomeContainer extends React.Component {
  render() {
    const { treecounterData, currentUserProfile } = this.props;

    return (
      <UserHome
        treecounterData={treecounterData}
        userProfile={currentUserProfile}
        userProfileId={this.props.userProfileId}
        userContributions={this.props.userContributions}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state),
  userProfileId: currentUserProfileIdSelector(state),
  treecounterData: userTreecounterDataSelector(state),
  currentUserProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps)(UserHomeContainer);

UserHomeContainer.propTypes = {
  treecounterData: PropTypes.object,
  currentUserProfile: PropTypes.object,
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired,
  navigation: PropTypes.any
};
