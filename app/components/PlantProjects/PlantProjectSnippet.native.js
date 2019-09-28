import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';

import { getImageUrl } from '../../actions/apiRouting';
import { tick } from '../../assets';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import { formatNumber } from '../../utils/utils';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CardLayout from '../Common/Card';
import PlantedProgressBar from './PlantedProgressbar.native';

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
      id,
      name: projectName,
      isCertified,
      plantProjectImages,
      location,
      countPlanted,
      countTarget,
      currency,
      treeCost,
      paymentSetup,
      survivalRate,
      // images,
      imageFile
      // description,
      // homepageUrl: homepageUrl,
      // homepageCaption: homepageCaption,
      // videoUrl: videoUrl,
      // geoLocation
    } = this.props.plantProject;
    let projectImage = null;
    // eslint-disable-next-line no-unused-vars
    let treePlantedRatio = (countPlanted / countTarget).toFixed(2);
    treePlantedRatio = parseFloat(treePlantedRatio);
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
    let onPressHandler = this.props.clickable ? this.containerPress : undefined;
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={onPressHandler}
      >
        <CardLayout style={[styles.projectSnippetContainer]}>
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
          />
          <View style={styles.projectSpecsContainer}>
            <View
              key="projectNameContainer"
              style={styles.projectNameContainer}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.project_teaser__contentText}
              >
                {teaserProps.projectName}
              </Text>
              {teaserProps.isCertified ? (
                <Image
                  source={tick}
                  style={{
                    width: 15,
                    height: 15,
                    marginLeft: 5,
                    maxWidth: '10%'
                  }}
                />
              ) : null}
            </View>
            <View
              key="projectdetailsContainer"
              style={styles.projectdetailsContainer}
            >
              <View style={styles.locationContainer}>
                <Text style={styles.locationText} ellipsizeMode="tail">
                  {specsProps.location}
                </Text>
                <View>
                  <Text style={styles.survivalText}>
                    {i18n.t('label.survival_rate')} {':'}{' '}
                    {specsProps.survivalRate}%
                  </Text>
                </View>
                {specsProps.taxDeduction && specsProps.taxDeduction.length ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.survivalText}>
                      {i18n.t('label.tax_deductible')} {i18n.t('label.in')}{' '}
                      {deducibleText1}
                    </Text>
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
                ) : null}
              </View>

              <View style={styles.costContainer}>
                <Text style={styles.costText}>
                  {formatNumber(specsProps.treeCost, null, currency)}
                </Text>
              </View>
            </View>

            <View key="actionContainer" style={styles.actionContainer}>
              <View key="byOrgContainer" style={styles.byOrgContainer}>
                <Text
                  style={styles.byOrgText}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {teaserProps.tpoName}
                </Text>
              </View>

              {this.props.plantProject.allowDonations ? (
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
              ) : null}
            </View>
          </View>
        </CardLayout>
      </TouchableHighlight>
    );
  }
}
PlantProjectSnippet.defaultProps = { clickable: true };
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
  clickable: PropTypes.bool
};

export default PlantProjectSnippet;
