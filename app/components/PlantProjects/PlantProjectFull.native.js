import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import PlantProjectDetails from './PlantProjectDetails';
import FullHeightButton from '../Common/Button/FullHeightButton';
import { ScrollView } from 'react-native';
import { nextArrowWhite } from '../../assets';
import stylesSnippet from '../../styles/selectplantproject/selectplantproject-snippet.native';
import PlantProjectSnippet from './PlantProjectSnippet.native';
import scrollStyle from '../../styles/common/scrollStyle.native';
import { formatNumber } from '../../utils/utils';
// import TabContainer from '../../containers/Menu/TabContainer';
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
      tpo_name,
      ndviUid
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
      linkText,
      ndviUid
    };
    const navigation = this.props.navigation;
    const backgroundColor = 'white';

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            scrollStyle.styleContainer,
            {
              paddingBottom: 72,
              backgroundColor: backgroundColor
            }
          ]}
        >
          <PlantProjectSnippet
            key={'projectFull' + this.props.plantProject.id}
            showMoreButton={false}
            clickable={false}
            plantProject={this.props.plantProject}
            onSelectClickedFeaturedProjects={id => this.props.selectProject(id)}
            tpoName={tpo_name}
            selectProject={this.props.selectProject}
            navigation={navigation}
          />

          {/* <View style={styles.horizontalRule} /> */}
          <View style={styles.plantProjectDetails}>
            <PlantProjectDetails
              currentUserProfile={this.props.currentUserProfile}
              navigation={navigation}
              {...detailsProps}
            />
          </View>
        </ScrollView>
        {this.props.plantProject.allowDonations ? (
          <View style={styles.bottomActionArea}>
            <View style={styles.centeredContentContainer}>
              <View style={stylesSnippet.costTextContainer}>
                <Text style={[stylesSnippet.costText]}>
                  {formatNumber(
                    this.props.plantProject.treeCost,
                    null,
                    this.props.plantProject.currency
                  )}
                </Text>
              </View>

              <Text style={[stylesSnippet.costPerTreeText]}>
                {i18n.t('label.cost_per_tree')}
              </Text>
            </View>
            <FullHeightButton
              buttonStyle={styles.squareButton}
              onClick={() =>
                this.props.selectProject(this.props.plantProject.id)
              }
              image={nextArrowWhite}
            >
              {i18n.t('label.donate')}
            </FullHeightButton>
          </View>
        ) : null}
      </View>
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
  onBackClick: PropTypes.func
};

export default PlantProjectFull;
