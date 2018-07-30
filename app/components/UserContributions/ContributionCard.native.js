import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import Accordion from 'react-native-collapsible/Accordion';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n.js';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import faqStyles from '../../styles/faq.native';
import { foldout } from '../../assets';
export default class ContributionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      viewExpanded: false
    };
  }

  _renderContent(section) {
    return (
      <View style={faqStyles.content}>
        <Text>Test Data</Text>
      </View>
    );
  }

  _renderHeader(section, index, isActive) {
    return (
      <View style={faqStyles.header}>
        <Text style={faqStyles.headerText}>Details</Text>
        <Image
          style={faqStyles.imageStyle}
          source={isActive ? foldin : foldout}
        />
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
            padding: 10,
            justifyContent: 'space-between',
            minHeight: 100,
            marginBottom: 10,
            margin: 10
          }}
          key={`contribution-${contribution.id}`}
        >
          <View className="contribution-container__left-column">
            <Text strong={true}>
              {contribution.treeCount +
                contribution.treeSpecies +
                i18n.t('label.tree')}
            </Text>
            <Text>
              {contribution.geoLatitude + ', ' + contribution.geoLongitude}
            </Text>
            <Text>
              {moment(new Date(contribution.plantDate)).format('DD MMM YYYY')}
            </Text>
            {imagesArray.length ? (
              // <a onClick={this.openLightbox}>{i18n.t('label.pictures')}</a>
              <Text onPress={this.openLightbox}>
                {i18n.t('label.pictures')}
              </Text>
            ) : null}
            {contribution.contributionMeasurements.length > 0 ? (
              <Accordion
                sections={contribution.contributionMeasurements}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                touchableComponent={TouchableOpacity}
              />
            ) : null}
          </View>
          <View>
            <Text>{i18n.t('label.update')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired
};
