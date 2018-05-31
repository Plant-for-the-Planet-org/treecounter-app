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
      isCertified: isCertified,
      projectImages,
      location,
      countPlanted: countPlanted,
      count_target: countTarget,
      paymentCurrencies,
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
      paymentCurrencies,
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
