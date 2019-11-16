import React from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import NDVI from '../../../containers/NDVI/NDVI';
import UserContributions from '../../UserContributions/userContribution.native';
import Measurements from '../../Measurements/Measurements.native';
import { formatDate } from '../../../utils/utils';
import i18n from '../../../locales/i18n.js';
import { withNavigation } from 'react-navigation';
import PlantProjectImageCarousel from '../../PlantProjects/PlantProjectImageCarousel';
import { getLocalRoute } from '../../../actions/apiRouting';

class UserContributionsDetails extends React.Component {
  render() {
    if (!this.props.contribution) {
      return null;
    }
    const hasMeasurements =
      this.props.contribution.contributionMeasurements &&
      Object.keys(this.props.contribution.contributionMeasurements).length > 0;
    let ndviUid = this.props.contribution && this.props.contribution.ndviUid;
    const {
      treeCount,
      plantDate,
      givee,
      // eslint-disable-next-line no-unused-vars
      giveeSlug,
      contributionType,
      plantProjectId,
      isGift,
      redemptionCode,
      redemptionDate,
      plantProjectName,
      tpoName,
      giver,
      mayUpdate,
      contributionImages
    } = this.props.contribution;
    const plantProjects = this.props.plantProjects || [];

    let plantedDate = undefined;
    let dedicatedTo = undefined;
    let contributionTypeText = undefined;
    let location = undefined;
    // let isSinglePlanted = false;
    let contributionOrPlantedImages = contributionImages;
    let selectedPlantProjectDetails = undefined;

    if (plantDate) {
      plantedDate = formatDate(plantDate);
    }
    if (contributionType === 'planting') {
      contributionTypeText = i18n.t('label.usr_contribution_planted');
      // TODO: check if this is a logic error, as this var is never used!
      // isSinglePlanted = treeCount > 1 ? false : true;
    } else if (contributionType === 'donation') {
      if (plantProjects.length > 0) {
        selectedPlantProjectDetails = plantProjects.filter(
          project => project.id === plantProjectId
        );
        if (selectedPlantProjectDetails.length > 0) {
          selectedPlantProjectDetails = selectedPlantProjectDetails[0];
          contributionOrPlantedImages =
            selectedPlantProjectDetails.plantProjectImages;
          ndviUid = selectedPlantProjectDetails.ndviUid;
        }
      }

      contributionTypeText = i18n.t('label.donation_contribution');
      if (plantProjectName) {
        location = `${plantProjectName} by ${tpoName ? tpoName : ''}`;
      }
    }

    if (givee) {
      if (isGift) {
        dedicatedTo = i18n.t('label.label.gifted_to_person', { person: givee });
        contributionTypeText = i18n.t('label.usr_contribution_dedicate');
      } else {
        dedicatedTo = i18n.t('label.dedicated_to_person', { person: givee });
      }
    }

    if (isGift && giver) {
      contributionTypeText = i18n.t('label.gift');
      dedicatedTo = i18n.t('label.label.gifted_from_person', { person: givee });
    }
    if (redemptionCode && givee) {
      plantedDate = formatDate(redemptionDate);
      if (plantProjectName) {
        location = `${plantProjectName} by ${tpoName ? tpoName : ''}`;
      }
      contributionTypeText = i18n.t('label.usr_contribution_redeemed');
    }

    const backgroundColor = '#fff';

    return (
      <ScrollView style={{ backgroundColor: { backgroundColor }, flex: 1 }}>
        <UserContributions
          mayUpdate={mayUpdate}
          treeCount={treeCount}
          location={location}
          dedicatedTo={dedicatedTo}
          plantedDate={plantedDate}
          showDelete={contributionType == 'planting'}
          contributionTypeText={contributionTypeText}
          onClickDelete={() => {
            this.props.navigation.navigate('delete_contribution', {
              deleteContribution: () =>
                this.props.deleteContribution(this.props.contribution.id)
            });
          }}
          onClickEdit={() => {
            this.props.navigation.navigate(getLocalRoute('app_editTrees'), {
              selectedTreeId: this.props.contribution.id,
              contribution: this.props.contribution
            });
          }}
        />

        {contributionOrPlantedImages &&
          contributionOrPlantedImages.length > 0 && (
            <PlantProjectImageCarousel
              images={contributionOrPlantedImages}
              pictureType={
                contributionType == 'planting' ? 'contribution' : undefined
              }
            />
          )}
        {hasMeasurements ? (
          <Measurements
            measurements={this.props.contribution.contributionMeasurements}
          />
        ) : null}

        {ndviUid ? (
          <View style={{ marginLeft: 8, marginRight: 8, marginTop: 20 }}>
            <NDVI ndviUid={ndviUid} />
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

UserContributionsDetails.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  contribution: PropTypes.object.isRequired,
  plantProjects: PropTypes.object,
  deleteContribution: PropTypes.func
};

export default withNavigation(UserContributionsDetails);
