import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import NavigationEvents from './importNavigationEvents';
import { deleteContribution } from '../../actions/EditMyTree';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import {
  userTreecounterDataSelector,
  currentUserProfileSelector,
  currentUserProfileIdSelector,
  sortedUserContributionsSelector
} from '../../selectors';
import UserHome from '../../components/UserHome';

class UserHomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loadSvg: true
    };
  }
  render() {
    const { treecounterData, currentUserProfile, navigation } = this.props;
    //debug(this.state.loadSvg);

    return [
      navigation ? (
        <NavigationEvents
          onWillFocus={
            (/* payload */) => {
              this.setState({ loadSvg: true });
            }
          }
          onWillBlur={
            (/* payload */) => {
              this.setState({ loadSvg: false });
            }
          }
          key="navigation-events"
        />
      ) : null,
      this.state.loadSvg ? (
        <UserHome
          key="user-home"
          treecounterData={treecounterData}
          userProfile={currentUserProfile}
          userProfileId={this.props.userProfileId}
          userContributions={this.props.userContributions}
          navigation={this.props.navigation}
          deleteContribution={this.props.deleteContribution}
          selectPlantProjectAction={this.props.selectPlantProjectAction}
        />
      ) : null
    ];
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state),
  userProfileId: currentUserProfileIdSelector(state),
  treecounterData: userTreecounterDataSelector(state),
  currentUserProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteContribution,
      selectPlantProjectAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeContainer);

UserHomeContainer.propTypes = {
  treecounterData: PropTypes.object,
  currentUserProfile: PropTypes.object,
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired,
  navigation: PropTypes.any,
  deleteContribution: PropTypes.func
};
