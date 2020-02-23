import React from 'react';
import PropTypes from 'prop-types';
// import i18n from '../../locales/i18n.js';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import styles from '../../styles/newUserContributions/userContributions';
// import ShareIcon from '../../assets/images/share.png';
import { editIcon, deleteIcon, closeIcon } from '../../assets';
import { getLocalRoute } from '../../actions/apiRouting';
import i18n from '../../locales/i18n.js';
import PopupNative from '../Common/ModalDialog/Popup.native';
import NativeMapView, { mapStyle } from '../Map/NativeMapView.native';

export default class UserContributions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDeleteConfirmation: false };
  }

  _handleIndexChange = index => this.setState({ index });

  getMapComponent = userContribution => {
    let geoLatLong = `geoLongitude=${
      userContribution.geoLongitude
    }&geoLatitude=${userContribution.geoLatitude}&country=${
      userContribution.country
    }`;
    return (
      <NativeMapView
        mapType={'satellite'}
        mode={'single-tree'}
        geoLocation={geoLatLong}
        searchPlacesBox={false}
        mapStyle={{
          height: Dimensions.get('window').height * 0.4
          // marginBottom:
        }}
        mapPadding={{ top: 0, right: 0, bottom: 14, left: 0 }}
        customMapStyle={mapStyle}
      />
    );
  };

  render() {
    const { showDeleteConfirmation } = this.state;
    const props = this.props;
    const {
      treeCount,
      plantProjectName,
      plantProjectSlug,
      headerText,
      plantedDate,
      treeClassification,
      contributionPersonPrefix,
      contributionPerson,
      contributionPersonSlug,
      navigation,
      updateStaticRoute,
      showDelete,
      mayUpdate,
      plantProjectId
    } = props;

    const textColor = '#87B738';
    const deleteConfirmColor = '#ee6453';
    return (
      <View style={styles.container}>
        {/* ===== Map View starts ===== */}
        <View style={styles.mapView}>
          {/* get the map component */}
          {this.getMapComponent(this.props.contribution)}

          {/* close icon - goes back to previous screen */}
          <TouchableOpacity
            onPress={props.onClickClose}
            style={[styles.button, styles.closeIcon]}
          >
            <View style={styles.closeContainer}>
              <Image style={{ width: 16, height: 16 }} source={closeIcon} />
            </View>
          </TouchableOpacity>

          {/* maps the date */}
          {plantedDate ? (
            <View style={styles.dateContainer}>
              <Text style={styles.plantedDate}>{plantedDate}</Text>
            </View>
          ) : null}
        </View>
        {/* ===== Map View Ends ===== */}

        {/* ===== Header and Sub header starts ===== */}
        <View style={styles.header}>
          {/* maps the tree count with contribution type : Gifted, Donated, Received */}
          {treeCount && treeCount > 0 ? (
            <Text style={styles.treeCount}>{headerText}</Text>
          ) : null}

          {/* maps the different icons : delete, edit and share */}
          <View style={{ flexDirection: 'row' }}>
            {/* shows delete icon if there is delete feature */}
            {showDelete ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showDeleteConfirmation: true
                  });
                }}
                style={styles.button}
              >
                <Image style={styles.image} source={deleteIcon} />
              </TouchableOpacity>
            ) : null}

            {/* shows edit icon if there is edit feature */}
            {mayUpdate ? (
              <TouchableOpacity
                onPress={props.onClickEdit}
                style={styles.button}
              >
                <Image style={styles.image} source={editIcon} />
              </TouchableOpacity>
            ) : null}

            {/* shows share icon as of now does nothing */}
            {/* <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Image style={styles.image} source={ShareIcon} />
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.subHeadContainer}>
          {/* maps the tree's genus and species if any */}
          {treeClassification && (
            <Text style={styles.subHeaderText}>{treeClassification}</Text>
          )}

          {/* maps the contributionPerson type and name of contributionPerson if any */}
          {contributionPersonPrefix &&
            contributionPerson && (
              <View style={styles.subHeaderTextContainer}>
                <Text>
                  <Text style={styles.subHeaderText}>
                    {contributionPersonPrefix}
                  </Text>
                  <Text
                    onPress={() => {
                      updateStaticRoute(
                        getLocalRoute('app_treecounter'),
                        navigation,
                        {
                          treeCounterId: contributionPersonSlug,
                          titleParam: contributionPerson
                        }
                      );
                    }}
                    style={[styles.subHeaderText, { color: textColor }]}
                  >
                    {' '}
                    {contributionPerson}
                  </Text>
                </Text>
              </View>
            )}

          {/* maps the project name by whom it was planted if any */}
          {plantProjectName && (
            <View style={styles.subHeaderTextContainer}>
              <Text>
                <Text style={styles.subHeaderText}>
                  {i18n.t('label.planted_by')}
                </Text>
                <Text
                  onPress={() => {
                    plantProjectSlug
                      ? navigation.navigate(getLocalRoute('app_treecounter'), {
                          treeCounterId: plantProjectId,
                          titleParam: plantProjectName
                        })
                      : null;
                  }}
                  style={[styles.subHeaderText, { color: textColor }]}
                >
                  {plantProjectName}
                </Text>
              </Text>
            </View>
          )}
        </View>
        {/* ===== Header and Sub header ends ===== */}

        {/*  Delete confirmation popup */}
        <PopupNative
          isOpen={showDeleteConfirmation}
          animationType={'fade'}
          clickOutClose
          containerStyle={{
            height:
              Platform.OS === 'android'
                ? Dimensions.get('window').height * 0.31
                : Dimensions.get('window').height * 0.24
          }}
          headerText={i18n.t('label.my_trees_delete_confirm')}
          bodyText={
            <View>
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 14,
                  lineHeight: 26
                }}
              >
                {i18n.t('label.deletion_warning_summary_contribution')}
              </Text>
            </View>
          }
          onCancel={() => {
            this.setState({
              showDeleteConfirmation: false
            });
          }}
          cancelText={i18n.t('label.cancel')}
          applyText={i18n.t('label.delete')}
          applyTextStyle={{ color: deleteConfirmColor }}
          onApply={() => {
            props.onClickDelete();
            this.setState({
              showDeleteConfirmation: false
            });
          }}
        />
      </View>
    );
  }
}

UserContributions.PropTypes = {
  treeCount: PropTypes.number,
  plantProjectName: PropTypes.string,
  plantProjectSlug: PropTypes.string,
  headerText: PropTypes.string,
  plantedDate: PropTypes.string,
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
  showDelete: PropTypes.bool,
  mayUpdate: PropTypes.bool,
  treeClassification: PropTypes.string,
  contributionPersonPrefix: PropTypes.string,
  contributionPerson: PropTypes.string,
  contributionPersonSlug: PropTypes.string
};
