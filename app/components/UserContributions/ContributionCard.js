import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import Lightbox from 'react-images';

import { getImageUrl } from '../../actions/apiRouting';
import TextSpan from '../Common/Text/TextSpan';

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
      <div>
        <div
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
          <div className="contribution-container__left-column">
            <TextSpan strong={true}>
              {contribution.treeCount +
                ' ' +
                contribution.treeSpecies +
                ' tree'}
            </TextSpan>
            <TextSpan>
              {contribution.geoLatitude + ', ' + contribution.geoLongitude}
            </TextSpan>
            <TextSpan>
              {moment(new Date(contribution.plantDate)).format('DD MMM YYYY')}
            </TextSpan>
            {imagesArray.length ? (
              <a onClick={this.openLightbox}>Pictures</a>
            ) : null}
            <Lightbox
              currentImage={this.state.currentImage}
              images={imagesArray}
              isOpen={this.state.lightboxIsOpen}
              onClose={this.closeLightbox}
              onClickNext={this.gotoNext}
              onClickPrev={this.gotoPrevious}
            />
          </div>
          <div className="contribution-container__right-column">
            {contribution.contributionMeasurements
              .slice(0, 3)
              .map(measurement => (
                <TextSpan key={measurement.id}>
                  {contribution.plantDate === measurement.measurementDate
                    ? 'Planting Day'
                    : new Date(
                        measurement.measurementDate
                      ).toLocaleDateString() +
                      (measurement.diameter + 'cm').padStart(10) +
                      ((measurement.height / 100).toFixed(1) + 'm').padStart(
                        10
                      )}
                </TextSpan>
              ))}
            {contribution.contributionMeasurements.length > 3 ? (
              <div className={seeLabel} onClick={this.onViewExpanded}>
                {this.state.viewExpanded ? '- See less' : '+ See more'}
              </div>
            ) : null}
            {this.state.viewExpanded
              ? contribution.contributionMeasurements
                  .slice(3)
                  .map(measurement => (
                    <TextSpan key={measurement.id}>
                      {new Date(
                        measurement.measurementDate
                      ).toLocaleDateString() +
                        (measurement.diameter + 'cm').padStart(10) +
                        ((measurement.height / 100).toFixed(1) + 'm').padStart(
                          10
                        )}
                    </TextSpan>
                  ))
              : null}
          </div>
        </div>
        <hr className="contribution-container__partition" />
      </div>
    );
  }
}

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired
};
