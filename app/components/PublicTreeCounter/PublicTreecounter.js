import React from 'react';
import PropTypes from 'prop-types';

import SupportButton from './SupportButton';
import TreecounterHeader from './TreecounterHeader';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import TpoDonationPlantProjectSelector from '../PlantProjects/TpoDonationPlantProjectSelector';
import UserFootprint from './UserFootprint';
import SvgContainer from '../Common/SvgContainer';
import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import CardLayout from '../../components/Common/Card';
import { getDocumentTitle } from '../../helpers/utils';

import {
  getProfileTypeName,
  isMyself,
  isUserFollower,
  amISupporting
} from './utils';

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
  // ACTION METHODS
  //------------------------------------------------------------------------------------------------------------
  onFollowChanged() {
    if (null !== this.props.currentUserProfile) {
      isUserFollower(this.props.treecounter, this.props.currentUserProfile)
        ? this.props.unfollowSubscribeAction(this.props.treecounter.id)
        : this.props.followSubscribeAction(this.props.treecounter.id);
    } else {
      this.props.route('app_login');
    }
  }

  onPlantProjectSelected(selectedPlantProjectId) {
    this.props.selectPlantProjectIdAction(selectedPlantProjectId);
    this.props.route('app_donateTrees');
  }

  onRegisterSupporter() {
    this.props.supportTreecounterAction(this.props.treecounter);
    this.props.route('app_donateTrees');
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
        targetYear: treecounter.targetYear,
        type: treecounter.userProfile.type
      };
      this.setState({ svgData });
    }
  }
  updateSvg(toggle) {
    if (toggle) {
      const treecounter = this.props.treecounter;
      let svgData = {
        id: treecounter.id,
        target: treecounter.countCommunity + treecounter.countPersonal, // light color
        planted: treecounter.countPersonal, //dark color
        community: treecounter.countCommunity,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: treecounter.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    } else {
      const treecounter = this.props.treecounter;
      let svgData = {
        id: treecounter.id,
        target: treecounter.countTarget,
        planted: treecounter.countPlanted,
        community: treecounter.countCommunity,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: treecounter.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
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
    const isUserFollowerBool = isUserFollower(treecounter, currentUserProfile);
    const isUserLoggedIn = null !== currentUserProfile;
    const showFollow = !isMyself(treecounter, currentUserProfile);

    const supportProps = {
      active: !amISupporting(treecounter, currentUserProfile),
      isUserLoggedIn,
      caption
    };
    const headerProps = {
      caption,
      profileType: getProfileTypeName(profileType),
      logo,
      isUserFollowerBool,
      isUserLoggedIn,
      showFollow
    };
    const tpoProps = {
      plantProjects: userProfile.plantProjects,
      defaultPlantProjectId: null,
      tpoName: caption
    };
    document.title = getDocumentTitle(caption);
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <div className="tree-counter-header">
          <TreecounterHeader
            {...headerProps}
            followChanged={this.onFollowChanged}
          />
          {'tpo' !== userProfile.type &&
            !isMyself(treecounter, currentUserProfile) && (
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
            onToggle={toggleVal => this.updateSvg(toggleVal)}
            treecounterData={this.state.svgData}
          />
        </div>
        <div className="tree-counter-footer__container">
          {'tpo' === userProfile.type && 1 <= tpoProps.plantProjects.length ? (
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
  supportTreecounterAction: PropTypes.func,
  route: PropTypes.func
};

export default PublicTreeCounter;
