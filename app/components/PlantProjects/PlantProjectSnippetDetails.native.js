import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from 'react-native';

import { getImageUrl } from '../../actions/apiRouting';
import {
  location_grey,
  // survival_grey,
  tax_grey,
  leaf,
  leafGray
} from '../../assets';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/selectplantproject-snippetDetails.native';
import { getISOToCountryName } from '../../helpers/utils';
import PlantedProgressBar from './PlantedProgressbar.native';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { loadProject } from '../../actions/loadTposAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleRating from '../Reviews/SingleRating';
//keeping Icon here instead of in assets

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectSnippetDetails extends PureComponent {
  // toggleExpanded(id) {
  //   this.props.onMoreClick(id);
  // }
  state = { leafDetails: false };
  containerPress = () => {
    if (this.props.onMoreClick) {
      const { id, name } = this.props.plantProject;
      this.props.onMoreClick(id, name);
    }
  };
  getTaxCountries() {
    let { plantProject } = this.props;
    return (
      plantProject.taxDeductibleCountries &&
      plantProject.taxDeductibleCountries.length &&
      plantProject.taxDeductibleCountries
        .map(country => getISOToCountryName(country).country)
        .join(', ')
        .concat('.')
    );
  }
  cap(str) {
    return str[0].toUpperCase() + str.substr(1);
  }
  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      id,
      name: projectName,
      isCertified,
      plantProjectImages,
      location,
      country,
      countPlanted,
      countTarget,
      currency,
      treeCost,
      taxDeductibleCountries,
      survivalRate,
      // images,
      imageFile,
      image,
      reviewScore: plantProjectRating,
      reviews,
      survivalRateStatus
      // description,
      // homepageUrl: homepageUrl,
      // homepageCaption: homepageCaption,
      // videoUrl: videoUrl,
      // geoLocation
    } = this.props.plantProject;
    let tpo = this.props.plantProject.tpoData || {};
    let projectImage = null;
    // let treePlantedRatio = (countPlanted / countTarget).toFixed(2);
    // treePlantedRatio = parseFloat(treePlantedRatio);
    // let treeCountWidth;
    // if (treePlantedRatio > 1) {
    //   treeCountWidth = 100;
    // } else if (treePlantedRatio < 0) {
    //   treeCountWidth = 0;
    // } else {
    //   treeCountWidth = treePlantedRatio * 100;
    // }

    if (imageFile || image) {
      projectImage = { image: imageFile || image };
    } else {
      projectImage = plantProjectImages && plantProjectImages.find(() => true);
    }

    const teaserProps = {
      tpoName: tpo.name,
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
      taxDeductibleCountries
    };
    // const survivalRateLeaf =
    //   survivalRateStatus == 'verified'
    //     ? leaf
    //     : survivalRateStatus == 'self-reported'
    //       ? leafGray
    //       : null;
    // const survivalColor = survivalRateStatus == 'verified' ? '#89b53a' : 'gray';
    let onPressHandler = this.props.clickable ? this.containerPress : undefined;
    return (
      <TouchableHighlight underlayColor={'white'} onPress={onPressHandler}>
        <View style={[styles.projectSnippetContainer]}>
          {projectImage ? (
            <View style={styles.projectImageContainer}>
              <Image
                style={styles.teaser__projectImage}
                source={{
                  uri: getImageUrl(
                    'project',
                    'large',
                    teaserProps.projectImage.image
                  )
                }}
                resizeMode={'cover'}
              />
            </View>
          ) : null}
          <PlantedProgressBar
            countPlanted={specsProps.countPlanted}
            countTarget={specsProps.countTarget}
            style={{ borderBottomLeftRadius: 7, borderBottomRightRadius: 0 }}
            treePlantedChildContainerStyle={{ borderBottomLeftRadius: 0 }}
            compact
          />
          <View
            style={[
              styles.projectSpecsContainer,
              { padding: 15, paddingTop: 20 }
            ]}
          >
            <View
              key="projectNameContainer"
              style={[styles.projectNameContainer]}
            >
              <Text
                ellipsizeMode="tail"
                style={styles.project_teaser__contentText}
              >
                {teaserProps.projectName}
                {/* TODO Add certified badge like twitter */}
              </Text>
            </View>
            {reviews && reviews.length ? (
              <TouchableOpacity
                style={{ paddingTop: 0, paddingLeft: 2, flex: 1 }}
                onPress={() => {
                  this.props.selectPlantProjectAction(id);
                  updateStaticRoute('app_reviews', this.props.navigation);
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SingleRating
                    name={(plantProjectRating / 100).toFixed(2) || '0.0'}
                    indexScore={{
                      score: Math.round(plantProjectRating / 100)
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : null}

            <View
              key="projectdetailsContainer"
              style={[
                styles.projectdetailsContainer,
                {
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flex: 1
                }
              ]}
            >
              <Image
                source={{
                  uri: getImageUrl('profile', 'avatar', tpo.avatar)
                }}
                style={{
                  width: 72,
                  height: 72,
                  paddingLeft: 5,
                  marginRight: 10,
                  borderRadius: 45
                }}
                resizeMode="cover"
              />
              <View>
                {getISOToCountryName(country).country ? (
                  <View style={[styles.iconTextRow, { marginTop: 0 }]}>
                    <Image source={location_grey} style={styles.iconImage} />
                    <Text style={styles.survivalText} ellipsizeMode="tail">
                      {getISOToCountryName(country).country}
                    </Text>
                  </View>
                ) : null}

                {/* <View style={styles.iconTextRow}>
                  <Image source={survival_grey} style={styles.iconImage} />
                  <View
                    style={[
                      styles.survivalText,
                      {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 5,
                        paddingBottom: 5
                      }
                    ]}
                  >
                    <Text style={[styles.survivalText, { marginRight: 5 }]}>
                      {specsProps.survivalRate}% {i18n.t('label.survival_rate')}
                    </Text>
                    {survivalRateLeaf ? (
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            leafDetails: !this.state.leafDetails
                          });
                        }}
                        style={{
                          height: 24,
                          hidth: 24
                        }}
                      >
                        {!this.state.leafDetails ? (
                          <View
                            style={{
                              minHeight: 24,
                              minWidth: 24,
                              padding: 3,

                              paddingLeft: 5,
                              paddingRight: 10,
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Image
                              source={survivalRateLeaf}
                              style={{
                                width: 16,
                                height: 16
                              }}
                            />
                          </View>
                        ) : (
                          <View
                            style={{
                              borderRadius: 24,
                              padding: 2,
                              paddingLeft: 10,
                              paddingRight: 10,
                              borderColor: survivalColor,
                              borderWidth: 1
                            }}
                          >
                            <Text
                              style={[
                                styles.survivalText,
                                { color: survivalColor }
                              ]}
                            >
                              {survivalRateStatus
                                ? this.cap(survivalRateStatus)
                                : ''}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View> */}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image
                      source={tax_grey}
                      style={{
                        width: 17,
                        height: 17,
                        marginRight: 10
                      }}
                    />
                    <Text
                      style={[
                        styles.survivalText,
                        {
                          marginRight: 20,
                          flex: 1,
                          flexWrap: 'wrap',
                          paddingRight: 20
                        }
                      ]}
                    >
                      {this.getTaxCountries()
                        ? `${i18n.t('label.tax_deductible')} ${i18n.t(
                            'label.in'
                          )} ${this.getTaxCountries()}`
                        : i18n.t('label.no_tax_deduction')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
PlantProjectSnippetDetails.defaultProps = {
  clickable: true,
  showCertifiedTag: true
};
PlantProjectSnippetDetails.propTypes = {
  plantProject: PropTypes.object.isRequired,
  callExpanded: PropTypes.func,
  selectAnotherProject: PropTypes.bool,
  projectClear: PropTypes.func,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  onMoreClick: PropTypes.func,
  onSelectClickedFeaturedProjects: PropTypes.func,
  clickable: PropTypes.bool,
  showCertifiedTag: PropTypes.bool,
  selectProject: PropTypes.func
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadProject,
      selectPlantProjectAction
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(PlantProjectSnippetDetails);
