import React from 'react';
import PropTypes from 'prop-types';

import PlantProjectTeaser from './PlantProjectTeaser';
import PlantProjectSpecs from './PlantProjectSpecs';
import SeeMoreToggle from '../Common/SeeMoreToggle';
import PlantProjectDetails from './PlantProjectDetails';
import InlineLink from '../Common/InlineLink';
import i18n from '../../locales/i18n';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectFull extends React.Component {
  constructor(props) {
    super(props);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.state = { expanded: props.expanded };
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
      projectImages,
      location,
      countPlanted: countPlanted,
      count_target: countTarget,
      currency,
      treeCost,
      paymentSetup,
      survivalRate: survivalRate,
      images,
      synopsis1,
      synopsis2,
      homepageUrl: homepageUrl,
      homepageCaption: homepageCaption,
      video_url: videoUrl,
      map_data: mapData
    } = this.props.plantProject;
    const projectImage = projectImages && projectImages.find(() => true);

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
      images,
      synopsis1,
      synopsis2,
      homepageUrl,
      homepageCaption,
      videoUrl,
      mapData,
      projectImages
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
            <InlineLink
              caption={i18n.t('label.different_project')}
              uri={'app_selectProject'}
            />
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
  selectAnotherProject: PropTypes.bool
};

export default PlantProjectFull;
