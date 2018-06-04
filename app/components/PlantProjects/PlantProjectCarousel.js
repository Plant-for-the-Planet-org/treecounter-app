import React from 'react';
import PropTypes from 'prop-types';
import PlantProjectFull from './PlantProjectFull';
import { arrow_right_orange, arrow_left_orange } from '../../assets';
import Slider from 'react-slick';

class CarouselNavigation extends React.Component {
  render() {
    const { onClick, src, styleName } = this.props;
    return <img className={styleName} src={src} onClick={onClick} />;
  }
}

CarouselNavigation.propTypes = {
  onClick: PropTypes.func.isRequired,
  styleName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

class PlantProjectCarousel extends React.Component {
  _handleLoadImage = () => {
    this.carousel.setDimensions();
  };
  render() {
    const settings = {
      nextArrow: (
        <CarouselNavigation
          styleName="tpo-footer-nav-img__right"
          src={arrow_right_orange}
        />
      ),
      prevArrow: (
        <CarouselNavigation
          styleName="tpo-footer-nav-img__left"
          src={arrow_left_orange}
        />
      )
    };
    const { plantProjects, onChange, contentTag, tpoName } = this.props;

    // see: https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
    const TagName = contentTag;
    console.log(onChange);
    console.log('TagName', TagName);
    console.log(tpoName);

    // add navigation buttons that will trigger calls to 'onChange' callback
    return (
      <div>
        {/* {plantProjects.map(plantProject => (
        <Link to="#" onClick={() => onChange(plantProject.id)}>
          {plantProject.id} |{' '}
        </Link>
      ))} */}

        <Slider {...settings}>
          {plantProjects.map(plantProject => (
            <div
              className="tpo-footer-carousel__container"
              key={`plantProject-${plantProject.id}`}
            >
              <PlantProjectFull
                key={`plantProject-${plantProject.id}`}
                expanded={false}
                tpoName={tpoName}
                plantProject={plantProject}
                onToggle={this._handleLoadImage}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

PlantProjectCarousel.propTypes = {
  contentTag: PropTypes.string.isRequired,
  tpoName: PropTypes.string,
  plantProjects: PropTypes.array.isRequired,
  currentPlantProjectId: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default PlantProjectCarousel;
