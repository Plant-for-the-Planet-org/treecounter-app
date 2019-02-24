import React, { Component } from 'react';
import SvgContainer from '../../../../../app/components/Common/SvgContainer';
import TreecounterGraphicsText from '../../../../../app/components/TreecounterGraphics/TreecounterGraphicsText';
import SecondaryButton from '../../../../../app/components/Common/Button/SecondaryButton';
import { SideMenuImage } from '../../../../../app/assets';
import PropTypes from 'prop-types';
import ReactTooltipStyle from '../../../../../node_modules/react-tooltip/dist/style';

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
    return (
      <div
        className="widget-container"
        // tabIndex={'-1'}
        id={'widget-container'}
        _reactinternal={this._inputRef1}
        ref={this._inputRef1}
      >
        <link href="treecounterwidget.css" rel="stylesheet" />
        <link href="${serverName}/treecounterwidget.css" rel="stylesheet" />
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
                window.pftp.giftTree(event);
              }}
            >
              Plant Trees
            </SecondaryButton>
          )}
        </div>

        {/* <button
          className="pftp-button-secondary"
          type="button"
          onClick={event => {
            console.log('SecondaryButton', window, windows, this);
            window.pftp.giftTree(event);
          }}
        >
          Plant Trees
        </button> */}
        <div className="canvasContainer flex-column">
          <SvgContainer {...this.state.svgData} />
          <TreecounterGraphicsText
            trillion={false}
            onToggle={toggleVal => this.updateSvg(toggleVal)}
            treecounterData={this.state.svgData}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  showGraphics: PropTypes.bool,
  treecounter: PropTypes.object,
  showDonateButton: PropTypes.bool
};
