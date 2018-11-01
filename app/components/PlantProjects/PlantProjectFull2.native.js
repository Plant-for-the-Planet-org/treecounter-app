import React from 'react';
import PropTypes from 'prop-types';

import SeeMoreToggle from '../Common/SeeMoreToggle';
import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full2';
import PlantProjectTeaser from './PlantProjectTeaser';
import PlantProjectSpecs from './PlantProjectSpecs';
import PlantProjectDetails from './PlantProjectDetails';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { ScrollView } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
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
      id: id,
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
      <CardLayout style={styles.projectFullContainer}>
        <View style={styles.projectImageContainer}>
          <Image
            style={styles.teaser__projectImage}
            resizeMethod="scale"
            // resizeMode="center"
            source={{
              uri: getImageUrl(
                'project',
                'large',
                teaserProps.projectImage.image
              )
            }}
          />
        </View>
        <View style={styles.projectSpecsContainer}>
          <View style={styles.treeCounterContainer}>
            <View style={styles.treePlantedContainer}>
              <Text style={styles.treePlantedtext}>
                {specsProps.countPlanted}
              </Text>
              <Text>
                {i18n.t('label.trees') + ' ' + i18n.t('label.planted')}
              </Text>
            </View>
            <View style={styles.targetContainer}>
              <Text>{specsProps.countTarget}</Text>
            </View>
          </View>
          <View style={styles.projectNameContainer}>
            <Text>{teaserProps.projectName}</Text>
          </View>
          <View style={styles.projectdetailsContainer}>
            <View style={styles.locationContainer}>
              <Text>{specsProps.location}</Text>
              <Text>
                {i18n.t('label.survival_rate')} {specsProps.survivalRate}%
              </Text>
            </View>

            <View style={styles.costContainer}>
              <Text>${specsProps.treeCost}</Text>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.byOrgContainer}>
              <Text>{teaserProps.tpoName}</Text>
            </View>

            <View style={styles.buttonContainer}>
              {/* <PrimaryButton>
                  <Text>Donate</Text>
              </PrimaryButton> */}
            </View>
          </View>
        </View>
      </CardLayout>
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
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  onSelectClickedFeaturedProjects: PropTypes.func
};

export default PlantProjectFull;
