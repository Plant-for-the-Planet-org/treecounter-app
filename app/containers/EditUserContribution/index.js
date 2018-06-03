import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditUserContribution from '../../components/EditUserContribution';

// Actions
import { sortedUserContributionsSelector } from '../../selectors/index';

class UserContributionsContainer extends React.Component {
  render() {
    let { props } = this;
    let userContribution = props.userContributions.filter(
      contribution => contribution.id == parseInt(props.match.params.id)
    )[0];
    return <EditUserContribution userContributions={userContribution} />;
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state)
});

export default connect(mapStateToProps)(UserContributionsContainer);

UserContributionsContainer.propTypes = {
  userContributions: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};
