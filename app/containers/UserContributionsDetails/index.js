import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getAllPlantProjectsSelector } from '../../selectors';
import UserContributionsDetails from '../../components/UserContributions/ContributionDetails/index.native';
// Actions
import { currentUserProfileIdSelector } from '../../selectors/index';
import { deleteContribution } from '../../actions/EditMyTree';

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
        plantProjects={this.props.plantProjects}
        deleteContribution={this.props.deleteContribution}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfileId: currentUserProfileIdSelector(state),
    plantProjects: getAllPlantProjectsSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteContribution
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserContributionsDetailsContainer
);

UserContributionsDetailsContainer.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  deleteContribution: PropTypes.func,
  plantProjects: PropTypes.object
};
