import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from 'react-native';
import SingleRating from '../Reviews/SingleRating';

import { getImageUrl } from '../../actions/apiRouting';
import {
  // tick,
  location_grey,
  survival_grey,
  tax_grey,
  leaf,
  leafGray
} from '../../assets';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import { getISOToCountryName } from '../../helpers/utils';
// import CardLayout from '../Common/Card';
import NumberFormat from '../Common/NumberFormat.native';
import PlantedProgressBar from './PlantedProgressbar.native';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//keeping Icon here instead of in assets
// const starIcon = <Icon name="star" size={14} color="#89b53a" />;

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
      taxDeductibleCountries,
      survivalRate,
      // images,
      imageFile,
      allowDonations,
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
    // debug('project image', projectImage);
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
      currency,
      treeCost,
      taxDeduction: taxDeductibleCountries
    };
    specsProps.survivalRate = survivalRate;
    let deducibleText1 = [];
    if (taxDeductibleCountries)
      for (let i = 0; i < taxDeductibleCountries.length; i++) {
        deducibleText1.push(
          getISOToCountryName(taxDeductibleCountries[i]).country
        );
      }
    deducibleText1 = deducibleText1.join(', ') + '.';
    const survivalRateLeaf =
      survivalRateStatus == 'verified'
        ? leaf
        : survivalRateStatus == 'self-reported'
          ? leafGray
          : null;
    let onPressHandler = this.props.clickable ? this.containerPress : undefined;

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
              {/* {reviews && reviews.length ? (
                <View style={styles.certifiedAndRatingContainer}>
                  <TouchableOpacity
                    style={styles.ratingTouchable}
                    onPress={() => {
                      this.props.selectPlantProjectAction(id);
                      updateStaticRoute('app_reviews', this.props.navigation);
                    }}
                  >
                    {isCertified ? (
                      <Image source={tick} style={styles.ratingTick} />
                    ) : null}
                    <Text style={styles.ratingCount}>
                      {(plantProjectRating / 100).toFixed(2) || '0.0'}
                    </Text>
                    {starIcon}
                  </TouchableOpacity>
                </View>
              ) : null} */}
            </View>
          ) : null}
          <PlantedProgressBar
            countPlanted={specsProps.countPlanted}
            countTarget={specsProps.countTarget}
            style={{ borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}
            treePlantedChildContainerStyle={{ borderBottomLeftRadius: 7 }}
          />
          <View style={styles.projectSpecsContainer}>
            <View
              key="projectNameContainer"
              style={styles.projectNameContainer}
            >
              <Text
                ellipsizeMode="tail"
                style={styles.project_teaser__contentText}
              >
                {teaserProps.projectName}
              </Text>
            </View>
            {reviews && reviews.length ? (
              <TouchableOpacity
                style={{ paddingTop: 10, paddingLeft: 2, flex: 1 }}
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
              style={styles.projectdetailsContainer}
            >
              <View style={styles.locationContainer}>
                {country ? (
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
                ) : null}

                {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Image
                    source={survival_grey}
                    style={{
                      width: 17,
                      height: 17,
                      marginRight: 10
                    }}
                  />
                  
                  
                  <View style={styles.survivalText}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.survivalText}>
                        {specsProps.survivalRate}%{' '}
                        {i18n.t('label.survival_rate')}
                      </Text>
                      {survivalRateLeaf ? (
                        <Text
                          style={{
                            padding: 5,
                            borderRadius: 12,
                            marginLeft: 4,
                            paddingBottom: 2,
                            paddingTop: 2
                          }}
                        >
                          <Image
                            source={survivalRateLeaf}
                            style={{
                              width: 13,
                              height: 13
                            }}
                          />
                        </Text>
                      ) : null}
                    </View>
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
                    <Text style={styles.survivalText}>
                      {specsProps.taxDeduction && specsProps.taxDeduction.length
                        ? `${i18n.t('label.tax_deductible')} ${i18n.t(
                            'label.in'
                          )} ${deducibleText1}`
                        : i18n.t('label.no_tax_deduction')}
                    </Text>
                  </View>

                  {/* <ReactNativeTooltipMenu
                      buttonComponent={
                        <Image
                          style={styles.project_specs__taxdeductibleIcon}
                          source={questionmark_orange}
                        />
                      }
                      items={[{ label: tooltipText1, onPress: () => {} }]}
                    /> */}
                </View>
              </View>
              {allowDonations ? (
                <TouchableOpacity
                  onPress={() => this.props.onSelectClickedFeaturedProjects(id)}
                >
                  <View style={styles.costContainer}>
                    <View style={styles.costTextContainer}>
                      <Text style={[styles.costText]}>
                        {/* {formatNumber(specsProps.treeCost, null, currency)} */}
                        <NumberFormat
                          data={specsProps.treeCost}
                          currency={currency}
                        />
                      </Text>
                    </View>

                    <Text style={[styles.costPerTreeText]}>
                      {i18n.t('label.cost_per_tree')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* <View key="actionContainer" style={styles.actionContainer}> */}
            {/* <View key="byOrgContainer" style={styles.byOrgContainer}>
                <Text
                  style={styles.byOrgText}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {teaserProps.tpoName}
                </Text>
              </View> */}

            {/* {this.props.plantProject.allowDonations ? (
                <View key="buttonContainer" style={styles.buttonContainer}>
                  <PrimaryButton
                    style={styles.buttonItem}
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    onClick={() =>
                      this.props.onSelectClickedFeaturedProjects(id)
                    }
                  >
                    <Text> {i18n.t('label.donate')}</Text>
                  </PrimaryButton>
                </View>
              ) : null} */}
            {/* </View> */}
          </View>
          {/* <View style={styles.horizontalLine} /> */}
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
