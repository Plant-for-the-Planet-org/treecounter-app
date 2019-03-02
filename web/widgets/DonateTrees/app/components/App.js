import React, { Component } from 'react';
import SvgContainer from '../../../../../app/components/Common/SvgContainer';
import TreecounterGraphicsText from '../../../../../app/components/TreecounterGraphics/TreecounterGraphicsText';
import SecondaryButton from '../../../../../app/components/Common/Button/SecondaryButton';
import { SideMenuImage } from '../../../../../app/assets';
import PropTypes from 'prop-types';
import ReactTooltipStyle from '../../../../../node_modules/react-tooltip/dist/style';
import i18n from '../../../../../app/locales/i18n.js';
import { getLocalRoute } from '../../../../../app/actions/apiRouting';

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
    console.log(toggle);
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
    const { serverName, baseUrl, treecounter } = this.props;
    const style = `.canvasContainer {
      background-color:${this.props.backgroundColor};
    }`;
    return (
      <div
        className="widget-container"
        // tabIndex={'-1'}
        id={'widget-container'}
        _reactinternal={this._inputRef1}
        ref={this._inputRef1}
      >
        Donate flow will come here
        {/* <link
          href="https://firebasestorage.googleapis.com/v0/b/pictureappbackend-test.appspot.com/o/TreeCounterWidget%2Fv1%2Ftreecounterwidget.css?alt=media&token=26864f0f-9934-4410-9480-aaa304627a38"
          rel="stylesheet"
        />
        <link href={`${serverName}/treecounterwidget.css" rel="stylesheet"`} />
        <style>{style}</style>
        <style>{ReactTooltipStyle}</style>
        <div className="pftp-widget-row">
          <div className={'pftp-widget-img__container'}>
            {this.props.showGraphics && (
              <img src={SideMenuImage} className={'pftp-widget-img'} />
            )}
          </div>

          {this.props.showDonateButton && (
            <SecondaryButton
              onClick={event => {
                console.log('SecondaryButton', window, windows, this);
                const url = `${serverName}/${getLocalRoute(
                  'app_registerTrees'
                )}?uid=${treecounter.id}`;
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
            trillion={false}
            onToggle={toggleVal => this.updateSvg(toggleVal)}
            treecounterData={this.state.svgData}
          />
        </div> */}
      </div>
    );
  }
}

App.propTypes = {
  showGraphics: PropTypes.bool,
  treecounter: PropTypes.object,
  showDonateButton: PropTypes.bool,
  serverName: PropTypes.string,
  baseUrl: PropTypes.string,
  backgroundColor: PropTypes.string
};
