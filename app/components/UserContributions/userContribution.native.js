import React from 'react';
import PropTypes from 'prop-types';
// import i18n from '../../locales/i18n.js';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/newUserContributions/userContributions';

import EditIcon from '../../assets/images/pencil.png';
import DeleteIcon from '../../assets/images/baseline_delete_outline.png';
import ShareIcon from '../../assets/images/share.png';
import ArrowRight from '../../assets/images/arrow-right.png';
import CalendarIcon from '../../assets/images/green-calendar.png';
import TreeIcon from '../../assets/images/green-tree.png';
import { grayShareIcon, closeIcon } from '../../assets';
import i18n from '../../locales/i18n.js';

export default class UserContributions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _handleIndexChange = index => this.setState({ index });

  render() {
    const props = this.props;
    const {
      treeCount,
      location,
      dedicatedTo,
      plantedDate,
      contributionTypeText,
      contributerPrefix,
      contributer,
      showDelete,
      mayUpdate,
      contribution
    } = props;

    console.log('\x1b[45mcontributer \n', contributerPrefix, contributer);
    console.log('\x1b[0m');

    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
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
            <Text style={styles.treeCount}>
              {treeCount > 1
                ? `${treeCount} ${i18n.t('label.usr_contribution_tree')} `
                : `${treeCount} ${i18n.t(
                    'label.usr_contribution_single_tree'
                  )} `}
              {contributionTypeText}
            </Text>
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
                <Text style={{ color: '#87B738' }}> {contributer}</Text>
              </Text>
            )}
          {location && (
            <Text style={styles.subHeaderText}>
              {i18n.t('label.planted_at')}
              <Text style={{ color: '#87B738' }}>{location}</Text>
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
  contributionTypeText: PropTypes.string,
  showDelete: PropTypes.bool,
  mayUpdate: PropTypes.bool
};
