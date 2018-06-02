import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { history } from '../../components/Common/BrowserRouter';

import SupportButton from './SupportButton';
import TreecounterHeader from './TreecounterHeader';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
// import TpoDonationPlantProjectSelector from '../PlantProjects/TpoDonationPlantProjectSelector'
import UserFootprint from './UserFootprint';
//import {getLocalRoute} from '../../actions/apiRouting'
import { currentUserProfileSelector } from '../../selectors/index';
// import {selectPlantProjectIdAction} from '../../actions/selectPlantProjectIdAction'
// import {followUnSubscribeAction} from '../../actions/followUnSubscribeAction'
// import {followSubscribeAction} from '../../actions/followSubscribeAction'
// import {supportTreecounterAction} from '../../actions/supportTreecounterAction'
import SvgContainer from '../Common/SvgContainer';
import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import CardLayout from '../../components/Common/Card/CardLayout';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Public-TreeCounter
 */
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
      currentUserProfile && currentUserProfile.treecounter.followee_ids
        ? currentUserProfile.treecounter.followee_ids
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
    // this.isUserFollower() ?
    //   this.props.followUnSubscribeAction(this.props.treecounter.id) :
    //   this.props.followSubscribeAction(this.props.treecounter.id)
  }

  onPlantProjectSelected(selectedPlantProjectId) {
    console.log(selectedPlantProjectId);
    // console.log('onPlantProjectSelected', selectedPlantProjectId)
    // this.props.selectPlantProjectIdAction(selectedPlantProjectId)
    //history.push(getLocalRoute('app_donateTrees'))
  }

  onRegisterSupporter() {
    console.log('**onRegisterSupporter**');
    // this.props.supportTreecounter(this.props.treecounter)
    //history.push(getLocalRoute('app_donateTrees'))
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
        <div className="sidenav-wrapper">
          <LoadingIndicator />;
        </div>
      );
    }

    const { userProfile, displayName: caption } = treecounter;
    const { type: profileType, logo } = userProfile;
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
    // const tpoProps = {plantProjects: userProfile.plant_projects, defaultPlantProjectId: null}

    return (
      <div className="tree-counter-container">
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
        {'tpo' === userProfile.type ? (
          <LoadingIndicator />
        ) : (
          // <TpoDonationPlantProjectSelector
          //   {...tpoProps}
          //   onSelect={this.onPlantProjectSelected}
          // />
          <div className="tree-counter-user-footer">
            <CardLayout>
              <UserFootprint userProfile={userProfile} />
            </CardLayout>
          </div>
        )}
      </div>
    );
  }
}

PublicTreeCounter.propTypes = {
  treecounter: PropTypes.object,
  currentUserProfile: PropTypes.object
  // supportTreecounter: PropTypes.func.isRequired,
  // selectPlantProjectIdAction: PropTypes.func.isRequired,
  // followSubscribeAction: PropTypes.func.isRequired,
  // followUnSubscribeAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  console.log(dispatch);
  return {
    // supportTreecounter: treecounter => dispatch(supportTreecounterAction(treecounter)),
    // selectPlantProjectIdAction: selectedPlantProjectId => dispatch(selectPlantProjectIdAction(selectedPlantProjectId)),
    // followSubscribeAction: treecounterId => dispatch(followSubscribeAction(treecounterId)),
    // followUnSubscribeAction: treecounterId => dispatch(followUnSubscribeAction(treecounterId))
  };
};

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicTreeCounter);
