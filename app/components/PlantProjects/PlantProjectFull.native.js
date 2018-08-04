import React from 'react';
import PropTypes from 'prop-types';

import SeeMoreToggle from '../Common/SeeMoreToggle';
// import PlantProjectDetails from './PlantProjectDetails';
// import InlineLink from '../Common/InlineLink';
import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import PlantProjectTeaser from './PlantProjectTeaser';
import PlantProjectSpecs from './PlantProjectSpecs';
import PlantProjectDetails from './PlantProjectDetails';
import CardLayout from '../Common/Card/CardLayout';
import PrimaryButton from '../Common/Button/PrimaryButton';
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
      description,
      homepageUrl: homepageUrl,
      homepageCaption: homepageCaption,
      videoUrl: videoUrl,
      geoLocation
    } = this.props.plantProject;
    const projectImage =
      plantProjectImages && plantProjectImages.find(() => true);

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
        <View style={styles.projectTeaserContainer}>
          <PlantProjectTeaser {...teaserProps} />
        </View>
        <View style={styles.projectSpecsContainer}>
          <PlantProjectSpecs {...specsProps} />
        </View>

        <View style={styles.seeMoreContainer}>
          <SeeMoreToggle
            seeMore={!this.state.expanded}
            onToggle={this.toggleExpanded}
          />
          {this.props.selectAnotherProject ? (
            <View style={styles.select_different_project_style}>
              <Text
                onPress={this.props.projectClear}
                style={styles.select_different_project_style_text}
              >
                {i18n.t('label.different_project')}
              </Text>
            </View>
          ) : null}
        </View>
        {this.state.expanded ? (
          <View style={styles.plantProjectDetails}>
            <PlantProjectDetails {...detailsProps} />
          </View>
        ) : (
          <View style={styles.plantProjectDetails} />
        )}
        <View style={styles.buttonContainer}>
          {!this.props.selectAnotherProject ? (
            <PrimaryButton
              onClick={() => this.props.onSelectClickedFeaturedProjects(id)}
            >
              {i18n.t('label.select_project')}
            </PrimaryButton>
          ) : null}
          {this.props.showNextButton ? (
            <PrimaryButton onClick={() => this.props.onNextClick()}>
              {i18n.t('label.next')}
            </PrimaryButton>
          ) : null}
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
  projectClear: PropTypes.func
};

export default PlantProjectFull;
