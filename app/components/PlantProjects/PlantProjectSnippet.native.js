import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { getImageUrl } from '../../actions/apiRouting';
import { targetPlanted, tick, questionmark_orange } from '../../assets';
import TouchableItem from '../Common/TouchableItem.native';
import PlantedProgressBar from './PlantedProgressbar.native';
import NumberFormat from '../Common/NumberFormat';
import { survivalRateIcon, taxIcon, locationMarker } from '../../assets';
import { formatNumber } from '../../utils/utils';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded(id) {
    this.props.onMoreClick(id);
  }
  containerPress(id) {
    if (this.props.onMoreClick) {
      this.props.onMoreClick(id);
    }
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
    let treePlantedRatio = (countPlanted / countTarget).toFixed(2);
    treePlantedRatio = parseFloat(treePlantedRatio);
    let treeCountWidth;
    if (treePlantedRatio > 1) {
      treeCountWidth = 100;
    } else if (treePlantedRatio < 0) {
      treeCountWidth = 0;
    } else {
      treeCountWidth = treePlantedRatio * 100;
    }

    if (imageFile) {
      projectImage = {
        image: imageFile
      };
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
    let tooltipText1 = '';
    for (let i = 0; i < specsProps.taxDeduction.length; i++) {
      deducibleText1 += specsProps.taxDeduction[i];
      if (i == specsProps.taxDeduction.length - 1) {
        deducibleText1 += '.';
      } else {
        deducibleText1 += ', ';
      }
    }
    let onPressHandler = undefined;
    if (this.props.clickable) {
      onPressHandler = () => this.containerPress(id);
    }
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={onPressHandler}
      >
        <CardLayout style={[styles.projectSnippetContainer]}>
          {' '}
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
              />{' '}
            </View>
          ) : null}{' '}
          <PlantedProgressBar
            countPlanted={specsProps.countPlanted}
            countTarget={specsProps.countTarget}
          />{' '}
          <View style={styles.projectSpecsContainer}>
            <View
              key="projectNameContainer"
              style={styles.projectNameContainer}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={styles.project_teaser__contentText}
              >
                {' '}
                {teaserProps.projectName} {/* by {teaserProps.tpoName} */}{' '}
              </Text>{' '}
              {teaserProps.isCertified ? (
                <Image
                  source={tick}
                  style={{
                    width: 15,
                    height: 15,
                    marginLeft: 5,
                    maxWidth: '10%',
                    alignSelf: 'flex-start',
                    marginTop: 6
                  }}
                />
              ) : null}{' '}
            </View>{' '}
            <View
              key="projectdetailsContainer"
              style={styles.projectdetailsContainer}
            >
              <View style={styles.locationContainer}>
                {' '}
                {specsProps.location && specsProps.location !== 'undefined' ? (
                  <View style={styles.projectTextRowWithImage}>
                    <Image
                      source={locationMarker}
                      style={{
                        height: 16,
                        marginRight: 10
                      }}
                    />{' '}
                    <Text style={styles.locationText} ellipsizeMode="tail">
                      {' '}
                      {specsProps.location}{' '}
                    </Text>{' '}
                  </View>
                ) : null}{' '}
                {specsProps.survivalRate ? (
                  <View style={styles.projectTextRowWithImage}>
                    <Image
                      source={survivalRateIcon}
                      style={{
                        height: 16,
                        marginRight: 8
                      }}
                    />{' '}
                    <Text style={styles.survivalText}>
                      {' '}
                      {i18n.t('label.survival_rate')} {':'}{' '}
                      {specsProps.survivalRate} %
                    </Text>{' '}
                  </View>
                ) : null}{' '}
                {specsProps.taxDeduction && specsProps.taxDeduction.length ? (
                  <View style={styles.projectTextRowWithImage}>
                    <Image
                      source={taxIcon}
                      style={{
                        height: 16,
                        marginRight: 8
                      }}
                    />{' '}
                    <Text style={styles.survivalText}>
                      {' '}
                      {i18n.t('label.tax_deductible')} {i18n.t('label.in')}{' '}
                      {deducibleText1}{' '}
                    </Text>{' '}
                  </View>
                ) : (
                  <View style={styles.projectTextRowWithImage}>
                    <Image
                      source={taxIcon}
                      style={{
                        height: 16,
                        marginRight: 8
                      }}
                    />{' '}
                    <Text style={styles.survivalText}>
                      {' '}
                      {i18n.t('label.no_tax_deductible')}{' '}
                    </Text>{' '}
                  </View>
                )}{' '}
              </View>
              <View style={styles.costContainer}>
                <Text style={styles.costText}>
                  {' '}
                  {formatNumber(specsProps.treeCost, null, currency)}{' '}
                </Text>{' '}
                <Text
                  style={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: 12,
                    textAlign: 'center'
                  }}
                >
                  {' '}
                  {i18n.t('label.perTree')}{' '}
                </Text>{' '}
              </View>{' '}
            </View>
            <View key="actionContainer" style={styles.actionContainer}>
              <View key="buttonContainer" style={styles.buttonContainer}>
                <PrimaryButton
                  style={styles.buttonItem}
                  buttonStyle={styles.buttonStyle}
                  textStyle={styles.buttonTextStyle}
                  onClick={() => this.props.onSelectClickedFeaturedProjects(id)}
                >
                  <Text> {i18n.t('label.share')} </Text>{' '}
                </PrimaryButton>{' '}
              </View>
              {this.props.plantProject.allowDonations ? (
                <View key="buttonContainer" style={styles.buttonContainer}>
                  <PrimaryButton
                    style={styles.buttonItem}
                    buttonStyle={styles.buttonStyle2}
                    textStyle={styles.buttonTextStyle2}
                    onClick={() =>
                      this.props.onSelectClickedFeaturedProjects(id)
                    }
                  >
                    <Text> {i18n.t('label.donate')} </Text>{' '}
                  </PrimaryButton>{' '}
                </View>
              ) : null}{' '}
            </View>{' '}
          </View>{' '}
        </CardLayout>{' '}
      </TouchableHighlight>
    );
  }
}
PlantProjectSnippet.defaultProps = {
  clickable: true
};
PlantProjectSnippet.propTypes = {
  plantProject: PropTypes.object.isRequired,
  callExpanded: PropTypes.func,
  tpoName: PropTypes.string,
  selectAnotherProject: PropTypes.bool,
  projectClear: PropTypes.func,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  onSelectClickedFeaturedProjects: PropTypes.func,
  clickable: PropTypes.bool
};

export default PlantProjectSnippet;
