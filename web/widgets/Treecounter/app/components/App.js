import React, { Component } from 'react';
import SvgContainer from '../../../../../app/components/Common/SvgContainer';
import TreecounterGraphicsText from '../../../../../app/components/TreecounterGraphics/TreecounterGraphicsText';
import SecondaryButton from '../../../../../app/components/Common/Button/SecondaryButton';
import { SideMenuImage } from '../../../../../app/assets';
import PropTypes from 'prop-types';
// import ReactTooltipStyle from '../../../../../node_modules/react-tooltip/dist/style';
import i18n from '../../../../../app/locales/i18n.js';
import { getLocalRoute } from '../../../../../app/actions/apiRouting';
import TreecounterHeader from '../../../../../app/components/PublicTreeCounter/TreecounterHeader';

export default class App extends Component {
  constructor(props) {
    super(props);
    const treecounter = this.props.treecounter;
    this.state = {
      svgData: {
        id: treecounter.id,
        target: treecounter.countTarget,
        planted: treecounter.countPlanted,
        community: treecounter.countReceived,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: treecounter.userProfile.type
      }
    };
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
  componentWillReceiveProps(nextProps) {
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

  render() {
    const {
      serverName,
      treecounter,
      projectId,
      isStandardTreecounter
    } = this.props;
    const { userProfile, displayName: caption } = treecounter;
    const { type: profileType, image: logo } = userProfile;
    const headerProps = {
      caption,
      profileType,
      logo,
      isUserFollowerBool: false,
      isUserLoggedIn: false,
      showFollow: false
    };
    const style = `.canvasContainer {
      background-color:${this.props.backgroundColor};
    }`;
    const inheritedStyleBody = ':host {all: initial;}';
    return (
      <React.Fragment>
        {/* Scoped CSS: CSS defined inside shadow DOM is scoped
        to it. Style rules don't leak out and page styles don't bleed in. */}
        {/* Simplifies CSS - Scoped DOM means you can use simple CSS selectors,
        more generic id/class names, and not worry about naming conflicts. */}
        {/* Reset inherited CSS  */}
        {/* why? */}

        {/*Inherited properties will be inherited as usual. It's better to think of the shadow
          boundary as affecting the cascade, namely the scope of selectors and the importance of rules. */}
        <style>{inheritedStyleBody}</style>
        <div className="widget-container" id={'widget-container'}>
          <link href="treecounterwidget.css" rel="stylesheet" />
          <link href={`${serverName}/treecounterwidget.css`} rel="stylesheet" />
          {/* Apply CSS hooks here */}
          <style>{style}</style>
          {/* Apply React Tooltip Library CSS */}
          {/* TODO: removed as not existing any more, replace with something else?
             <style>{ReactTooltipStyle}</style> */}
          <div className="pftp-widget-row">
            <div className={'pftp-widget-img__container'}>
              {this.props.showGraphics && (
                <img
                  src={serverName + SideMenuImage}
                  className={'pftp-widget-img'}
                />
              )}
              {isStandardTreecounter && (
                <div className="tree-counter-header">
                  <TreecounterHeader
                    {...headerProps}
                    followChanged={this.onFollowChanged}
                  />
                </div>
              )}
            </div>

            {this.props.showDonateButton && (
              <SecondaryButton
                onClick={() => {
                  const url = `${serverName}${getLocalRoute(
                    'app_donateTrees'
                  )}${projectId ? '/' + projectId : ''}`;
                  window.open(url, '_blank');
                }}
              >
                {i18n.t('label.plant_trees')}
              </SecondaryButton>
            )}
          </div>
          <div className="canvasContainer flex-column">
            <SvgContainer {...this.state.svgData} />
            <TreecounterGraphicsText
              trillion={isStandardTreecounter ? false : true}
              onToggle={toggleVal => this.updateSvg(toggleVal)}
              treecounterData={this.state.svgData}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  showGraphics: PropTypes.bool,
  treecounter: PropTypes.object,
  showDonateButton: PropTypes.bool,
  serverName: PropTypes.string,
  baseUrl: PropTypes.string,
  backgroundColor: PropTypes.string,
  isStandardTreecounter: PropTypes.bool,
  projectId: PropTypes.string
};
