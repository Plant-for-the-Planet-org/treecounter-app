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
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.currency_symbols = {
      USD: '$', // US Dollar
      EUR: '€', // Euro
      CRC: '₡', // Costa Rican Colón
      GBP: '£', // British Pound Sterling
      ILS: '₪', // Israeli New Sheqel
      INR: '₹', // Indian Rupee
      JPY: '¥', // Japanese Yen
      KRW: '₩', // South Korean Won
      NGN: '₦', // Nigerian Naira
      PHP: '₱', // Philippine Peso
      PLN: 'zł', // Polish Zloty
      PYG: '₲', // Paraguayan Guarani
      THB: '฿', // Thai Baht
      UAH: '₴', // Ukrainian Hryvnia
      VND: '₫' // Vietnamese Dong
    };
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
    let tooltipText1 = '';
    for (let i = 0; i < specsProps.taxDeduction.length; i++) {
      deducibleText1 += specsProps.taxDeduction[i];
      if (i == specsProps.taxDeduction.length - 1) {
        deducibleText1 += '.';
      } else {
        deducibleText1 += ',';
      }
    }
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => this.containerPress(id)}
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
            <View style={styles.projectNameContainer}>
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
            <View style={styles.projectdetailsContainer}>
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
                  {this.currency_symbols[currency]
                    ? this.currency_symbols[currency]
                    : currency}{' '}
                  {specsProps.treeCost}
                </Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <View style={styles.byOrgContainer}>
                <Text
                  style={styles.byOrgText}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {teaserProps.tpoName}
                </Text>
              </View>

              {this.props.plantProject.allowDonations ? (
                <View style={styles.buttonContainer}>
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

PlantProjectSnippet.propTypes = {
  plantProject: PropTypes.object.isRequired,
  callExpanded: PropTypes.func,
  tpoName: PropTypes.string,
  selectAnotherProject: PropTypes.bool,
  projectClear: PropTypes.func,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  onSelectClickedFeaturedProjects: PropTypes.func
};

export default PlantProjectSnippet;
