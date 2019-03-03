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
    //console.log('section', section);
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
                    {new Date(measurement.measurementDate).toLocaleDateString()}
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
        <Image style={styles.imageStyle} source={isActive ? foldin : foldout} />
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
      <CardLayout style={[styles.addPadding, styles.minHeight]}>
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
        <Text
          style={styles.deleteTextStyle}
          onPress={() => {
            this.props.navigation.navigate('delete_contribution', {
              deleteContribution: this.props.deleteContribution
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
    {
      /* <View
          style={{
            borderWidth: 1,
            borderLeftWidth: 4,
            borderColor: '#e6e6e6',
            borderLeftColor:
              contribution.contributionType == 'donation'
                ? '#95c243'
                : contribution.treeCount > 1
                  ? '#68aeec'
                  : '#ec6453',
            justifyContent: 'space-between',
            minHeight: 60,
            marginBottom: 10,
            margin: 10
          }}
          key={`contribution-${contribution.id}`}
        >
          <View style={styles.cardSubContainer}>
            <Text strong={true}>
              {contribution.treeCount +
                ' ' +
                contribution.treeSpecies +
                i18n.t('label.tree')}
            </Text>
            <Text style={styles.dateStyle}>
              {moment(new Date(contribution.plantDate)).format('DD MMM YYYY')}
            </Text>
            {imagesArray.length ? (
              <Lightbox
                backgroundColor={'rgba(52, 52, 52, 0.8)'}
                underlayColor={'white'}
                swipeToDismiss={false}
                renderContent={() => this._renderLightBox(imagesArray)}
              >
                <Text style={[styles.pictureText, { padding: 0 }]}>
                  {i18n.t('label.pictures')}
                </Text>
              </Lightbox>
            ) : null}
            {contribution.contributionMeasurements.length > 0 ? (
              <Accordion
                sections={[contribution]}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                touchableComponent={TouchableOpacity}
              />
            ) : null}
          </View>
          <View style={styles.actionBar}>
            <ActionButton
              onPress={() => null}
              text={i18n.t('label.map')}
              image={MapPinRed}
            />
          </View>
        </View>
      </View> */
    }
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
            <Image source={this.props.image} style={styles.imageStyle} />
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
