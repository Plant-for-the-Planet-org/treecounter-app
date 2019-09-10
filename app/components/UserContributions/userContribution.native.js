import React from 'react';
import PropTypes from 'prop-types';
// import i18n from '../../locales/i18n.js';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/newUserContributions/userContributions';

import EditIcon from '../../assets/images/pencil.png';
import DeleteIcon from '../../assets/images/baseline_delete_outline.png';
import ArrowRight from '../../assets/images/arrow-right.png';
import CalendarIcon from '../../assets/images/green-calendar.png';
import TreeIcon from '../../assets/images/green-tree.png';
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
      contributionTypeText
    } = props;

    return (
      <View style={styles.container}>
        <View style={{ flex: 2, paddingTop: 20 }}>
          {treeCount && treeCount > 0 ? (
            <Text style={styles.treeCount}>
              {treeCount
                ? `${treeCount} ${i18n.t('label.usr_contribution_tree')}`
                : 0 + i18n.t('label.usr_contribution_tree')}
            </Text>
          ) : null}
          {!!location ? (
            <View style={styles.itemContainer}>
              <Image source={TreeIcon} style={styles.icon} />
              <Text style={{ ...styles.text }}>{location}</Text>
            </View>
          ) : null}

          {!!dedicatedTo ? (
            <View style={styles.itemContainer}>
              <Image source={ArrowRight} style={styles.icon} />
              <Text style={{ ...styles.text }}>{dedicatedTo}</Text>
            </View>
          ) : null}

          {!!plantedDate ? (
            <View style={styles.itemContainer}>
              <Image source={CalendarIcon} style={styles.icon} />
              <Text style={{ ...styles.text }}>{plantedDate}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity style={styles.plantedButtonWrapper}>
            {!!contributionTypeText && (
              <Text style={styles.plantedText}>{contributionTypeText}</Text>
            )}
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <TouchableOpacity
              onPress={props.onClickDeleteUserContributor}
              style={styles.button}
            >
              <Image style={styles.image} source={DeleteIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onClickEditUserContributor}
              style={styles.button}
            >
              <Image style={styles.image} source={EditIcon} />
            </TouchableOpacity>
          </View>
        </View>
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
  contributionTypeText: PropTypes.string
};
