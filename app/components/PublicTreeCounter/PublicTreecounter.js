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
import { delimitNumbers } from '../../utils/utils';
import i18n from '../../locales/i18n.js';

import { isMyself, isUserFollower, amISupporting } from './utils';
import PrimaryButton from '../Common/Button/PrimaryButton';

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

  onRegisterSupporter(treecounter) {
    this.props.supportTreecounterAction(treecounter);
    this.props.route('app_donateTrees');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const treecounter = nextProps.treecounter;
    if (treecounter) {
      let svgData = {
        id: treecounter.id,
        target: treecounter.countTarget,
        planted: treecounter.countPlanted,
        community: treecounter.countReceived,
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
        target: treecounter.countReceived + treecounter.countPersonal, // light color
        planted: treecounter.countPersonal, //dark color
        community: treecounter.countReceived,
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
        community: treecounter.countReceived,
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
      profileType: profileType,
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
                  buttonLabel={i18n.t('label.support')}
                  onRegisterSupporter={() =>
                    this.onRegisterSupporter(treecounter)
                  }
                />
              </div>
            )}

          {/* {('company' == userProfile.type ||
            'education' == userProfile.type ||
            'non-profit' == userProfile.type ||
            'govt' == userProfile.type ||
            'plantClub' == userProfile.type) && (
              <div className="support-button-container ">
                <SupportButton
                  {...supportProps}
                  buttonLabel={
                    isUserLoggedIn
                      ? i18n.t('label.support')
                      : i18n.t('label.plant_trees')
                  }
                  onRegisterSupporter={() =>
                    this.onRegisterSupporter(treecounter)
                  }
                />
              </div>
            )} */}
        </div>
        <div className="treecounter_container">
          <div className="canvasContainer flex-column">
            <SvgContainer {...this.state.svgData} />
            <TreecounterGraphicsText
              trillion={false}
              onToggle={toggleVal => this.updateSvg(toggleVal)}
              treecounterData={this.state.svgData}
            />
          </div>
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
        {treecounter.directChildren ? (
          <CardLayout className="width_group_footer">
            <div className="group_user_table">
              <div className="table-header">
                <div className="table-header-item contributor">
                  {i18n.t('label.contributor')}
                </div>
                <div className="table-header-item planted">
                  {i18n.t('label.planted_trees')}
                </div>
                <div className="table-header-item target">
                  {i18n.t('label.target')}
                </div>
                <div className="table-header-item support" />
              </div>
              <div className="table-body">
                {Object.keys(treecounter.directChildren).map(childrenId => {
                  return (
                    <div className="table-row" key={'tr' + childrenId}>
                      <div className="table-col contributor">
                        {treecounter.directChildren[childrenId].displayName}
                      </div>
                      <div className="table-col planted">
                        {delimitNumbers(
                          parseInt(
                            treecounter.directChildren[childrenId].countPlanted
                          )
                        )}
                      </div>
                      <div className="table-col target">
                        {delimitNumbers(
                          parseInt(
                            treecounter.directChildren[childrenId].countTarget
                          )
                        )}
                      </div>
                      <div className="table-col support">
                        <PrimaryButton
                          className="support-button-group-footer"
                          onClick={() =>
                            this.onRegisterSupporter(
                              treecounter.directChildren[childrenId]
                            )
                          }
                        >
                          {i18n.t('label.support')}
                        </PrimaryButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardLayout>
        ) : null}
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
