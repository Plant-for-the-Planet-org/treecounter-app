import React from 'react';
import PropTypes from 'prop-types';
// import i18n from '../../locales/i18n.js';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/newUserContributions/userContributions';

import EditIcon from '../../assets/images/pencil.png';
import DeleteIcon from '../../assets/images/baseline_delete_outline.png';
import ShareIcon from '../../assets/images/share.png';
// import ArrowRight from '../../assets/images/arrow-right.png';
// import CalendarIcon from '../../assets/images/green-calendar.png';
// import TreeIcon from '../../assets/images/green-tree.png';
import {
  // grayShareIcon,
  closeIcon
} from '../../assets';
import i18n from '../../locales/i18n.js';
import MapView, { Marker } from 'react-native-maps';
import Smalltreewhite from '../../assets/images/smalltreewhite.png';

export default class UserContributions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _handleIndexChange = index => this.setState({ index });

  getMapComponent = ({ geoLongitude, geoLatitude }) => {
    let dummyLatLong = {
      latitude: geoLatitude,
      longitude: geoLongitude,
      latitudeDelta: 0.0000922,
      longitudeDelta: 0.00421
    };
    let markerLatLong = {
      latitude: geoLatitude,
      longitude: geoLongitude
    };
    return (
      <MapView
        mapType={'satellite'}
        style={{ flex: 1 }}
        initialRegion={dummyLatLong}
      >
        <Marker coordinate={markerLatLong}>
          <View style={styles.markerCircle}>
            <Image source={Smalltreewhite} resizeMode={'contain'} />
          </View>
        </Marker>
      </MapView>
    );
  };
  render() {
    const props = this.props;
    const {
      treeCount,
      location,
      headerText,
      // dedicatedTo,
      plantedDate,

      contributerPrefix,
      contributer,
      showDelete,
      mayUpdate,
      contribution
    } = props;
    // console.log(this.props, 'this.props');
    // console.log('\x1b[45mcontributer \n', redemptionDate);
    // console.log('\x1b[0m');
    const textColor = '#87B738';
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          {this.getMapComponent(this.props.contribution)}
          <TouchableOpacity
            onPress={props.onClickClose}
            style={[styles.button, styles.closeIcon]}
          >
            <View style={styles.closeContainer}>
              <Image style={{ width: 16, height: 16 }} source={closeIcon} />
            </View>
          </TouchableOpacity>
          {plantedDate ? (
            <View style={styles.dateContainer}>
              <Text style={styles.plantedDate}>{plantedDate}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.header}>
          {treeCount && treeCount > 0 ? (
            <Text style={styles.treeCount}>{headerText}</Text>
          ) : null}
          <View style={{ flexDirection: 'row' }}>
            {showDelete ? (
              <TouchableOpacity
                onPress={props.onClickDelete}
                style={styles.button}
              >
                <Image style={styles.image} source={DeleteIcon} />
              </TouchableOpacity>
            ) : null}
            {mayUpdate ? (
              <TouchableOpacity
                onPress={props.onClickEdit}
                style={styles.button}
              >
                <Image style={styles.image} source={EditIcon} />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Image style={styles.image} source={ShareIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.subHeadContainer}>
          {contributerPrefix &&
            contributer && (
              <Text style={styles.subHeaderText}>
                {contributerPrefix}
                <Text style={{ color: textColor }}> {contributer}</Text>
              </Text>
            )}
          {location && (
            <Text style={styles.subHeaderText}>
              {i18n.t('label.planted_at')}
              <Text style={{ color: textColor }}>{location}</Text>
            </Text>
          )}

          {contribution.contributionType === 'planting' ? (
            contribution.treeClassification ? (
              <Text style={styles.subHeaderText}>
                {contribution.treeClassification}
                {contribution.treeSpecies ? (
                  <Text> {contribution.treeSpecies}</Text>
                ) : null}
              </Text>
            ) : null
          ) : null}
        </View>

        {/* <View style={{ flex: 2 }}>
          {location ? (
            <View style={styles.itemContainer}>
              <Image source={TreeIcon} style={styles.icon} />
              <Text
                style={{
                  ...styles.text,
                  maxWidth: showDelete ? '50%' : '100%'
                }}
              >
                {location}
              </Text>
            </View>
          ) : null}

          {dedicatedTo ? (
            <View style={styles.itemContainer}>
              <Image source={ArrowRight} style={styles.icon} />
              <Text style={{ ...styles.text }}>{dedicatedTo}</Text>
            </View>
          ) : null}

          {plantedDate ? (
            <View style={styles.itemContainer}>
              <Image source={CalendarIcon} style={styles.icon} />
              <Text>just testing</Text>
              <Text style={{ ...styles.text }}>{plantedDate}</Text>
            </View>
          ) : null}
        </View>
 */}
        {/* <View style={styles.buttonsWrapper}>
          <TouchableOpacity style={styles.plantedButtonWrapper}>
            {!!contributionTypeText && (
              <Text style={styles.plantedText}>{contributionTypeText}</Text>
            )}
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

UserContributions.PropTypes = {
  treeCount: PropTypes.number,
  location: PropTypes.string,
  dedicatedTo: PropTypes.string,
  plantedDate: PropTypes.string,
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
  showDelete: PropTypes.bool,
  mayUpdate: PropTypes.bool
};
