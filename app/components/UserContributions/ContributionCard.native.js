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
import styles from '../../styles/myTrees/user_contribution_card';
import { foldout, foldin, MapPinRed, EditOrange } from '../../assets';
import { getLocalRoute } from '../../actions/apiRouting';
import { withNavigation } from 'react-navigation';
import Lightbox from 'react-native-lightbox';

const WINDOW_WIDTH = Dimensions.get('window').width;

import _ from 'lodash';
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
    console.log('section', section);
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

  render() {
    let { contribution } = this.props;
    let imagesArray = contribution.contributionImages.map(image => {
      return { src: getImageUrl('contribution', 'medium', image.image) };
    });
    let seeLabel = classnames('see-more-label-style', {
      'see-more__active': this.state.viewExpanded
    });
    return (
      <View>
        <View
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
              onPress={() => console.log('click action button')}
              text={i18n.t('label.map')}
              image={MapPinRed}
            />
            <ActionButton
              onPress={() => {
                console.log('click update button');
                this.props.navigation.navigate(getLocalRoute('app_editTrees'), {
                  selectedTreeId: contribution.id,
                  contribution
                });
              }}
              text={i18n.t('label.update')}
              image={EditOrange}
            />
          </View>
        </View>
      </View>
    );
  }
}

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired
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
  image: PropTypes.any
};

export default withNavigation(ContributionCard);
