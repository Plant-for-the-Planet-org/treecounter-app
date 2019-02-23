import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n.js';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import TouchableItem from '../../components/Common/TouchableItem';
import myTreesStyle from '../../styles/myTrees/user_contribution_card';
import { foldout, foldin, MapPinRed, EditOrange } from '../../assets';
import { getLocalRoute } from '../../actions/apiRouting';

import CardLayout from '../Common/Card';

export default class ChallengeCard extends React.Component {
  treeCountLine(treeCount, treeSpecies) {
    return treeCount + ' ' + (treeSpecies ? treeSpecies : '');
  }

  plantProjectLine(plantProjectName, country) {
    return (plantProjectName ? plantProjectName + ', ' : '') + country;
  }

  donateActionLine(isGift, plantDate, givee, giveeSlug) {
    return isGift
      ? [
          <Text>{'Gifted on ' + plantDate + ' to '}</Text>,
          <Text
            onPress={() =>
              this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug
              })
            }
          >
            {givee}
          </Text>
        ]
      : 'Donated on ' + plantDate;
  }

  tpoLine(tpoName) {
    return tpoName ? 'Planted by ' + tpoName : '';
  }

  plantActionLine(plantDate, registrationDate) {
    return 'Planted on ' + plantDate + ', Added on ' + registrationDate;
  }

  dedicateActionLine = (isGift, givee, giveeSlug) => {
    return isGift
      ? [
          <Text>Dedicated to</Text>,
          <Text
            onPress={() =>
              this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug
              })
            }
          >
            {' ' + givee}
          </Text>
        ]
      : '';
  };

  redeemActionLine(redemptionCode, redemptionDate, givee, giveeSlug) {
    return redemptionCode && giver
      ? [
          <Text>{'Given on ' + redemptionDate + ' by '}</Text>,
          <Text
            onPress={() =>
              this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug
              })
            }
          >
            {givee}
          </Text>
        ]
      : redemptionCode
        ? 'Redeemed on ' + redemptionDate
        : 'Dedicated on ' +
          redemptionDate +
          (givee
            ? [
                <Text>{' by '}</Text>,
                <Text
                  onPress={() =>
                    this.props.navigation.navigate(
                      getLocalRoute('app_treecounter'),
                      {
                        treeCounterId: giveeSlug
                      }
                    )
                  }
                >
                  {givee}
                </Text>
              ]
            : '');
  }

  render() {
    let { challenge } = this.props;
    let { direction, goal, end_date, status, created, fullname } = challenge;

    let treeCountLine = this.treeCountLine(treeCount, treeSpecies);
    let plantProjectLine = this.plantProjectLine(plantProjectName, country);
    let donateActionLine = this.donateActionLine(
      isGift,
      plantDate,
      givee,
      giveeSlug
    );
    let tpoLine = this.tpoLine(tpoName);
    let plantActionLine = this.plantActionLine(plantDate, registrationDate);
    let dedicateActionLine = this.dedicateActionLine(givee, giveeSlug);
    let redeemActionLine = this.redeemActionLine(
      redemptionCode,
      redemptionDate,
      givee,
      giveeSlug
    );
    let labelColor = cardType === 'pending' ? '#e6e6e6' : '#95c243';
    let borderColor =
      contributionType == 'donation'
        ? '#95c243'
        : treeCount > 1
          ? '#68aeec'
          : '#ec6453';
    let styles = myTreesStyle(labelColor, borderColor);
    return contributionType === 'donation' ? (
      <CardLayout style={styles.addPadding}>
        <View style={[styles.leftBorder, styles.leftColorBorder]} />
        {treeCountLine ? (
          <Text style={[styles.boldText, styles.gap]}>{treeCountLine}</Text>
        ) : null}
        {plantProjectLine ? (
          <Text
            numberOfLines={1}
            style={[styles.gap, styles.restrictTextLength]}
          >
            {plantProjectLine}
          </Text>
        ) : null}
        {donateActionLine ? (
          <Text
            numberOfLines={1}
            style={[styles.gap, styles.restrictTextLength]}
          >
            {donateActionLine}
          </Text>
        ) : null}
        {tpoLine ? (
          <Text numberOfLines={1} style={styles.restrictTextLength}>
            {tpoLine}
          </Text>
        ) : null}
        {mayUpdate ? (
          <Text
            style={styles.updateTextStyle}
            onPress={() => {
              this.props.navigation.navigate(getLocalRoute('app_editTrees'), {
                selectedTreeId: contribution.id,
                contribution
              });
            }}
          >
            {i18n.t('label.update')}
          </Text>
        ) : null}
        <View style={styles.labelStyle}>
          <Text style={styles.labelTextStyle}>
            {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
          </Text>
        </View>
      </CardLayout>
    ) : contributionType === 'planting' ? (
      <CardLayout style={styles.addPadding}>
        <View style={[styles.leftBorder, styles.leftColorBorder]} />
        {treeCountLine ? (
          <Text style={[styles.boldText, styles.gap]}>{treeCountLine}</Text>
        ) : null}
        {plantProjectLine ? (
          <Text
            numberOfLines={1}
            style={[styles.gap, styles.restrictTextLength]}
          >
            {plantProjectLine}
          </Text>
        ) : null}
        {plantActionLine ? (
          <Text
            numberOfLines={1}
            style={[styles.gap, styles.restrictTextLength]}
          >
            {plantActionLine}
          </Text>
        ) : null}
        {dedicateActionLine ? (
          <Text numberOfLines={1} style={styles.restrictTextLength}>
            {dedicateActionLine}
          </Text>
        ) : null}
        {mayUpdate ? (
          <Text
            style={styles.updateTextStyle}
            onPress={() => {
              this.props.navigation.navigate(getLocalRoute('app_editTrees'), {
                selectedTreeId: contribution.id,
                contribution
              });
            }}
          >
            {i18n.t('label.update')}
          </Text>
        ) : null}
        <View style={styles.labelStyle}>
          <Text style={styles.labelTextStyle}>
            {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
          </Text>
        </View>
      </CardLayout>
    ) : (
      <CardLayout style={styles.addPadding}>
        <View style={[styles.leftBorder, styles.leftColorBorder]} />
        {treeCountLine ? (
          <Text style={[styles.boldText, styles.gap]}>{treeCountLine}</Text>
        ) : null}
        {plantProjectLine ? (
          <Text
            numberOfLines={1}
            style={[styles.gap, styles.restrictTextLength]}
          >
            {plantProjectLine}
          </Text>
        ) : null}
        {redeemActionLine ? (
          <Text
            numberOfLines={1}
            style={[styles.gap, styles.restrictTextLength]}
          >
            {redeemActionLine}
          </Text>
        ) : null}
        {tpoLine ? (
          <Text numberOfLines={1} style={styles.restrictTextLength}>
            {tpoLine}
          </Text>
        ) : null}
        {mayUpdate ? (
          <Text
            style={styles.updateTextStyle}
            onPress={() => {
              this.props.navigation.navigate(getLocalRoute('app_editTrees'), {
                selectedTreeId: contribution.id,
                contribution
              });
            }}
          >
            {i18n.t('label.update')}
          </Text>
        ) : null}
        <View style={styles.labelStyle}>
          <Text style={styles.labelTextStyle}>
            {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
          </Text>
        </View>
      </CardLayout>
    );
  }
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired
};
