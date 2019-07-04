import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { deleteContribution } from '../../actions/EditMyTree';
import UserContributions from '../../components/UserContributions';

// Actions
import {
  currentUserProfileIdSelector,
  sortedUserContributionsSelector
} from '../../selectors/index';

class UserContributionsContainer extends React.Component {
  render() {
    const userContributions = _.orderBy(
      this.props.userContributions,
      function(contribution) {
        return new Date(contribution.plantDate);
      },
      'desc'
    );
    return (
      <UserContributions
        userProfileId={this.props.userProfileId}
        userContributions={userContributions}
        navigation={this.props.navigation}
        deleteContribution={this.props.deleteContribution}
      />
    );
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state),
  userProfileId: currentUserProfileIdSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteContribution
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserContributionsContainer
);

UserContributionsContainer.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired,
  navigation: PropTypes.any,
  deleteContribution: PropTypes.func
};
