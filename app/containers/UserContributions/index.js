import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserContributions from '../../components/UserContributions';

// Actions
import { sortedUserContributionsSelector } from '../../selectors/index';

class UserContributionsContainer extends React.Component {
  render() {
    return (
      <UserContributions userContribution={this.props.userContributions} />
    );
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state)
});

export default connect(mapStateToProps)(UserContributionsContainer);

UserContributionsContainer.propTypes = {
  userContributions: PropTypes.array.isRequired
};
