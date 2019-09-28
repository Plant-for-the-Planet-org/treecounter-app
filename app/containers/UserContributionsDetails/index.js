import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserContributionsDetails from '../../components/UserContributions/ContributionDetails/index.native';
// Actions
import { currentUserProfileIdSelector } from '../../selectors/index';

class UserContributionsDetailsContainer extends React.Component {
  getContribution(props = this.props) {
    let contribution = null;
    if (props.match) {
      contribution = props.match.params.contribution;
    } else if (props.navigation) {
      contribution = props.navigation.getParam('contribution', contribution);
    }
    return contribution;
  }

  render() {
    return (
      <UserContributionsDetails
        navigation={this.props.navigation}
        userProfileId={this.props.userProfileId}
        contribution={this.getContribution()}
      />
    );
  }
}

const mapStateToProps = state => ({
  userProfileId: currentUserProfileIdSelector(state)
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserContributionsDetailsContainer
);

UserContributionsDetailsContainer.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any
};
