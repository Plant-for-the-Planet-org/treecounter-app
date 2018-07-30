import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserContributions from '../../components/UserContributions';

// Actions
import {
  currentUserProfileIdSelector,
  sortedUserContributionsSelector
} from '../../selectors/index';

class UserContributionsContainer extends React.Component {
  render() {
    return (
      <UserContributions
        userProfileId={this.props.userProfileId}
        userContributions={this.props.userContributions}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state),
  userProfileId: currentUserProfileIdSelector(state)
});

export default connect(mapStateToProps)(UserContributionsContainer);

UserContributionsContainer.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired,
  navigation: PropTypes.any
};
