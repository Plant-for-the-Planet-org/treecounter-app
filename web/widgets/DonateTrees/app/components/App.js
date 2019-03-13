import React, { Component } from 'react';
import SvgContainer from '../../../../../app/components/Common/SvgContainer';
import TreecounterGraphicsText from '../../../../../app/components/TreecounterGraphics/TreecounterGraphicsText';
import SecondaryButton from '../../../../../app/components/Common/Button/SecondaryButton';
import { SideMenuImage } from '../../../../../app/assets';
import PropTypes from 'prop-types';
import ReactTooltipStyle from '../../../../../node_modules/react-tooltip/dist/style';
import i18n from '../../../../../app/locales/i18n.js';
import { getLocalRoute } from '../../../../../app/actions/apiRouting';
import PlantedProgressBar from '../../../../../app/components/PlantProjects/PlantedProgressbar';
import PlantProjectFull from '../../../../../app/components/PlantProjects/PlantProjectFull';
import PrimaryButton from '../../../../../app/components/Common/Button/PrimaryButton';
import ReactDOM from 'react-dom';
import DonationFlow from './DonationFLow';

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
    const { serverName, baseUrl, treecounter, ProjectId } = this.props;
    console.log('treecounter', treecounter);
    const style = `.canvasContainer {
      background-color:${this.props.backgroundColor};
    }`;
    const plantProjects = treecounter.userProfile.plantProjects;
    const result = plantProjects.find(
      plantProject => plantProject.id == ProjectId
    );
    return (
      <div
        className="widget-container"
        // tabIndex={'-1'}
        id={'widget-container'}
        _reactinternal={this._inputRef1}
        ref={this._inputRef1}
      >
        <link href="donatetreewidget.css" rel="stylesheet" />
        <link href={`${serverName}/donatetreewidget.css"`} rel="stylesheet" />
        <PlantProjectFull
          callExpanded={false}
          expanded={false}
          plantProject={result}
          tpoName={'harsh'}
          selectAnotherProject={true}
          projectClear={undefined}
        />
        <div className="select-project_button__container">
          <PrimaryButton
            onClick={event => {
              console.log(event);
              const body = document.body;
              let div = document.createElement('div');
              div.className = 'overlay-container ';
              body.appendChild(div);
              ReactDOM.render(<DonationFlow />, div);
            }}
          >
            {i18n.t('label.donate')}
          </PrimaryButton>
        </div>
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
  backgroundColor: PropTypes.string,
  ProjectId: PropTypes.any
};
