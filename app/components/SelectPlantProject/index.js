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
      expanded: false,
      pageIndex: 0
    };
  }

  callExpanded = bool => {
    this.setState({
      expanded: bool
    });
  };

  onSelectClicked = () => {
    this.props.selectProject(
      Object.keys(this.props.plantProjects)[this.state.pageIndex]
    );
  };

  plantProjectChanged(index) {
    this.setState({
      pageIndex: index
    });
  }

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
      ),
      afterChange: index => this.plantProjectChanged(index)
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
              <PrimaryButton onClick={this.onSelectClicked}>
                Select Project
              </PrimaryButton>
            </div>
          </div>
        </CardLayout>
        <CardLayout>
          <table className="projects-list">
            <thead>
              <tr>
                <th>Project</th>
                <th>Organisation</th>
                <th>
                  <span>Planted Trees</span>
                </th>
                <th>Cost Per Tree</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {Object.keys(plantProjects).length !== 0
                ? Object.keys(plantProjects).map(key => (
                    <tr key={'tr' + key}>
                      <td className="align-left">{plantProjects[key].name}</td>
                      <td className="align-left">
                        {plantProjects[key].tpo_name}
                      </td>
                      <td className="align-right">
                        {plantProjects[key].countPlanted}
                      </td>
                      <td className="align-right">
                        {plantProjects[key].currency +
                          ' ' +
                          plantProjects[key].treeCost}
                      </td>
                      <td>
                        <PrimaryButton>See more</PrimaryButton>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </CardLayout>
      </div>
    );
  }
}

SelectPlantProject.propTypes = {
  plantProjects: PropTypes.object,
  selectProject: PropTypes.func
};
