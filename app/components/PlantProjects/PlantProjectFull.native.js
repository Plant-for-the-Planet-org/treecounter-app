import React from 'react';
import PropTypes from 'prop-types';

import SeeMoreToggle from '../Common/SeeMoreToggle';
import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import PlantProjectDetails from './PlantProjectDetails';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { ScrollView } from 'react-native';
import PlantProjectFull2 from './PlantProjectFull2.native';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectFull extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      images,
      description,
      homepageUrl: homepageUrl,
      homepageCaption: homepageCaption,
      videoUrl: videoUrl,
      geoLocation,
      plantProjectImages
    } = this.props.plantProject;

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
      <ScrollView>
        <CardLayout style={styles.projectFullContainer}>
          <PlantProjectFull2
            key={'projectFull' + this.props.plantProject.id}
            showMoreButton={false}
            plantProject={this.props.plantProject}
            onSelectClickedFeaturedProjects={id => this.props.selectProject(id)}
            tpoName={this.props.plantProject.tpo_name}
          />
          <View style={styles.plantProjectDetails}>
            <PlantProjectDetails {...detailsProps} />
          </View>

          <View style={styles.buttonContainer}>
            {this.props.showGoback ? (
              <PrimaryButton onClick={() => this.props.onBackClick()}>
                GO Back
              </PrimaryButton>
            ) : null}
          </View>
        </CardLayout>
      </ScrollView>
    );
  }
}

PlantProjectFull.propTypes = {
  plantProject: PropTypes.object.isRequired,
  tpoName: PropTypes.string,
  projectClear: PropTypes.func,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  selectProject: PropTypes.func,
  showGoback: PropTypes.bool,
  onBackClick: PropTypes.func
};

export default PlantProjectFull;
