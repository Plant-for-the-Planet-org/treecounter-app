import React from 'react';
import PropTypes from 'prop-types';

const DonateTreesCarousel = props => {
  const { children, carouselClass, id } = props;
  let routePath = `#${id}`;
  return (
    <div className="row x-slider">
      <div className="col-md-12">
        <div
          className={carouselClass}
          id={id}
          data-ride="carousel"
          data-type="multi"
          data-interval="false"
        >
          <div className="carousel-inner">{children}</div>
          <a
            className="left carousel-control"
            href={routePath}
            data-slide="prev"
          >
            <i className="glyphicon glyphicon-chevron-left" />
          </a>
          <a
            className="right carousel-control"
            href={routePath}
            data-slide="next"
          >
            <i className="glyphicon glyphicon-chevron-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

DonateTreesCarousel.propTypes = {
  carouselClass: PropTypes.string.isRequired,
  id: PropTypes.any
};

export default DonateTreesCarousel;
