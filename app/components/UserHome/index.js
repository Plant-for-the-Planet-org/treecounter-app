import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import SvgContainer from '../Common/SvgContainer';
import LoadingIndicator from '../Common/LoadingIndicator';
import UserProfileTypeLabel from '../Common/UserProfileTypeLabel';
import UserProfileImage from '../Common/UserProfileImage';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.profileTypeName = this.profileTypeName.bind(this);

    let svgData = {};
    const { treecounterData, userProfile } = props;
    if (treecounterData) {
      svgData = { ...treecounterData, type: userProfile.type };
    }
    this.state = {
      svgData: svgData
    };
  }

  profileTypeName(profileType) {
    if (profileType == 'tpo') {
      return i18n.t('label.tpo_title');
    } else if (profileType == 'company') {
      return i18n.t('label.company_title');
    } else if (profileType == 'individual') {
      return i18n.t('label.individual_name');
    } else if (profileType == 'education') {
      return i18n.t('label.education');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { treecounterData, userProfile } = nextProps;
    if (treecounterData) {
      let svgData = { ...treecounterData, type: userProfile.type };
      this.setState({ svgData });
    }
  }

  render() {
    const { treecounterData, userProfile } = this.props;
    const profileType = this.profileTypeName(userProfile.type);
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
              <UserProfileTypeLabel profileType={profileType} />
            </div>
          </div>
        </div>
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
            />
          )}
        </div>
      </div>
    );
  }
}

UserHome.propTypes = {
  treecounterData: PropTypes.object,
  userProfile: PropTypes.object
};
