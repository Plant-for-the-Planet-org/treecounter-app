import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import UserContributionsContainer from '../../containers/UserContributions';
import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import SvgContainer from '../Common/SvgContainer';
import TextHeading from '../Common/Heading/TextHeading';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';
import LoadingIndicator from '../Common/LoadingIndicator';
import { getDocumentTitle } from '../../helpers/utils';
import InlineLink from '../Common/InlineLink';
import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';
import RecurringCard from '../UserContributions/RecurringCard';

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

  componentWillReceiveProps(nextProps) {
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
    // TODO check if this is an error
    // const profileType = userProfile.type;
    let { svgData } = this.state;
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <div className="">
          <TextHeading>
            {i18n.t('label.my_trees')}
            <DescriptionHeading>
              {i18n.t('label.my_trees_description')}
            </DescriptionHeading>
          </TextHeading>
        </div>
        <div className="home row">
          <div className="column left">
            <div>
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
            <DescriptionHeading>
              {userProfile.synopsis1 || userProfile.synopsis2}
            </DescriptionHeading>
            <ArcGISContributionsMap userId={userProfile.id} />
            <div className="m-t-2">
              <div className="contribution-buttons">
                <InlineLink
                  caption={i18n.t('label.registerFurther')}
                  uri={'app_registerTrees'}
                />
                <InlineLink
                  caption={i18n.t('label.donate_trees')}
                  uri={'app_donateTrees'}
                />
              </div>
            </div>
          </div>
          <div className="column right app-container__sidenav--heading">
            <div className="heading">Recurring Tree Donations</div>
            <div className="m-b-20">
              {[{ id: 1 }, { id: 2 }].map(cardData => (
                <RecurringCard cardData={cardData} key={cardData.id} />
              ))}
            </div>
            <div className="heading">All Tree Contributions</div>
            <div>
              <UserContributionsContainer />
            </div>
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
