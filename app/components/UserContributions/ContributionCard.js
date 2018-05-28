import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Lightbox from 'react-images';

import { getImageUrl } from '../../actions/apiRouting';
import TextSpan from '../Common/Text/TextSpan';

export default class ContributionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false
    };
  }

  closeLightbox = () => this.setState({ lightboxIsOpen: false });

  openLightbox = () => this.setState({ lightboxIsOpen: true });

  render() {
    let { contribution } = this.props;
    let imagesArray = contribution.contributionImages.map(image => {
      return { src: getImageUrl('contribution', 'medium', image.image) };
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
              {contribution.treeCount + ' ' + contribution.treeType + ' tree'}
            </TextSpan>
            <TextSpan>
              {contribution.geoLatitude + ', ' + contribution.geoLongitude}
            </TextSpan>
            <TextSpan>
              {moment(new Date(contribution.plantDate)).format('DD MMM YYYY')}
            </TextSpan>
            <div onClick={this.openLightbox}>Test</div>
            <Lightbox
              images={imagesArray}
              isOpen={this.state.lightboxIsOpen}
              onClose={this.closeLightbox}
            />
          </div>
          <div className="contribution-container__right-column">
            {contribution.contributionMeasurements.map(measurement => (
              <TextSpan>
                {contribution.plantDate === measurement.measurementDate
                  ? 'Planting Day'
                  : new Date(measurement.measurementDate).toLocaleDateString() +
                    (measurement.diameter + 'cm').padStart(10) +
                    ((measurement.height / 100).toFixed(1) + 'm').padStart(10)}
              </TextSpan>
            ))}
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
