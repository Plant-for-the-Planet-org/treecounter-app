import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import Accordion from 'react-native-collapsible/Accordion';
import { getImageUrl } from '../../actions/apiRouting';
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
import { withNavigation } from 'react-navigation';
import { delimitNumbers } from '../../utils/utils';
import Lightbox from 'react-native-lightbox';

const WINDOW_WIDTH = Dimensions.get('window').width;

import _ from 'lodash';
import CardLayout from '../Common/Card';
class ContributionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      viewExpanded: false
    };
  }

  _renderLightBox = imageArray => (
    <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH }}>
      <FlatList
        horizontal
        data={imageArray}
        renderItem={({ item }) => (
          <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH }}>
            <Image
              style={{ flex: 1 }}
              resizeMode="contain"
              source={{
                uri: item.src
              }}
            />
          </View>
        )}
      />
    </View>
  );
  _renderContent(section) {
    const measurementsAvailable =
      section.contributionMeasurements &&
      section.contributionMeasurements.length > 0;
    return (
      <View style={styles.content}>
        {section.treeScientificName ? (
          <Text>{'Scientific Name: ' + section.treeScientificName}</Text>
        ) : null}
        {measurementsAvailable ? (
          <View>
            <View style={styles.actionBar}>
              <Text>{'Measurement Date'}</Text>
              <Text>{'Height'}</Text>
              <Text>{'Diameter'}</Text>
            </View>
            <View style={styles.seprator} />
          </View>
        ) : null}
        {measurementsAvailable
          ? section.contributionMeasurements.map((measurement, index) => {
              return (
                <View style={styles.actionBar} key={`measurement-${index}`}>
                  <Text>
                    {moment(new Date(measurement.measurementDate)).format(
                      'DD MMM YYYY'
                    )}
                  </Text>
                  <Text>
                    {_.padStart(
                      (measurement.height * 10).toFixed(1) + ' ' + 'mm',
                      10
                    )}
                  </Text>
                  <Text>
                    {_.padStart(measurement.diameter + ' ' + 'cm', 10)}
                  </Text>
                </View>
              );
            })
          : null}
      </View>
    );
  }

  _renderHeader(section, index, isActive) {
    return (
      <View style={styles.header}>
        <Image
          resizeMode="center"
          style={styles.imageStyle}
          source={isActive ? foldin : foldout}
        />
        <Text style={styles.headerText}>Details</Text>
      </View>
    );
  }
  closeLightbox = () => this.setState({ lightboxIsOpen: false });

  openLightbox = () => this.setState({ lightboxIsOpen: true });

  gotoPrevious = () =>
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  gotoNext = () =>
    this.setState({
      currentImage: this.state.currentImage + 1
    });

  onViewExpanded = () =>
    this.setState({
      viewExpanded: !this.state.viewExpanded
    });

  treeCountLine(treeCount, treeSpecies) {
    return delimitNumbers(treeCount) + ' ' + (treeSpecies ? treeSpecies : '');
  }

  plantProjectLine(plantProjectName, country) {
    return (plantProjectName ? plantProjectName + ', ' : '') + country;
  }

  donateActionLine(isGift, plantDate, givee, giveeSlug) {
    return isGift
      ? [
          <Text>
            {'Gifted on ' +
              moment(new Date(plantDate)).format('DD MMM YYYY') +
              ' to '}
          </Text>,
          <Text
            onPress={() =>
              this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug,
                titleParam: givee
              })
            }
          >
            {givee}
          </Text>
        ]
      : 'Donated on ' + moment(new Date(plantDate)).format('DD MMM YYYY');
  }

  tpoLine(tpoName) {
    return tpoName ? 'Planted by ' + tpoName : '';
  }

  plantActionLine(plantDate, registrationDate) {
    return (
      'Planted on ' +
      moment(new Date(plantDate)).format('DD MMM YYYY') +
      ', Added on ' +
      moment(new Date(registrationDate)).format('DD MMM YYYY')
    );
  }

  dedicateActionLine = (isGift, givee, giveeSlug) => {
    return isGift
      ? [
          <Text>Dedicated to</Text>,
          <Text
            onPress={() =>
              this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug,
                titleParam: givee
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
          <Text>
            {'Given on ' +
              moment(new Date(redemptionDate)).format('DD MMM YYYY') +
              ' by '}
          </Text>,
          <Text
            onPress={() =>
              this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug,
                titleParam: givee
              })
            }
          >
            {givee}
          </Text>
        ]
      : redemptionCode
        ? 'Redeemed on ' +
          moment(new Date(redemptionDate)).format('DD MMM YYYY')
        : 'Dedicated on ' +
          moment(new Date(redemptionDate)).format('DD MMM YYYY') +
          (givee
            ? [
                <Text>{' by '}</Text>,
                <Text
                  onPress={() =>
                    this.props.navigation.navigate(
                      getLocalRoute('app_treecounter'),
                      {
                        treeCounterId: giveeSlug,
                        titleParam: givee
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
    let { contribution } = this.props;
    let {
      treeCount,
      treeSpecies,
      plantProjectName,
      country,
      isGift,
      plantDate,
      givee,
      giveeSlug,
      tpoName,
      mayUpdate,
      cardType,
      contributionType,
      registrationDate,
      redemptionCode,
      redemptionDate
    } = contribution;
    // let imagesArray = contribution.contributionImages.map(image => {
    //   return { src: getImageUrl('contribution', 'medium', image.image) };
    // });
    // let seeLabel = classnames('see-more-label-style', {
    //   'see-more__active': this.state.viewExpanded
    // });

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
          <Text
            numberOfLines={1}
            style={[styles.boldText, styles.gap, styles.restrictTextLength]}
          >
            {treeCountLine}
          </Text>
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
            {cardType && cardType.length > 0
              ? cardType.charAt(0).toUpperCase() + cardType.slice(1)
              : ''}
          </Text>
        </View>
      </CardLayout>
    ) : contributionType === 'planting' ? (
      <CardLayout style={[styles.addPadding, styles.minHeight]}>
        <View style={[styles.leftBorder, styles.leftColorBorder]} />
        {treeCountLine ? (
          <Text
            numberOfLines={1}
            style={[styles.boldText, styles.gap, styles.restrictTextLength]}
          >
            {treeCountLine}
          </Text>
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
        <Text
          style={styles.deleteTextStyle}
          onPress={() => {
            this.props.navigation.navigate('delete_contribution', {
              deleteContribution: () =>
                this.props.deleteContribution(contribution.id)
            });
          }}
        >
          {i18n.t('label.delete')}
        </Text>
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
            {cardType && cardType.length > 0
              ? cardType.charAt(0).toUpperCase() + cardType.slice(1)
              : ''}
          </Text>
        </View>
      </CardLayout>
    ) : (
      <CardLayout style={styles.addPadding}>
        <View style={[styles.leftBorder, styles.leftColorBorder]} />
        {treeCountLine ? (
          <Text
            numberOfLines={1}
            style={[styles.boldText, styles.gap, styles.restrictTextLength]}
          >
            {treeCountLine}
          </Text>
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
            {cardType && cardType.length > 0
              ? cardType.charAt(0).toUpperCase() + cardType.slice(1)
              : ''}
          </Text>
        </View>
      </CardLayout>
    );
  }
}

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired,
  deleteContribution: PropTypes.func,
  navigation: PropTypes.any
};

class ActionButton extends React.Component {
  render() {
    return (
      <TouchableItem
        activeOpacity={0.5}
        style={styles.actionButton}
        onPress={event => {
          this.props.onPress && this.props.onPress(event);
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {this.props.image != null ? (
            <Image
              resizeMode="center"
              source={this.props.image}
              style={styles.imageStyle}
            />
          ) : null}
          {this.props.text != null ? (
            <Text style={styles.actionButtonText}>{this.props.text}</Text>
          ) : null}
        </View>
      </TouchableItem>
    );
  }
}

ActionButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  image: PropTypes.any,
  navigation: PropTypes.any
};

export default withNavigation(ContributionCard);
