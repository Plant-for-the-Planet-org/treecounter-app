import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import NDVI from '../../../containers/NDVI/NDVI';
import UserContributions from '../../UserContributions/userContribution.native';
import Measurements from '../../Measurements/Measurements.native';
import Alert from '../../Measurements/Alert.native';
import moment from 'moment';
import { getDateFromMySQL } from '../../../helpers/utils';
import i18n from '../../../locales/i18n.js';
import { withNavigation } from 'react-navigation';

import { getLocalRoute } from '../../../actions/apiRouting';

class UserContributionsDetails extends React.Component {
  render() {
    console.log(this.props.contribution, 'contribution');
    if (!this.props.contribution) {
      return null;
    }
    const hasMeasurements =
      this.props.contribution.contributionMeasurements &&
      Object.keys(this.props.contribution.contributionMeasurements).length > 0;
    const ndviUid = this.props.contribution && this.props.contribution.ndviUid;
    const {
      treeCount,
      plantDate,
      givee,
      giveeSlug,
      contributionType,
      plantProjectId,
      isGift,
      redemptionCode,
      redemptionDate,
      plantProjectName,
      tpoName,
      giver,
      mayUpdate
    } = this.props.contribution;
    let plantedDate = undefined;
    let dedicatedTo = undefined;
    let contributionTypeText = undefined;
    let location = undefined;
    let isSinglePlanted = false;

    if (plantDate) {
      plantedDate = moment(getDateFromMySQL(plantDate)).format('MMMM DD, YYYY');
    }
    if (contributionType === 'planting') {
      contributionTypeText = i18n.t('label.usr_contribution_planted');
      isSinglePlanted = treeCount > 1 ? false : true;
    } else if (contributionType === 'donation') {
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
      plantedDate = moment(getDateFromMySQL(redemptionDate)).format(
        'MMMM DD, YYYY'
      );
      if (plantProjectName) {
        location = `${plantProjectName} by ${tpoName ? tpoName : ''}`;
      }
      contributionTypeText = i18n.t('label.usr_contribution_redeemed');
    }

    return (
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        {!isSinglePlanted ? (
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
        ) : null}
        {hasMeasurements ? (
          <Measurements
            measurements={this.props.contribution.contributionMeasurements}
          />
        ) : null}

        {!!ndviUid ? <NDVI ndviUid={ndviUid} /> : null}
      </ScrollView>
    );
  }
}

UserContributionsDetails.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  contribution: PropTypes.object.isRequired,
  supportTreecounter: PropTypes.object,
  deleteContribution: PropTypes.func
};

export default withNavigation(UserContributionsDetails);
