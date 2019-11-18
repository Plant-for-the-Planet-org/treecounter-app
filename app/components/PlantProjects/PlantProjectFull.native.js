import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import PlantProjectDetails from './PlantProjectDetails';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { ScrollView } from 'react-native';
import { updateStaticRoute } from '../../helpers/routerHelper';
import PlantProjectSnippet from './PlantProjectSnippet.native';
import scrollStyle from '../../styles/common/scrollStyle.native';
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
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 36,
                backgroundColor: '#89b53a',
                height: 52,
                borderRadius: 24,
                marginTop: 10,
                width: '85%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                updateStaticRoute('app_add_review', navigation);
              }}
            >
              <Text
                style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}
              >
                {i18n.t('label.write_reviews')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.horizontalRule} /> */}
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
                {i18n.t('label.donate_txt')}
              </PrimaryButton>
            </View>
          ) : null}
        </ScrollView>
        <TabContainer {...this.props} />
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
