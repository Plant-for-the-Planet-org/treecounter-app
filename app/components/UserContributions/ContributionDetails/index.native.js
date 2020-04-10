import PropTypes from 'prop-types';
import React from 'react';
import { BackHandler, Image, Linking, ScrollView, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocalRoute } from '../../../actions/apiRouting';
import { deleteContribution } from '../../../actions/EditMyTree';
import { loadProject } from '../../../actions/loadTposAction';
import { selectPlantProjectAction } from '../../../actions/selectPlantProjectAction';
import { redMyLocationIcon } from '../../../assets';
import VideoContainer from '../../../components/Common/VideoContainer';
import { debug } from '../../../debug';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/newUserContributions/userContributions';
import colors from '../../../utils/constants';
import { delimitNumbers, formatDate } from '../../../utils/utils';
import Measurements from '../../Measurements/Measurements.native';
import PlantProjectImageCarousel from '../../PlantProjects/PlantProjectImageCarousel';
// import NDVI from '../../../containers/NDVI/NDVI';
import UserContributions from '../../UserContributions/userContribution.native';
import { updateStaticRoute } from './../../../helpers/routerHelper';
// import styles from '../../../styles/newUserContributions/userContributions';
import AccordionContactInfo from './../../PlantProjects/HelperComponents/AccordionContactInfo';


// eslint-disable-next-line no-underscore-dangle
const _goToURL = url => {
  Linking.openURL(url).catch(err => debug('Cannot open URI', err));
};

class UserContributionsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    let contribution = this.props.contribution;
    if (contribution.plantProjectId !== null) {
      this.props.loadProject({ id: contribution.plantProjectId });
    }
  }

  // adds back button listener on component mount
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  // removes back button listener on component mount
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  // handles back button press/gesture of device
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  // navigates to selected plant project screen on click of plant project link
  // and sets the selected plant project id in the redux state
  onPlantProjectClick = (plantProjectId, plantProjectName) => {
    this.props.selectPlantProjectAction(plantProjectId);

    this.props.navigation.navigate(getLocalRoute('app_selectedProject'), {
      treeCounterId: plantProjectId,
      titleParam: plantProjectName
    });
  };

  render() {
    if (!this.props.contribution) {
      return null;
    }

    // sets boolean value for hasMeasurements
    const hasMeasurements =
      this.props.contribution.contributionMeasurements &&
      Object.keys(this.props.contribution.contributionMeasurements).length > 0;

    // sets boolean value for ndviUid
    // let ndviUid = this.props.contribution && this.props.contribution.ndviUid;

    const {
      treeCount,
      plantDate,
      givee,
      giveeSlug,
      giver,
      giverSlug,
      cardType,
      contributionType,
      plantProjectId,
      isGift,
      redemptionCode,
      redemptionDate,
      plantProjectName,
      mayUpdate,
      contributionImages,
      treeType,
      treeSpecies,
      treeScientificName,
      geoLatitude,
      geoLongitude
    } = this.props.contribution;
    const plantProjects = this.props.plantProjects || [];
    // initializing variables
    let plantedDate = undefined;
    let plantProjectSlug = this.props.contribution.plantProjectSlug;
    let contributionPersonPrefix = undefined;
    let treeClassification = undefined;
    let contributionPerson = undefined;
    let contributionPersonSlug = undefined;
    let selectedPlantProjectDetails = undefined;
    let headerText = undefined;
    let videoUrl = undefined;
    let hasGeoLocationError = undefined;
    let locationErrorText = '';
    let contributionOrPlantedImages = contributionImages;

    // sets the header text
    // if treeType is null then header text is treecount and type of contribution
    if (treeType === null) {
      if (treeCount > 1) {
        headerText =
          delimitNumbers(treeCount) +
          ' ' +
          i18n.t('label.usr_contribution_tree');
      } else {
        headerText =
          delimitNumbers(treeCount) +
          ' ' +
          i18n.t('label.usr_contribution_single_tree');
      }
    }

    // if treeType is not null then header text is treecount, treeName and
    // type of contribution
    else if (treeType !== null) {
      if (treeCount > 1) {
        headerText =
          delimitNumbers(treeCount) +
          ' ' +
          treeType.charAt(0).toUpperCase() +
          treeType.slice(1) +
          ' ' +
          i18n.t('label.usr_contribution_tree');
      } else {
        headerText =
          delimitNumbers(treeCount) +
          ' ' +
          treeType.charAt(0).toUpperCase() +
          treeType.slice(1) +
          ' ' +
          i18n.t('label.usr_contribution_single_tree');
      }
    }

    // formats the plant date in 'MMMM d,  yyyy' format
    if (plantDate) {
      plantedDate = formatDate(plantDate, 'MMMM d,  yyyy');
    }
    if (redemptionDate) {
      plantedDate = formatDate(redemptionDate, 'MMMM d,  yyyy');
    }

    // if (plantProjects[0]) {
    //   videoUrl = plantProjects[0].videoUrl;
    //   if (cardType !== 'planted') {
    //     contributionOrPlantedImages = plantProjects[0].plantProjectImages;
    //   }
    //   plantProjectSlug = plantProjects[0].slug;
    // }

    if (plantProjects.length > 0) {
      for (let i = 0; i < plantProjects.length; i++) {
        if (plantProjects[i].id === plantProjectId) {
          selectedPlantProjectDetails = plantProjects[i];
          break;
        }
      }
      if (selectedPlantProjectDetails) {
        videoUrl = selectedPlantProjectDetails.videoUrl;
        if (cardType !== 'planted') {
          contributionOrPlantedImages =
            selectedPlantProjectDetails.plantProjectImages;
        }
        plantProjectSlug = selectedPlantProjectDetails.slug;
      }
    }

    // // adds planted by if plantProjectName is present
    // if (plantProjectName) {
    //   plantProjectName = plantProjectName;
    // }
    // adds donated to header text if cardtype id donation
    if (cardType === 'donation') {
      headerText = headerText + ' ' + i18n.t('label.donated');
    }

    if (isGift && givee) {
      // if contribution type is planting and id Gift = true then contribution
      // is dedicated
      if (contributionType === 'planting') {
        contributionPersonPrefix = i18n.t(
          'label.usr_contribution_dedicated_to'
        );
      }
      // contribution is gifted if contribution type is not planting
      // and adds gifted to header text
      else {
        headerText = headerText + ' ' + i18n.t('label.gifted');
        contributionPersonPrefix = i18n.t('label.usr_contribution_to');
      }
      // sets the contribution person name
      contributionPerson = givee;

      // sets slug if available
      if (giveeSlug) {
        contributionPersonSlug = giveeSlug;
      }
    }

    // if giver is present the header text adds contribution type to received
    // and contribution prefix to "from"
    if (giver) {
      contributionPerson = giver;
      headerText = headerText + ' ' + i18n.t('label.received');
      contributionPersonPrefix = i18n.t('label.usr_contribution_from');
      if (giverSlug) {
        contributionPersonSlug = giverSlug;
      }
    }

    // if there's redemptionCode the contribution type is set to redeemed
    if (redemptionCode && givee) {
      headerText = headerText + ' ' + i18n.t('label.usr_contribution_redeemed');
    }

    // if there's scientific name then maps it
    if (treeScientificName) {
      treeClassification = treeScientificName;
      if (treeSpecies) {
        treeClassification = treeClassification + ' ' + treeSpecies;
      }
    }

    if (geoLatitude === geoLongitude) {
      hasGeoLocationError = true;
      locationErrorText = i18n.t('label.geolocation_default_error');
      if (contributionType === 'planting') {
        locationErrorText =
          locationErrorText + ' ' + i18n.t('label.geolocation_error_by_user');
      } else {
        locationErrorText =
          locationErrorText +
          ' ' +
          i18n.t('label.geolocation_error_by_project');
      }
    }
    return (
      <View style={{ flex: 1, backgroundColor: colors.WHITE, marginTop: 10, }}>
        <ScrollView style={styles.scrollViewContainer} contentContainerStyle={{}}>
          <UserContributions
            isFromUserProfile={this.props.isFromUserProfile}
            mayUpdate={mayUpdate}
            treeCount={treeCount}
            plantProjectName={plantProjectName}
            plantProjectSlug={plantProjectSlug}
            contributionPersonPrefix={contributionPersonPrefix}
            contributionPerson={contributionPerson}
            contributionPersonSlug={contributionPersonSlug}
            navigation={this.props.navigation}
            updateStaticRoute={updateStaticRoute}
            treeClassification={treeClassification}
            plantedDate={plantedDate}
            showDelete={contributionType == 'planting'}
            headerText={headerText}
            plantProjectId={plantProjectId}
            onPlantProjectClick={this.onPlantProjectClick}
            onClickDelete={() => {
              this.props.deleteContribution(
                this.props.contribution.id,
                this.props.navigation
              );
              this.props.navigation.goBack();
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

          {/* displays image carousel if any image or video is available */}
          {(videoUrl ||

            (contributionOrPlantedImages &&
              contributionOrPlantedImages.length > 0)) && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 30
                }}
              >
                {/* {debug('\x1b[46m \x1b[30m video', videoUrl)} */}
                {videoUrl ? <VideoContainer url={videoUrl} /> : null}
                {/* TODO Add thumbnail for video */}
                {contributionOrPlantedImages &&
                  contributionOrPlantedImages.length > 0 && (
                    <PlantProjectImageCarousel
                      resizeMode={'cover'}
                      images={contributionOrPlantedImages}
                      aspectRatio={16 / 9}
                      videoUrl={videoUrl}
                    />
                  )}
              </ScrollView>
            )}

          {/* displays error message if geoLatitude and geoLongitude are same */}
          {hasGeoLocationError ? (
            <View style={styles.locationErrorContainer}>
              <Image
                style={[styles.icon, { marginRight: 20, marginTop: 5 }]}
                source={redMyLocationIcon}
              />
              <Text style={styles.locationErrorText}>{locationErrorText}</Text>
            </View>
          ) : null}

          {/* displays measurements if available */}
          {/* if contribution type is planting gives Add Measurement button */}
          {hasMeasurements ? (
            <View style={{ marginHorizontal: 20, marginTop: 30 }}>
              <Measurements
                measurements={this.props.contribution.contributionMeasurements}
                // isPlanting={contributionType === 'planting' ? true : false}
                isPlanting={false}
              />
            </View>
          ) : null}

          {/* displays project contact card if project is available
          in the contribution */}
          {selectedPlantProjectDetails && selectedPlantProjectDetails.tpoData ? (
            <View style={{ marginBottom: 30 }}>
              <AccordionContactInfo
                navigation={this.props.navigation}
                slug={selectedPlantProjectDetails.tpoData.treecounterSlug}
                updateStaticRoute={updateStaticRoute}
                url={selectedPlantProjectDetails.url}
                _goToURL={_goToURL}
                email={selectedPlantProjectDetails.tpoData.email}
                address={selectedPlantProjectDetails.tpoData.address}
                name={selectedPlantProjectDetails.tpoData.name}
                title={selectedPlantProjectDetails.tpoData.name}
              />
            </View>
          ) : null}

          {/* certificate and share button not required as of now */}
          {/* <View style={styles.buttonGroup}>
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
        </View> */}

          {/* {ndviUid ? (
          <View style={{ marginLeft: 8, marginRight: 8, marginTop: 20 }}>
            <NDVI ndviUid={ndviUid} />
          </View>
        ) : null} */}

        </ScrollView>
      </View>

    );
  }
}

UserContributionsDetails.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  contribution: PropTypes.object.isRequired,
  plantProjects: PropTypes.any,
  deleteContribution: PropTypes.func
};

const mapStateToProps = state => {
  return {
    // userProfileId: currentUserProfileIdSelector(state),
    // plantProjects: getAllPlantProjectsSelector(state)
    // entities: plantProjectsSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteContribution,
      loadProject,
      selectPlantProjectAction
    },
    dispatch
  );
};
// const UserCont  = withNavigation(UserContributionsDetails);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(UserContributionsDetails));
