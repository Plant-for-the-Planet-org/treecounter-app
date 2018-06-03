import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import { arrow_left_green, arrow_right_green } from '../../assets';

const ImageCarousel = props => {
  const { projectImages } = props;
  if (!projectImages || projectImages.length == 0) {
    return null;
  }
  return (
    <div>
      <Carousel
        renderBottomCenterControls={() => {
          return false;
        }}
        renderCenterLeftControls={({ previousSlide }) => (
          <img
            className="tpo-footer-nav-img__left"
            src={arrow_left_green}
            onClick={previousSlide}
          />
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <img
            className="tpo-footer-nav-img__right"
            src={arrow_right_green}
            onClick={nextSlide}
          />
        )}
      >
        {projectImages.map(projectImage => (
          <div
            className="project-images-carousal__container"
            key={`plantProject-${projectImage.img}`}
          >
            <img className="image-carousal" src={projectImage.img} />
            <div className="project-image__description">
              {projectImage.description}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ImageCarousel.propTypes = {
  projectImages: PropTypes.array.isRequired
};

export default ImageCarousel;
