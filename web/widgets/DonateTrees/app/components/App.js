import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from '../../../../../app/locales/i18n.js';
import PlantProjectFull from '../../../../../app/components/PlantProjects/PlantProjectFull';
import PrimaryButton from '../../../../../app/components/Common/Button/PrimaryButton';
import DonationFlow from './DonationFLow';
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
      },
      showDonationFlow: false,
      imageViewMore: false
    };
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

  render() {
    const { serverName, treecounter, ProjectId, inlineDonation } = this.props;
    const style = `.canvasContainer {
      background-color:${this.props.backgroundColor};
    }`;
    if (
      !treecounter ||
      !treecounter.userProfile ||
      treecounter.userProfile.type != 'tpo' ||
      !treecounter.userProfile.plantProjects ||
      treecounter.userProfile.plantProjects.length == 0
    ) {
      return null;
    }
    const plantProjects = treecounter.userProfile.plantProjects;
    let result = plantProjects.find(
      plantProject => plantProject.id == ProjectId
    );
    if (!result) result = plantProjects[0];
    return (
      <div className="widget-container" id={'widget-container'}>
        <link href="donatetreewidget.css" rel="stylesheet" />
        <link href={`${serverName}/donatetreewidget.css`} rel="stylesheet" />
        {/* Apply CSS hooks here */}
        <style>{style}</style>
        <PlantProjectFull
          onViewMoreClick={() =>
            this.setState({ imageViewMore: !this.state.imageViewMore })
          }
          expanded={false}
          plantProject={result}
          tpoName={treecounter.userProfile.fullname}
          selectAnotherProject={false}
          projectClear={undefined}
        />
        <div className="select-project_button__container">
          <PrimaryButton
            onClick={() => {
              // console.log(event);
              // const body = document.body;
              // let div = document.createElement('div');
              // div.className = 'overlay-container ';
              // body.appendChild(div);
              // ReactDOM.render(<DonationFlow />, div);
              if (inlineDonation) {
                this.setState({ showDonationFlow: true });
              } else {
                const url = `${serverName}${getLocalRoute('app_donateTrees')}${
                  ProjectId ? '/' + ProjectId : ''
                }`;
                window.open(url, '_blank');
              }
            }}
          >
            {i18n.t('label.donate')}
          </PrimaryButton>
        </div>
        <DonationFlow
          isOpen={this.state.showDonationFlow}
          onRequestClose={() => this.setState({ showDonationFlow: false })}
        />
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
  ProjectId: PropTypes.any,
  inlineDonation: PropTypes.bool
};
