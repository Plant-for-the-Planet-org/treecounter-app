import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_right_orange, arrow_left_orange } from '../../assets';
import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import PrimaryButton from '../Common/Button/PrimaryButton';

export default class SelectPlantProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  callExpanded = bool => {
    this.setState({
      expanded: bool
    });
  };

  render() {
    let { plantProjects } = this.props;
    const settings = {
      dots: true,

      infinite: false,
      adaptiveHeight: true,
      prevArrow: (
        <CarouselNavigation
          styleName="tpo-footer-nav-img__left"
          src={arrow_left_orange}
        />
      ),
      nextArrow: (
        <CarouselNavigation
          styleName="tpo-footer-nav-img__right"
          src={arrow_right_orange}
        />
      )
    };

    return (
      <div className="app-container__content--center sidenav-wrapper">
        <CardLayout className="tpo-footer-card-layout">
          <div className="select-project__container">
            <ContentHeader caption={'Featured Projects'} />
            <Slider {...settings}>
              {Object.keys(plantProjects).length !== 0
                ? Object.keys(plantProjects).map(key => (
                    <PlantProjectFull
                      key={key}
                      callExpanded={this.callExpanded}
                      expanded={false}
                      plantProject={plantProjects[key]}
                      tpoName={plantProjects[key].tpo_name}
                    />
                  ))
                : null}
            </Slider>
            <div>
              <PrimaryButton>Select Project</PrimaryButton>
            </div>
          </div>
        </CardLayout>
      </div>
    );
  }
}

SelectPlantProject.propTypes = {
  plantProjects: PropTypes
};
