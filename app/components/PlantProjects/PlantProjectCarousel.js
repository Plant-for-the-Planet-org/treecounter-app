import React from 'react';
import PropTypes from 'prop-types';
import PlantProjectFull from './PlantProjectFull';
import { arrow_right_orange, arrow_left_orange } from '../../assets';
import Slider from 'react-slick';
import CarouselNavigation from '../Common/CarouselNavigation';

class PlantProjectCarousel extends React.Component {
  render() {
    const settings = {
      dots: true,
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
    const { plantProjects, contentTag, tpoName } = this.props;

    // see: https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
    const TagName = contentTag;

    // add navigation buttons that will trigger calls to 'onChange' callback
    return (
      <Slider {...settings}>
        {plantProjects.map(plantProject => (
          <div className="plant_project_carousal__content">
            <PlantProjectFull
              key={`plantProject-${plantProject.id}`}
              expanded={false}
              tpoName={tpoName}
              plantProject={plantProject}
            />
          </div>
        ))}
      </Slider>
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
