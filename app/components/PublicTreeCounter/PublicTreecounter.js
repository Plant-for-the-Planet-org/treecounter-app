import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SupportButton from './SupportButton';
import TreecounterHeader from './TreecounterHeader';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import TpoDonationPlantProjectSelector from '../PlantProjects/TpoDonationPlantProjectSelector';
import UserFootprint from './UserFootprint';
import { currentUserProfileSelector } from '../../selectors/index';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { supportTreecounterAction } from '../../actions/supportTreecounterAction';
import SvgContainer from '../Common/SvgContainer';
import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import CardLayout from '../../components/Common/Card/CardLayout';
import { followUser, unfollowUser } from '../../actions/followActions';
import { getLocalRoute } from '../../actions/apiRouting';
import { history } from '../Common/BrowserRouter';

class PublicTreeCounter extends React.Component {
  constructor(props) {
    super(props);

    this.onFollowChanged = this.onFollowChanged.bind(this);
    this.onPlantProjectSelected = this.onPlantProjectSelected.bind(this);
    this.onRegisterSupporter = this.onRegisterSupporter.bind(this);
    this.state = {
      svgData: {}
    };
  }

  //------------------------------------------------------------------------------------------------------------
  // HELPER METHODS
  //------------------------------------------------------------------------------------------------------------
  isMyself() {
    const { treecounter, currentUserProfile } = this.props;
    return (
      null !== currentUserProfile &&
      currentUserProfile.treecounter.id === treecounter.id
    );
  }

  isUserFollower() {
    const { treecounter, currentUserProfile } = this.props;
    const followeeIds =
      currentUserProfile && currentUserProfile.treecounter.followeeIds
        ? currentUserProfile.treecounter.followeeIds
            .split(',')
            .map(s => parseInt(s))
        : [];
    return followeeIds.includes(treecounter.id);
  }

  amISupporting() {
    const { treecounter, currentUserProfile } = this.props;
    return currentUserProfile
      ? currentUserProfile.supported_treecounter &&
          currentUserProfile.supported_treecounter.id === treecounter.id
      : false;
  }

  //------------------------------------------------------------------------------------------------------------
  // ACTION METHODS
  //------------------------------------------------------------------------------------------------------------
  onFollowChanged() {
    if (null !== this.props.currentUserProfile) {
      this.isUserFollower()
        ? this.props.unfollowSubscribeAction(this.props.treecounter.id)
        : this.props.followSubscribeAction(this.props.treecounter.id);
    } else {
      history.push(getLocalRoute('app_login'));
    }
  }

  onPlantProjectSelected(selectedPlantProjectId) {
    this.props.selectPlantProjectIdAction(selectedPlantProjectId);
    history.push(getLocalRoute('app_donateTrees'));
  }

  onRegisterSupporter() {
    console.log('**onRegisterSupporter**');
    this.props.supportTreecounterAction(this.props.treecounter);
    history.push(getLocalRoute('app_donateTrees'));
  }

  componentWillReceiveProps(nextProps) {
    const treecounter = nextProps.treecounter;
    if (treecounter) {
      let svgData = {
        id: treecounter.id,
        target: treecounter.countTarget,
        planted: treecounter.countPlanted,
        community: treecounter.countCommunity,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear
      };
      this.setState({ svgData });
    }
  }
  render() {
    const { treecounter, currentUserProfile } = this.props;
    if (null === treecounter) {
      return (
        <div className="trillion-container sidenav-wrapper">
          <LoadingIndicator />
        </div>
      );
    }

    const { userProfile, displayName: caption } = treecounter;
    const { type: profileType, image: logo } = userProfile;
    const isUserFollower = this.isUserFollower();
    const isUserLoggedIn = null !== currentUserProfile;
    const showFollow = !this.isMyself();

    const supportProps = {
      active: !this.amISupporting(),
      isUserLoggedIn,
      caption
    };
    const headerProps = {
      caption,
      profileType,
      logo,
      isUserFollower,
      isUserLoggedIn,
      showFollow
    };
    const tpoProps = {
      plantProjects: userProfile.plantProjects,
      defaultPlantProjectId: null,
      tpoName: caption
    };

    return (
      <div className="app-container__content--center sidenav-wrapper">
        <div className="tree-counter-header">
          <TreecounterHeader
            {...headerProps}
            followChanged={this.onFollowChanged}
          />
          {'tpo' !== userProfile.type &&
            !this.isMyself() && (
              <div className="support-button-container ">
                <SupportButton
                  {...supportProps}
                  onRegisterSupporter={this.onRegisterSupporter}
                />
              </div>
            )}
        </div>
        <div className="canvasContainer flex-column">
          <SvgContainer {...this.state.svgData} />
          <TreecounterGraphicsText
            trillion={false}
            treecounterData={this.state.svgData}
          />
        </div>
        <div className="tree-counter-footer__container">
          {'tpo' === userProfile.type ? (
            <TpoDonationPlantProjectSelector
              {...tpoProps}
              onSelect={this.onPlantProjectSelected}
            />
          ) : userProfile.synopsis1 || userProfile.synopsis2 ? (
            <CardLayout>
              <UserFootprint userProfile={userProfile} />
            </CardLayout>
          ) : null}
        </div>
      </div>
    );
  }
}

PublicTreeCounter.propTypes = {
  treecounter: PropTypes.object,
  currentUserProfile: PropTypes.object,
  followSubscribeAction: PropTypes.func,
  unfollowSubscribeAction: PropTypes.func,
  selectPlantProjectIdAction: PropTypes.func,
  supportTreecounterAction: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectPlantProjectIdAction: selectPlantProjectAction,
      supportTreecounterAction: supportTreecounterAction,
      followSubscribeAction: followUser,
      unfollowSubscribeAction: unfollowUser
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicTreeCounter);
