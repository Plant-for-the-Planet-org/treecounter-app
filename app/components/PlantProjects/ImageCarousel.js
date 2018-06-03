import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import { arrow_left_orange, arrow_right_orange } from '../../assets';

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
            src={arrow_left_orange}
            onClick={previousSlide}
          />
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <img
            className="tpo-footer-nav-img__right"
            src={arrow_right_orange}
            onClick={nextSlide}
          />
        )}
      >
        {projectImages.map(projectImage => (
          <div key={`plantProject-${projectImage.img}`}>
            <img className="image-carousal" src={projectImage.img} />
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
