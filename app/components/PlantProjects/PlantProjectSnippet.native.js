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
  tick,
  location_grey,
  survival_grey,
  tax_grey,
  leaf,
  leafGray,
  snippetTree
} from '../../assets';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import { formatNumber } from '../../utils/utils';
import { getISOToCountryName } from '../../helpers/utils';
import CardLayout from '../Common/Card';
import PlantedProgressBar from './PlantedProgressbar.native';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleRating, { GenerateStar } from '../Reviews/SingleRating';
//keeping Icon here instead of in assets
const starIcon = <Icon name="star" size={14} color="#89b53a" />;

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectSnippet extends PureComponent {
  // toggleExpanded(id) {
  //   this.props.onMoreClick(id);
  // }
  containerPress = () => {
    if (this.props.onMoreClick) {
      const { id, name } = this.props.plantProject;
      this.props.onMoreClick(id, name);
    }
  };

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
      paymentSetup,
      survivalRate,
      // images,
      imageFile,
      reviewScore: plantProjectRating,
      reviews,
      survivalRateStatus
      // description,
      // homepageUrl: homepageUrl,
      // homepageCaption: homepageCaption,
      // videoUrl: videoUrl,
      // geoLocation
    } = this.props.plantProject;
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
    let deducibleText1 = '';
    // let tooltipText1 = '';
    for (let i = 0; i < specsProps.taxDeduction.length; i++) {
      deducibleText1 += specsProps.taxDeduction[i];
      if (i == specsProps.taxDeduction.length - 1) {
        deducibleText1 += '.';
      } else {
        deducibleText1 += ', ';
      }
    }
    const survivalRateLeaf =
      survivalRateStatus == 'verified'
        ? leaf
        : survivalRateStatus == 'self-reported'
          ? leafGray
          : null;
    let onPressHandler = this.props.clickable ? this.containerPress : undefined;
    const textColor = '#4d5153';
    return (
      <TouchableHighlight underlayColor={'white'} onPress={onPressHandler}>
        <View style={[styles.projectSnippetContainer]} withoutShadow>
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
          />
          <View style={styles.projectSpecsContainer}>
            <View
              key="projectNameContainer"
              style={[styles.projectNameContainer, { paddingLeft: 10 }]}
            >
              <Text
                ellipsizeMode="tail"
                style={styles.project_teaser__contentText}
              >
                {`${teaserProps.projectName}  ${
                  teaserProps.tpoName ? 'by ' + teaserProps.tpoName : ''
                }`}
              </Text>
            </View>
            {reviews && reviews.length ? (
              <View
                style={[
                  styles.certifiedAndRatingContainer,
                  !isCertified && styles.withoutCertified
                ]}
              >
                <TouchableOpacity
                  style={{ height: 48, paddingTop: 13, flex: 1 }}
                  onPress={() => {
                    this.props.selectPlantProjectAction(id);
                    updateStaticRoute('app_reviews', this.props.navigation);
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={[
                        {
                          fontSize: 14,
                          color: textColor,
                          textAlign: 'center',
                          marginRight: 5,
                          marginLeft: 2
                        }
                      ]}
                    >
                      {(plantProjectRating / 100).toFixed(2) || '0.0'}
                    </Text>
                    <SingleRating
                      indexScore={{
                        score: Math.round(plantProjectRating / 100)
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
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
                source={snippetTree}
                style={{ width: 90, height: 90 }}
                resizeMode={'contain'}
              />
              <View
                style={{ flexDirection: 'column', flex: 1, paddingRight: 20 }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={location_grey}
                    style={{
                      width: 17,
                      height: 17,
                      marginRight: 10
                    }}
                  />
                  <Text style={styles.survivalText} ellipsizeMode="tail">
                    {getISOToCountryName(country).country}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Image
                    source={survival_grey}
                    style={{
                      width: 17,
                      height: 17,
                      marginRight: 10
                    }}
                  />
                  <View style={[styles.survivalText, { flexDirection: 'row' }]}>
                    <Text style={[styles.survivalText, { marginRight: 8 }]}>
                      {specsProps.survivalRate}% {i18n.t('label.survival_rate')}
                    </Text>
                    {survivalRateLeaf ? (
                      <Image
                        source={survivalRateLeaf}
                        style={{
                          width: 13,
                          height: 13
                        }}
                      />
                    ) : null}
                  </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Image
                    source={tax_grey}
                    style={{
                      width: 17,
                      height: 17,
                      marginRight: 10
                    }}
                  />
                  <Text style={styles.survivalText}>
                    {specsProps.taxDeduction && specsProps.taxDeduction.length
                      ? `${i18n.t('label.tax_deductible')} ${i18n.t(
                          'label.in'
                        )} ${deducibleText1}`
                      : i18n.t('label.no_tax_deduction')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
PlantProjectSnippet.defaultProps = { clickable: true, showCertifiedTag: true };
PlantProjectSnippet.propTypes = {
  plantProject: PropTypes.object.isRequired,
  callExpanded: PropTypes.func,
  tpoName: PropTypes.string,
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
      selectPlantProjectAction
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(PlantProjectSnippet);
