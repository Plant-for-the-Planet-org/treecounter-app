import React from 'react';
import PropTypes from 'prop-types';

import PlantProjectTeaser from './PlantProjectTeaser';
import PlantProjectSpecs from './PlantProjectSpecs';
// import SeeMoreToggle from '../Common/SeeMoreToggle';
import PlantProjectDetails from './PlantProjectDetails';

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
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      name: projectName,
      is_certified: isCertified,
      project_images,
      location,
      count_planted: countPlanted,
      count_target: countTarget,
      tree_cost: treeCost,
      currency,
      survival_rate: survivalRate,
      images,
      synopsis1,
      synopsis2,
      homepage_url: homepageUrl,
      homepage_caption: homepageCaption,
      video_url: videoUrl,
      map_data: mapData
    } = this.props.plantProject;
    const projectImage = project_images && project_images.find(() => true);

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
      treeCost,
      currency,
      survivalRate
    };
    const detailsProps = {
      images,
      synopsis1,
      synopsis2,
      homepageUrl,
      homepageCaption,
      videoUrl,
      mapData
    };
    console.log(teaserProps);
    console.log(specsProps);
    console.log(detailsProps);
    return (
      <div>
        <PlantProjectTeaser {...teaserProps} />
        <PlantProjectSpecs {...specsProps} />
        {/* <SeeMoreToggle
          seeMore={false === this.state.expanded}
          onToggle={this.toggleExpanded}
        /> */}
        {this.state.expanded && <PlantProjectDetails {...detailsProps} />}
      </div>
    );
  }
}

PlantProjectFull.propTypes = {
  plantProject: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  tpoName: PropTypes.string
};

export default PlantProjectFull;
