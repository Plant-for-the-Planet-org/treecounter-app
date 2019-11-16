import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const UserSynopsis = lazy(() => import('../Common/UserSynopsis'));
const UserHomepageLink = lazy(() => import('../Common/UserHomepageLink'));
const PlantProjectImageCarousel = lazy(() =>
  import('./PlantProjectImageCarousel')
);
const VideoContainer = lazy(() => import('../Common/VideoContainer'));
const NDVI = lazy(() => import('../../containers/NDVI/NDVI'));

// import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectDetails
 */
class PlantProjectDetails extends React.Component {
  render() {
    let {
      description,
      homepageUrl,
      homepageCaption,
      plantProjectImages,
      videoUrl,
      /* mapData, */
      ndviUid
    } = this.props;

    return (
      <div className="plant-project-details__container">
        <PlantProjectImageCarousel
          projectImages={plantProjectImages}
          carousalImageClick={this.props.onImageClick}
          onViewMoreClick={this.props.onViewMoreClick.bind(this)}
        />
        <UserSynopsis synopsis1={description} />
        {homepageUrl && (
          <UserHomepageLink
            homepageUrl={homepageUrl}
            caption={homepageCaption}
          />
        )}
        {videoUrl && (
          <VideoContainer
            onViewMoreClick={this.props.onViewMoreClick.bind(this)}
            url={videoUrl}
          />
        )}
        {
          <div className={'ndvi-conatiner'}>
            <NDVI
              ndviUid={ndviUid}
              onViewMoreClick={this.props.onViewMoreClick.bind(this)}
            />
          </div>
        }
      </div>
    );
  }
}

PlantProjectDetails.propTypes = {
  description: PropTypes.string,
  homepageUrl: PropTypes.string,
  homepageCaption: PropTypes.string,
  videoUrl: PropTypes.string,
  mapData: PropTypes.object,
  plantProjectImages: PropTypes.array,
  onImageClick: PropTypes.func,
  onViewMoreClick: PropTypes.func,
  ndviUid: PropTypes.string
};

export default PlantProjectDetails;
