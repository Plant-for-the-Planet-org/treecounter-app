import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditUserContribution from '../../components/EditUserContribution';

// Actions
import { sortedUserContributionsSelector } from '../../selectors/index';

class EditUserContributionsContainer extends React.Component {
  render() {
    let { props } = this;
    let userContribution = props.userContributions.filter(
      contribution =>
        contribution.id == parseInt(props.match.params.selectedTreeId)
    )[0];
    return <EditUserContribution userContribution={userContribution} />;
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state)
});

export default connect(mapStateToProps)(EditUserContributionsContainer);

EditUserContributionsContainer.propTypes = {
  userContributions: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      selectedTreeId: PropTypes.string
    })
  }).isRequired
};
