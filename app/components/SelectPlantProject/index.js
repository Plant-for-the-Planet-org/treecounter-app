import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_right_orange, arrow_left_orange } from '../../assets';
import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
// import PlantProjectFull from '../PlantProjects/PlantProjectFull';

export default class SelectPlantProject extends Component {
  render() {
    const settings = {
      dots: true,

      infinite: false,
      adaptiveHeight: true,
      prevArrow: (
        <CarouselNavigation
          styleName="donate-tree-nav-img__left"
          src={arrow_left_orange}
        />
      ),
      nextArrow: (
        <CarouselNavigation
          styleName="donate-tree-nav-img__right"
          src={arrow_right_orange}
        />
      )
    };

    return (
      <div className="app-container__content--center sidenav-wrapper">
        <CardLayout className="tpo-footer-card-layout">
          <div className="donate-tress__container">
            <ContentHeader caption={'Featured Projects'} />
            <Slider {...settings}>
              {/* <PlantProjectFull
                callExpanded={this.callExpanded}
                expanded={false}
                plantProject={this.props.plantProjects[0]}
                tpoName={this.props.plantProjects[0].name}
              /> */}
            </Slider>
          </div>
        </CardLayout>
      </div>
    );
  }
}

SelectPlantProject.propTypes = {
  plantProjects: PropTypes.object
};
