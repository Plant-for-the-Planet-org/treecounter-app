import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full2.native';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { getImageUrl } from '../../actions/apiRouting';
import { targetPlanted } from '../../assets';
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
    let treeCountWidth = 100 - countPlanted / countTarget * 100;

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
    return (
      <CardLayout style={[styles.projectFullContainer, this.props.cardStyle]}>
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
        <View style={styles.projectSpecsContainer}>
          <View style={styles.treeCounterContainer}>
            <View style={[styles.treePlantedContainer]}>
              <View
                style={[styles.treePlantedChildContainer]}
                style={
                  treeCountWidth > 0
                    ? {
                        height: '100%',
                        flexDirection: 'row',
                        backgroundColor: '#b9d384',
                        borderColor: '#b9d384',
                        width: treeCountWidth + '%',
                        paddingRight: 10,
                        padding: 5,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderWidth: 0.5
                      }
                    : {
                        height: '100%',
                        flexDirection: 'row'
                      }
                }
              >
                <Text style={styles.treePlantedtext}>
                  {specsProps.countPlanted}
                </Text>
                <Text style={styles.treePlantedtext}>
                  {i18n.t('label.trees')}
                </Text>
              </View>
            </View>

            <View style={[styles.targetContainer]}>
              <Text style={styles.treePlantedtext}>
                {specsProps.countTarget.toLocaleString('en')}
              </Text>
              <Image source={targetPlanted} style={{ width: 15, height: 15 }} />
            </View>
          </View>
          <View style={styles.projectNameContainer}>
            <Text style={styles.project_teaser__contentText}>
              {teaserProps.projectName}
            </Text>
          </View>
          <View style={styles.projectdetailsContainer}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>{specsProps.location}</Text>
              <Text style={styles.survivalText}>
                {i18n.t('label.survival_rate')} {':'} {specsProps.survivalRate}%
              </Text>
            </View>

            <View style={styles.costContainer}>
              <Text style={styles.costText}>${specsProps.treeCost}</Text>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.byOrgContainer}>
              <Text>{teaserProps.tpoName}</Text>
            </View>

            <View style={styles.buttonContainer}>
              {this.props.showMoreButton && (
                <PrimaryButton
                  style={styles.buttonItem}
                  buttonStyle={[styles.buttonStyle, styles.moreButtonStyle]}
                  textStyle={[
                    styles.moreButtonTextStyle,
                    styles.buttonTextStyle
                  ]}
                  onClick={() => this.toggleExpanded(id)}
                >
                  <Text>More</Text>
                </PrimaryButton>
              )}

              <PrimaryButton
                style={styles.buttonItem}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
                onClick={() => this.props.onSelectClickedFeaturedProjects(id)}
              >
                <Text>Donate</Text>
              </PrimaryButton>
            </View>
          </View>
        </View>
      </CardLayout>
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
