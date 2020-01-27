import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking
} from 'react-native';
import PropTypes from 'prop-types';
import NDVI from '../../../containers/NDVI/NDVI';
import UserContributions from '../../UserContributions/userContribution.native';
import Measurements from '../../Measurements/Measurements.native';
import { formatDateForContribution } from '../../../utils/utils';
import i18n from '../../../locales/i18n.js';
import { withNavigation } from 'react-navigation';
import PlantProjectImageCarousel from '../../PlantProjects/PlantProjectImageCarousel';
import { getLocalRoute } from '../../../actions/apiRouting';
import { downloadGreen, sendWhite, closeIcon } from '../../../assets';
import styles from '../../../styles/newUserContributions/userContributions';
import AccordionContactInfo from './../../PlantProjects/HelperComponents/AccordionContactInfo';
import { updateStaticRoute } from './../../../helpers/routerHelper';
import { BackHandler } from 'react-native';

class UserContributionsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
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
      cardType,
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

    console.log('\x1b[45mthis.props.contribution \n', this.props.contribution);
    console.log('\x1b[0m');

    let plantedDate = undefined;
    let dedicatedTo = undefined;
    let contributionTypeText = undefined;
    let location = undefined;
    let contributerPrefix = undefined;
    let contributer = undefined;
    // let isSinglePlanted = false;
    let contributionOrPlantedImages = contributionImages;
    let selectedPlantProjectDetails = undefined;

    if (plantDate) {
      plantedDate = formatDateForContribution(plantDate);
    }
    if (cardType === 'planting') {
      // contributionTypeText = i18n.t('label.usr_contribution_planted');
      contributionTypeText = '';
      // TODO: check if this is a logic error, as this var is never used!
      // isSinglePlanted = treeCount > 1 ? false : true;
    } else if (cardType === 'donation') {
      if (plantProjects.length > 0) {
        for (let i = 0; i <= plantProjects.length; ) {
          if (plantProjects[i].id === plantProjectId) {
            selectedPlantProjectDetails = plantProjects[i];
          }
        }
        if (selectedPlantProjectDetails.length > 0) {
          selectedPlantProjectDetails = selectedPlantProjectDetails[0];
          contributionOrPlantedImages =
            selectedPlantProjectDetails.plantProjectImages;
          ndviUid = selectedPlantProjectDetails.ndviUid;
        }
      }

      contributionTypeText = i18n.t('label.donated');
      if (plantProjectName) {
        // location = `${plantProjectName} by ${tpoName ? tpoName : ''}`;
        location = plantProjectName;
      }
    } else if (cardType === 'gift') {
      if (plantProjectName) {
        location = plantProjectName;
      }
      contributionTypeText = i18n.t('label.received');
      contributerPrefix = i18n.t('label.usr_contribution_from');
      contributer = giver;
    }

    if (givee) {
      contributerPrefix = i18n.t('label.usr_contribution_to');
      contributer = givee;
      if (isGift) {
        // dedicatedTo = i18n.t('label.usr_contribution_from');
        contributionTypeText = i18n.t('label.gifted');
      }
    }

    if (isGift && giver) {
      contributer = giver;
      contributionTypeText = i18n.t('label.received');
      contributerPrefix = i18n.t('label.usr_contribution_from');
    }
    if (redemptionCode && givee) {
      plantedDate = formatDateForContribution(redemptionDate);
      if (plantProjectName) {
        location = plantProjectName;
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
          contributerPrefix={contributerPrefix}
          contributer={contributer}
          plantedDate={plantedDate}
          showDelete={contributionType == 'planting'}
          contributionTypeText={contributionTypeText}
          onClickDelete={() => {
            this.props.navigation.navigate('delete_contribution', {
              deleteContribution: () =>
                this.props.deleteContribution(
                  this.props.contribution.id,
                  this.props.navigation
                )
            });
          }}
          onClickEdit={() => {
            this.props.navigation.navigate(getLocalRoute('app_editTrees'), {
              selectedTreeId: this.props.contribution.id,
              contribution: this.props.contribution
            });
          }}
          onClickClose={() => {
            this.props.navigation.goBack();
          }}
          contribution={this.props.contribution}
        />

        {contributionOrPlantedImages &&
          contributionOrPlantedImages.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 30,
                borderWidth: 1
              }}
            >
              {/* {videoUrl ? <VideoContainer url={videoUrl} /> : null} */}
              {/* TODO Add thumbnail for video */}
              <PlantProjectImageCarousel
                resizeMode={'cover'}
                images={contributionOrPlantedImages}
                aspectRatio={16 / 9}
                // videoUrl={videoUrl}
              />
            </ScrollView>
          )}
        {hasMeasurements ? (
          <View style={{ marginHorizontal: 20, marginTop: 30 }}>
            <Measurements
              measurements={this.props.contribution.contributionMeasurements}
            />
          </View>
        ) : null}

        <View style={{ marginTop: 20 }} />

        {this.props.contribution.contributionType === 'donation' ? (
          <AccordionContactInfo
            navigation={this.props.navigation}
            slug={'edenprojects'}
            updateStaticRoute={updateStaticRoute}
            url={'edenprojects.org'}
            _goToURL={_goToURL}
            email={'email@email.com'}
            address={'edenprojects'}
            name={this.props.contribution.plantProjectName}
            title={this.props.contribution.plantProjectName}
          />
        ) : null}

        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={() => {}} style={{}}>
            <View style={[styles.buttonContainer, styles.borderGreen]}>
              <Image style={{ width: 16, height: 16 }} source={downloadGreen} />
              <Text style={styles.borderedButtonText}>Certificate</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={{}}>
            <View
              style={[
                styles.buttonContainer,
                styles.bgGreen,
                styles.borderGreen
              ]}
            >
              <Image style={{ width: 16, height: 16 }} source={sendWhite} />
              <Text style={styles.bgButtonText}>Share</Text>
            </View>
          </TouchableOpacity>
        </View>

        {ndviUid ? (
          <View style={{ marginLeft: 8, marginRight: 8, marginTop: 20 }}>
            <NDVI ndviUid={ndviUid} />
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

const _goToURL = url => {
  Linking.openURL(url).catch(err => console.log('Cannot open URI', err));
};

UserContributionsDetails.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  contribution: PropTypes.object.isRequired,
  plantProjects: PropTypes.object,
  deleteContribution: PropTypes.func
};

export default withNavigation(UserContributionsDetails);
