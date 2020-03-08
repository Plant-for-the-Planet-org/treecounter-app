import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import SvgContainer from '../Common/SvgContainer';
import LoadingIndicator from '../Common/LoadingIndicator';
import UserProfileImage from '../Common/UserProfileImage';
import { getDocumentTitle } from '../../helpers/utils';
import * as images from '../../assets';

export default class UserHome extends Component {
  constructor(props) {
    super(props);

    let svgData = {};
    const { treecounterData, userProfile } = props;
    if (userProfile)
      if (treecounterData) {
        svgData = { ...treecounterData, type: userProfile.type };
      }
    this.state = {
      svgData: svgData
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { treecounterData, userProfile } = nextProps;
    if (treecounterData) {
      let svgData = { ...treecounterData, type: userProfile.type };
      this.setState({ svgData });
    }
  }
  updateSvg(toggle) {
    if (toggle) {
      const treecounter = this.props.treecounterData;
      const profileType = this.props.userProfile.type;
      if (isNaN(parseInt(treecounter.community))) {
        treecounter.community = 0;
      }
      if (isNaN(parseInt(treecounter.personal))) {
        treecounter.personal = 0;
      }

      let svgData = {
        id: treecounter.id,
        target: treecounter.community + treecounter.personal, // light color
        planted: treecounter.personal, //dark color
        community: treecounter.community,
        personal: treecounter.personal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: profileType
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    } else {
      const treecounter = this.props.treecounterData;
      const profileType = this.props.userProfile.type;
      let svgData = {
        id: treecounter.id,
        target: treecounter.target,
        planted: treecounter.planted,
        community: treecounter.community,
        personal: treecounter.personal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: profileType
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    }
  }

  render() {
    const { treecounterData, userProfile } = this.props;
    document.title = getDocumentTitle(userProfile.treecounter.displayName);
    const profileType = userProfile.type;
    let { svgData } = this.state;
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <div className="tree-counter-profile flex-column user-home-profile">
          <UserProfileImage profileImage={userProfile.image} />
          <div className="user-info">
            <div className="tree-counter-name">
              {userProfile.treecounter.displayName}
            </div>
            <div className="tree-counter-row">
              {!!profileType && (
                <img
                  className="profile-type-image"
                  src={
                    profileType === 'education'
                      ? images['schoolIcon']
                      : profileType === 'tpo'
                      ? images['tpoIcon']
                      : profileType === 'company'
                      ? images['companyIcon']
                      : images['individualIcon']
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div className="treecounter_container">
          <div className="canvasContainer flex-column">
            <SvgContainer {...svgData} />
            {treecounterData === null ? (
              <div className="circle-inside circle-headline">
                <LoadingIndicator />
              </div>
            ) : (
              <TreecounterGraphicsText
                trillion={false}
                treecounterData={svgData}
                onToggle={toggleVal => this.updateSvg(toggleVal)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

UserHome.propTypes = {
  treecounterData: PropTypes.object,
  userProfile: PropTypes.object
};
