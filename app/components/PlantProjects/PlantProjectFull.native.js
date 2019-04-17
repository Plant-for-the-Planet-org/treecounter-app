import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import PlantProjectDetails from './PlantProjectDetails';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { ScrollView } from 'react-native';
import PlantProjectSnippet from './PlantProjectSnippet.native';
import scrollStyle from '../../styles/common/scrollStyle';
import TabContainer from '../../containers/Menu/TabContainer';
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
      plantProjectImages,
      url,
      linkText,
      tpo_name
    } = this.props.plantProject;

    const detailsProps = {
      description,
      images,
      homepageUrl,
      homepageCaption,
      videoUrl,
      mapData: queryParamsToObject(geoLocation),
      plantProjectImages,
      url,
      linkText
    };
    return (
      <View>
        <ScrollView contentContainerStyle={scrollStyle.styleContainer}>
          <CardLayout style={styles.projectFullContainer}>
            <PlantProjectSnippet
              cardStyle={styles.cardStyle}
              key={'projectFull' + this.props.plantProject.id}
              showMoreButton={false}
              clickable={false}
              plantProject={this.props.plantProject}
              onSelectClickedFeaturedProjects={id =>
                this.props.selectProject(id)
              }
              tpoName={tpo_name}
            />

            <View style={styles.horizontalRule} />
            <View style={styles.plantProjectDetails}>
              <PlantProjectDetails {...detailsProps} />
            </View>
            {this.props.plantProject.allowDonations ? (
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onClick={() =>
                    this.props.selectProject(this.props.plantProject.id)
                  }
                >
                  {i18n.t('label.donate')}
                </PrimaryButton>
              </View>
            ) : null}
          </CardLayout>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flex: 1,
            width: '100%'
          }}
        >
          <TabContainer {...this.props} />
        </View>
      </View>
    );
  }
  componentWillUnmount() {}
}

PlantProjectFull.propTypes = {
  plantProject: PropTypes.object.isRequired,
  tpoName: PropTypes.string,
  projectClear: PropTypes.func,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  selectProject: PropTypes.func,
  onBackClick: PropTypes.func
};

export default PlantProjectFull;
