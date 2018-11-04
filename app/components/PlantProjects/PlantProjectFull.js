import React from 'react';
import PropTypes from 'prop-types';

import PlantProjectTeaser from './PlantProjectTeaser';
import PlantProjectSpecs from './PlantProjectSpecs';
import SeeMoreToggle from '../Common/SeeMoreToggle';
import PlantProjectDetails from './PlantProjectDetails';
import InlineLink from '../Common/InlineLink';
import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectFull extends React.Component {
  constructor(props) {
    super(props);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.state = { expanded: props.expanded };
    if (props.callExpanded) {
      props.callExpanded(!this.state.expanded);
    }
  }

  toggleExpanded() {
    if (this.props.callExpanded) {
      this.props.callExpanded(!this.state.expanded);
    }
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      name: projectName,
      isCertified: isCertified,
      plantProjectImages,
      location,
      countPlanted: countPlanted,
      countTarget,
      currency,
      treeCost,
      paymentSetup,
      survivalRate: survivalRate,
      images,
      imageFile,
      description,
      homepageUrl: homepageUrl,
      homepageCaption: homepageCaption,
      videoUrl: videoUrl,
      geoLocation
    } = this.props.plantProject;
    let projectImage = null;

    if (imageFile) {
      projectImage = { image: imageFile };
    } else {
      projectImage = plantProjectImages && plantProjectImages.find(() => true);
    }

    const teaserProps = {
      tpoName: this.props.tpoName,
      projectName,
      isCertified,
      projectImage
    };
    const specsProps = {
      location,
      countPlanted,
      countTarget,
      survivalRate,
      currency,
      treeCost,
      taxDeduction: paymentSetup.taxDeduction
    };
    const detailsProps = {
      description,
      images,
      homepageUrl,
      homepageCaption,
      videoUrl,
      mapData: queryParamsToObject(geoLocation),
      plantProjectImages
    };
    return (
      <div>
        <PlantProjectTeaser {...teaserProps} />
        <PlantProjectSpecs {...specsProps} />
        <div className="project-action-links">
          <SeeMoreToggle
            seeMore={!this.state.expanded}
            onToggle={this.toggleExpanded}
          />
          {this.props.selectAnotherProject ? (
            <div
              className={'select_different_project_style'}
              onClick={this.props.projectClear}
            >
              {i18n.t('label.different_project')}
            </div>
          ) : null}
        </div>
        {this.state.expanded && <PlantProjectDetails {...detailsProps} />}
      </div>
    );
  }
}

PlantProjectFull.propTypes = {
  plantProject: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  callExpanded: PropTypes.func,
  tpoName: PropTypes.string,
  selectAnotherProject: PropTypes.bool,
  projectClear: PropTypes.func
};

export default PlantProjectFull;
