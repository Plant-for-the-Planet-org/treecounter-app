import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';

import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
import TextSpan from '../Common/Text/TextSpan';
import i18n from '../../locales/i18n.js';
import { View, Text } from 'react-native';

export default class ContributionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      viewExpanded: false
    };
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
            borderLeft:
              '5px solid ' +
              (contribution.contributionType == 'donation'
                ? '#95c243'
                : contribution.treeCount > 1
                  ? '#68aeec'
                  : '#ec6453')
          }}
          key={`contribution-${contribution.id}`}
          className={`contribution-container__card ${
            contribution.contributionType
          }`}
        >
          <View className="contribution-container__left-column">
            <Text strong={true}>
              {contribution.treeCount +
                ' ' +
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
            {/* <Lightbox
              currentImage={this.state.currentImage}
              images={imagesArray}
              isOpen={this.state.lightboxIsOpen}
              onClose={this.closeLightbox}
              onClickNext={this.gotoNext}
              onClickPrev={this.gotoPrevious}
            /> */}
          </View>
          <View className="contribution-container__right-column">
            {contribution.contributionMeasurements
              .slice(0, 3)
              .map(measurement => (
                <Text key={measurement.id}>
                  {contribution.plantDate === measurement.measurementDate
                    ? i18n.t('label.planting_day')
                    : new Date(
                        measurement.measurementDate
                      ).toLocaleDateString() +
                      (measurement.diameter + 'cm').padStart(10) +
                      ((measurement.height / 100).toFixed(1) + 'm').padStart(
                        10
                      )}
                </Text>
              ))}
            {contribution.contributionMeasurements.length > 3 ? (
              <View className={seeLabel} onPress={this.onViewExpanded}>
                {this.state.viewExpanded
                  ? i18n.t('label.see_less')
                  : '+ ' + i18n.t('label.see_more')}
              </View>
            ) : null}
            {this.state.viewExpanded
              ? contribution.contributionMeasurements
                  .slice(3)
                  .map(measurement => (
                    <Text key={measurement.id}>
                      {new Date(
                        measurement.measurementDate
                      ).toLocaleDateString() +
                        (measurement.diameter + 'cm').padStart(10) +
                        ((measurement.height / 100).toFixed(1) + 'm').padStart(
                          10
                        )}
                    </Text>
                  ))
              : null}
            {/* <Link
              to={getLocalRoute('app_editTrees', {
                contribution: contribution.id
              })}
            > */}
            <Text>{i18n.t('label.update')}</Text>
            {/* </Link> */}
          </View>
        </View>
        {/* <hr className="contribution-container__partition" /> */}
      </View>
    );
  }
}

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired
};
