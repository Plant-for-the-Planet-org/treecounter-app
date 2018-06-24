import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import SvgContainer from '../Common/SvgContainer';
import LoadingIndicator from '../Common/LoadingIndicator';
import UserProfileTypeLabel from '../Common/UserProfileTypeLabel';
import UserProfileImage from '../Common/UserProfileImage';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    let svgData = {};
    const { treecounterData } = props;
    if (treecounterData) {
      svgData = treecounterData;
    }
    this.state = {
      svgData: svgData
    };
  }

  componentWillReceiveProps(nextProps) {
    const { treecounterData } = nextProps;
    if (treecounterData) {
      let svgData = treecounterData;
      this.setState({ svgData });
    }
  }

  render() {
    console.log('Home Component Render with props- ', this.props);

    const { treecounterData, userProfile } = this.props;
    let { svgData } = this.state;
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <div className="tree-counter-profile flex-column">
          <UserProfileImage profileImage={userProfile.image} />
          <div className="user-info">
            <div className="tree-counter-name">
              {userProfile.treecounter.displayName}
            </div>
            <div className="tree-counter-row">
              <UserProfileTypeLabel profileType={userProfile.type} />
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
