import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { arrow_left_green, arrow_right_green } from '../../assets';
import CarouselNavigation from '../Common/CarouselNavigation';
import { getImageUrl } from '../../actions/apiRouting';

const PlantProjectImageCarousel = props => {
  const { projectImages } = props;
  if (!projectImages || projectImages.length == 0) {
    return null;
  }
  const settings = {
    nextArrow: (
      <CarouselNavigation
        styleName="tpo-footer-nav-img__right"
        src={arrow_right_green}
      />
    ),
    prevArrow: (
      <CarouselNavigation
        styleName="tpo-footer-nav-img__left"
        src={arrow_left_green}
      />
    )
  };
  return (
    <div>
      <Slider {...settings}>
        {projectImages.map(projectImage => (
          <div
            className="project-images-carousal__container"
            key={`plantProject-${projectImage.image}`}
          >
            <img
              className="image-carousal"
              src={getImageUrl('project', 'large', projectImage.image)}
            />
            <div className="project-image__description">
              {projectImage.description}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

PlantProjectImageCarousel.propTypes = {
  projectImages: PropTypes.array.isRequired
};

export default PlantProjectImageCarousel;
