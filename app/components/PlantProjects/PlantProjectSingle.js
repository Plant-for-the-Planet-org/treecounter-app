import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
//import { debug } from '../../debug';
import { loadProject } from '../../actions/loadTposAction';
import PlantProjectSpecs from './PlantProjectSpecs';
import PlantProjectDetails from './PlantProjectDetails';
import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { getImageUrl } from '../../actions/apiRouting';
import PlantedProgressBar from './PlantedProgressbar';
import { tick } from '../../assets';
import { updateRoute } from '../../helpers/routerHelper';
import NumberFormat from '../Common/NumberFormat';
// import LoadingIndicator from '../Common/LoadingIndicator.native';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectSingle extends React.Component {
  constructor(props) {
    super(props);
    let projectImage;
    if (props.plantProject.imageFile) {
      projectImage = { image: props.plantProject.imageFile };
    } else {
      projectImage =
        props.plantProject &&
        props.plantProject.plantProjectImages &&
        props.plantProject.plantProjectImages.find(() => true);
    }
    let { plantProject } = props;
    this.state = {
      plantProject,
      projectImage: projectImage,
      imageViewMore: false
    };
  }
  async componentDidMount() {
    if (this.props.plantProject && !this.props.plantProject.tpoData) {
      // we dont have the details in store, fetch it
      const plantProject = await this.props.loadProject(
        this.props.plantProject
      );
      this.setState({ plantProject });
      //debug('fetched details plantproject n plan project full', plantProject);
    }
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
      taxDeductibleCountries,
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
    } = this.state.plantProject;
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
      survivalRate: survivalRate ? survivalRate : null,
      currency,
      treeCost,
      taxDeduction: taxDeductibleCountries
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

    if (!projectImage) projectImage = this.state.projectImage;
    return (
      <React.Fragment>
        <div className="single-project-container">
          <div className="project-teaser__container">
            {projectImage ? (
              <div className="teaser-image__container">
                <img
                  className="teaser__projectImage"
                  src={getImageUrl('project', 'large', projectImage.image)}
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

          <PlantProjectDetails
            {...detailsProps}
            onViewMoreClick={() =>
              this.setState({
                imageViewMore: !this.state.imageViewMore
              })
            }
            onImageClick={this.updateProjectImage.bind(this)}
          />
        </div>
      </React.Fragment>
    );
  }
}

PlantProjectSingle.propTypes = {
  plantProject: PropTypes.object.isRequired,
  tpoName: PropTypes.string,
  selectAnotherProject: PropTypes.bool,
  projectClear: PropTypes.func,
  onViewMoreClick: PropTypes.func
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadProject
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(PlantProjectSingle);
