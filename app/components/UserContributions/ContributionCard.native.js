import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getLocalRoute } from '../../actions/apiRouting';
import { foldin, foldout } from '../../assets';
import { multiple_trees, tree_1 } from '../../assets/index';
import TouchableItem from '../../components/Common/TouchableItem';
import { getISOToCountryName } from '../../helpers/utils';
import i18n from '../../locales/i18n.js';
import styles, { myTreesStyle } from '../../styles/myTrees/user_contribution_card';
import { delimitNumbers, formatDate } from '../../utils/utils';
const WINDOW_WIDTH = Dimensions.get('window').width;
export const ENABLED_NDVI = false;

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
                <Text>{formatDate(measurement.measurementDate)}</Text>
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
    return delimitNumbers(treeCount) + ' ' + (treeCount > 1 ? 'Trees' : 'Tree') + (treeSpecies ? treeSpecies : '');
  }

  plantProjectLine(plantProjectName, country) {
    let countryName = country && getISOToCountryName(country).country
    return (plantProjectName ? plantProjectName + ' ' : '') + countryName;
  }

  donateActionLine(isGift, plantDate, givee, giveeSlug) {
    return isGift
      ? [
        <Text key={`donateActionLine_10`}>
          {i18n.t('label.gifted_on_to', {
            date: formatDate(plantDate)
          })}
        </Text>,
        <Text
          key={`donateActionLine_11`}
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
      : i18n.t('label.donated_on', {
        date: formatDate(plantDate)
      });
  }

  tpoLine(tpoName) {
    return tpoName ? i18n.t('label.planted_by', { tpo: tpoName }) : '';
  }

  plantActionLine(plantDate, registrationDate) {
    return (
      i18n.t('label.planted_on', {
        date: formatDate(plantDate)
      }) +
      '\n' +
      i18n.t('label.added_on', {
        date: formatDate(registrationDate)
      })
    );
  }

  dedicateActionLine(isGift, givee, giveeSlug) {
    return isGift
      ? [
        <Text key={`dedicateActionLine_11`}>
          {i18n.t('label.dedicated_to')}
        </Text>,
        <Text
          key={`dedicateActionLine_12`}
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
  }

  redeemActionLine(redemptionCode, redemptionDate, givee, giveeSlug) {
    return redemptionCode && givee
      ? [
        <Text key={`redeemActionLine_11`}>
          {i18n.t('label.given_on_by', {
            date: formatDate(redemptionDate)
          })}
        </Text>,
        <Text
          key={`redeemActionLine_12`}
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
      : redemptionCode
        ? i18n.t('label.redeemed_on', {
          date: formatDate(redemptionDate)
        })
        : givee
          ? [
            <Text key={`dedicated_on_by_11`}>
              {i18n.t('label.dedicated_on_by', {
                date: formatDate(redemptionDate)
              })}
            </Text>,
            <Text
              key={`dedicated_on_by_12`}
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
              {' ' + givee}
            </Text>
          ]
          : i18n.t('label.dedicated_on', {
            date: formatDate(redemptionDate)
          });
  }

  getTreeImage = (treeCount) => {
    return treeCount > 1 ? <Image resizeMode={'contain'} source={multiple_trees} style={styles.multipleTrees} /> : <Image resizeMode={'contain'} source={tree_1} style={styles.treeImage} />;
  }

  donateActionLine = (plantDate) => {
    return `Donated on ${plantDate}`
  }
  giftActionLine = (plantDate, givee, giveeSlug) => {
    return `Gifted on ${plantDate} to ${givee}`
  }
  render() {
    let { contribution } = this.props;
    let {
      treeCount,
      plantProjectName,
      country,
      plantDate,
      givee,
      giveeSlug,
      tpoName,
      cardType,
      contributionType,
      redemptionDate,
      treeSpecies,
      isGift,
      registrationDate,
      redemptionCode,
      giver,
      giverSlug,
      plantProjectId,
      mayUpdate,
      contributionImages,
      treeType,
      treeScientificName,
      geoLatitude,
      geoLongitude
    } = contribution;

    // HeaderText -----
    let headerText = undefined;
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
    } else if (treeType !== null) {
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
    // HEader Text End 

    console.log('headerText,', headerText)


    // let imagesArray = contribution.contributionImages.map(image => {
    //   return { src: getImageUrl('contribution', 'medium', image.image) };
    // });
    // let seeLabel = classnames('see-more-label-style', {
    //   'see-more__active': this.state.viewExpanded
    // });
    console.log("contribution=", contribution)
    let treeCountLine = this.treeCountLine(treeCount, treeSpecies);
    let plantProjectLine = this.plantProjectLine(plantProjectName, country);
    // console.log(plantProjectName, 'plantProjectLine')
    // let donateActionLine = this.donateActionLine(
    //   isGift,
    //   plantDate,
    //   givee,
    //   giveeSlug
    // );
    let tpoLine = this.tpoLine(tpoName);
    // let plantActionLine = this.plantActionLine(plantDate, registrationDate);
    let dedicateActionLine = this.dedicateActionLine(isGift, givee, giveeSlug);
    let redeemActionLine = this.redeemActionLine(
      redemptionCode,
      redemptionDate,
      givee,
      giveeSlug
    );

    if (contributionType === 'donation') {
      console.log(' ------ donation start----------')
      console.log('treeCountLine =', this.treeCountLine(treeCount, treeSpecies))
      console.log('plantProjectLine =', this.plantProjectLine(plantProjectName, country))
      console.log('donateActionLine =', this.donateActionLine(plantDate))
      console.log('GiftActionLine =', this.giftActionLine(plantDate, givee, giveeSlug))
      console.log('tpoLine =', this.tpoLine(tpoName))
      console.log(' ------ donation End----------')
    }
    if (contributionType == 'planting') {
      console.log(' ------ planting start----------')
      console.log('treeCountLine =', this.treeCountLine(treeCount, treeSpecies))
      console.log('plantProjectLine =', this.plantProjectLine(plantProjectName, country))

      console.log('plantActionLine =', this.plantActionLine(plantDate, registrationDate))

      console.log('dedicateActionLine =', this.dedicateActionLine(isGift, givee, giveeSlug))
      console.log('tpoLine =', this.tpoLine(tpoName))
      console.log(' ------ planting End----------')
    }
    console.log(redeemActionLine, 'redeemActionLine')


    let labelColor = cardType === 'pending' ? '#e6e6e6' : '#95c243';
    let borderColor =
      contributionType == 'donation'
        ? '#95c243'
        : treeCount > 1
          ? '#68aeec'
          : '#ec6453';

    let styles = myTreesStyle(labelColor, borderColor);
    let singleRedeemObject = [styles.singleRedeemObject, { borderBottomWidth: this.props.isFromAnimatredCardList ? 0 : 1 }]
    let renderCard = () => {
      const { isFromAnimatredCardList } = this.props
      if (contributionType === 'donation') {

        return (
          <TouchableOpacity
            style={singleRedeemObject}
            onPress={() => {
              this.props.onPressSingleContribution(contribution);
            }}
          >
            <View>
              {plantDate && !isFromAnimatredCardList ? (
                <View style={styles.redeemObjectDate}>
                  <Text style={styles.redeemObjectDateText}>
                    {formatDate(plantDate)}
                  </Text>
                </View>
              ) : null}

              <View style={styles.redeemObjectTreesContainer}>
                <View style={styles.row1}>
                  <Text style={styles.redeemObjectTitle}>
                    {headerText}
                  </Text>
                  <View style={styles.row2}>
                    <Text style={styles.redeemObjectSubTitle}>{tpoLine}</Text>
                  </View>
                </View>
                <Text style={styles.redeemObjectTrees}>
                  {delimitNumbers(treeCount)}
                  {this.getTreeImage(treeCount)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else if (contributionType === 'planting') {
        return (
          <TouchableOpacity
            style={singleRedeemObject}
            onPress={() => {
              this.props.onPressSingleContribution(contribution);
            }}
          >
            <View>
              {plantDate && !isFromAnimatredCardList ? (
                <View style={styles.redeemObjectDate}>
                  <Text style={styles.redeemObjectDateText}>
                    {formatDate(plantDate)}
                  </Text>
                </View>
              ) : null}
              <View style={styles.redeemObjectTreesContainer}>
                <View style={styles.row1}>
                  <Text style={styles.redeemObjectTitle}>
                    {headerText}
                  </Text>
                  <Text style={styles.redeemObjectSubTitle}>
                    {plantProjectLine}
                  </Text>
                </View>
                <View style={styles.row2}>
                  <Text style={styles.redeemObjectTrees}>
                    {delimitNumbers(treeCount)}
                    {this.getTreeImage(treeCount)}
                  </Text>
                </View>

              </View>
              <View style={styles.dedicatedTagLine}>
                {dedicateActionLine ? (
                  <View style={styles.row2}>
                    <Text style={styles.redeemObjectSubTitle}>
                      {dedicateActionLine}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        );
      } else if (contribution.type === 'tpo-coupon') {
        return (
          <TouchableOpacity
            style={singleRedeemObject}
            onPress={() => {
              this.props.onPressSingleContribution(contribution);
            }}
          >
            <View>
              {redemptionDate && !isFromAnimatredCardList ? (
                <View style={styles.redeemObjectDate}>
                  <Text style={styles.redeemObjectDateText}>
                    {formatDate(redemptionDate)}
                  </Text>
                </View>
              ) : null}

              <View style={styles.redeemObjectTreesContainer}>
                <View style={styles.row1}>
                  <Text style={styles.redeemObjectTitle}>
                    {headerText}
                  </Text>
                  <View style={styles.row2}>
                    <Text style={styles.redeemObjectSubTitle}>{tpoLine}</Text>
                  </View>
                </View>
                <Text style={styles.redeemObjectTrees}>
                  {delimitNumbers(treeCount)}
                  {this.getTreeImage(treeCount)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={singleRedeemObject}
            onPress={() => {
              this.props.onPressSingleContribution(contribution);
            }}
          >
            <View>
              <View style={styles.redeemObjectTreesContainer}>
                <View style={styles.row1}>
                  <Text style={styles.redeemObjectTitle}>
                    {i18n.t('label.gifted_from_person') + contribution.giverName}
                  </Text>
                  <View style={styles.row2}>
                    <Text style={styles.redeemObjectSubTitle}>{tpoLine}</Text>
                  </View>
                </View>
                <Text style={styles.redeemObjectTrees}>
                  {delimitNumbers(treeCount)}
                  {this.getTreeImage(treeCount)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    };

    return renderCard();
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
