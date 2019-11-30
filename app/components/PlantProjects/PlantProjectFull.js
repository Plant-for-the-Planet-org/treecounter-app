import React from 'react';
import PropTypes from 'prop-types';

import PlantProjectSpecs from './PlantProjectSpecs';
import SeeMoreToggle from '../Common/SeeMoreToggle';
import PlantProjectDetails from './PlantProjectDetails';
import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { getImageUrl } from '../../actions/apiRouting';
import PlantedProgressBar from './PlantedProgressbar';
import { tick } from '../../assets';
import { updateRoute } from '../../helpers/routerHelper';
import NumberFormat from '../Common/NumberFormat';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectFull extends React.Component {
  constructor(props) {
    super(props);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    let projectImage;
    if (this.props.plantProject.imageFile) {
      projectImage = { image: this.props.plantProject.imageFile };
    } else {
      projectImage =
        this.props.plantProject &&
        this.props.plantProject.plantProjectImages &&
        this.props.plantProject.plantProjectImages.find(() => true);
    }
    this.state = {
      expanded: props.expanded,
      projectImage: projectImage,
      imageViewMore: false
    };
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
  updateProjectImage(projectImage) {
    this.setState({ projectImage: projectImage });
  }

  updateRoute(link) {
    updateRoute('app_treecounter', null, null, {
      treecounter: link
    });
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
      geoLocation,
      ndviUid,
      tpoSlug
    } = this.props.plantProject;
    let projectImage = null;

    if (imageFile) {
      projectImage = { image: imageFile };
    } else {
      projectImage = plantProjectImages && plantProjectImages.find(() => true);
    }

    const teaserProps = {
      tpoName: this.props.tpoName,
      tpoSlug: tpoSlug,
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
      plantProjectImages,
      ndviUid
    };
    return (
      <React.Fragment>
        <div className="project-teaser__container">
          {projectImage ? (
            <div className="teaser-image__container">
              <img
                className="teaser__projectImage"
                src={getImageUrl(
                  'project',
                  'large',
                  this.state.projectImage.image
                )}
                alt={projectImage.description}
              />
            </div>
          ) : null}

          <div className="row">
            <PlantedProgressBar
              countPlanted={specsProps.countPlanted}
              countTarget={specsProps.countTarget}
            />
          </div>
          <div className="row">
            <div className="teaser__tpoHeading">{projectName}</div>
            <div className="teaser__certified__container">
              {isCertified ? (
                <img className="teaser__certified" src={tick} />
              ) : null}
            </div>
          </div>
          {teaserProps.tpoSlug && (
            <div className="row">
              <div className="teaser__tpoHeading">
                <a onClick={() => this.updateRoute(teaserProps.tpoSlug)}>
                  {i18n.t('label.comp_by_name', {
                    ownername: teaserProps.tpoName
                  })}
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="project-specs__container">
          <div className="project-specs__detail">
            <PlantProjectSpecs {...specsProps} />
          </div>
          <div className="project-specs__cost">
            <span>
              <NumberFormat
                data={specsProps.treeCost}
                currency={specsProps.currency}
              />
            </span>
          </div>
        </div>
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
        {this.state.expanded ? (
          <PlantProjectDetails
            {...detailsProps}
            onViewMoreClick={this.props.onViewMoreClick.bind(this)}
            onImageClick={this.updateProjectImage.bind(this)}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

PlantProjectFull.propTypes = {
  plantProject: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  callExpanded: PropTypes.func,
  tpoName: PropTypes.string,
  selectAnotherProject: PropTypes.bool,
  projectClear: PropTypes.func,
  onViewMoreClick: PropTypes.func
};

export default PlantProjectFull;
