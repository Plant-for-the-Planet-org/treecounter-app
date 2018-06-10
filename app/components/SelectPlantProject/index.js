import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_right_orange, arrow_left_orange } from '../../assets';
import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import PrimaryButton from '../Common/Button/PrimaryButton';
import Tabs from '../Common/Tabs';

export default class SelectPlantProject extends Component {
  static data = {
    tabs: [
      {
        name: 'Map',
        id: 'map'
      },
      {
        name: 'Name',
        id: 'name'
      },
      {
        name: 'Price',
        id: 'price'
      }
    ]
  };
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      pageIndex: 0,
      filteredProjects: props.plantProjects,
      featuredProjects: props.plantProjects,
      searchFieldValue: '',
      mode: 'name'
    };
  }

  componentWillReceiveProps(nextProps) {
    let { plantProjects } = nextProps;
    let featuredProjects = Object.keys(plantProjects).reduce((projects, id) => {
      if (plantProjects[id].isFeatured) {
        projects[id] = plantProjects[id];
      }
      return projects;
    }, {});
    this.setState({
      filteredProjects: plantProjects,
      featuredProjects: featuredProjects
    });
  }

  onInputChange = event => {
    let value = event.target.value.toLowerCase();
    let { plantProjects } = this.props;
    let filteredProjects = Object.keys(plantProjects).reduce((projects, id) => {
      if (
        plantProjects[id].name.toLowerCase().includes(value) ||
        plantProjects[id].tpo_name.toLowerCase().includes(value)
      ) {
        projects[id] = plantProjects[id];
      }
      return projects;
    }, {});
    this.setState({
      filteredProjects: filteredProjects,
      searchFieldValue: value
    });
  };

  handleModeChange = tab => {
    this.setState({ mode: tab });
  };

  callExpanded = bool => {
    this.setState({
      expanded: bool
    });
  };

  onSelectClicked = () => {
    this.props.selectProject(
      Object.keys(this.state.featuredProjects)[this.state.pageIndex]
    );
  };

  plantProjectChanged(index) {
    this.setState({
      pageIndex: index
    });
  }

  render() {
    let { filteredProjects, featuredProjects } = this.state;
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
              {Object.keys(featuredProjects).length !== 0
                ? Object.keys(featuredProjects).map(key => (
                    <PlantProjectFull
                      key={key}
                      callExpanded={this.callExpanded}
                      expanded={false}
                      plantProject={featuredProjects[key]}
                      tpoName={featuredProjects[key].tpo_name}
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
          <Tabs
            data={SelectPlantProject.data.tabs}
            onTabChange={this.handleModeChange}
            activeTab={this.state.mode !== '' ? this.state.mode : null}
          >
            {this.state.mode === SelectPlantProject.data.tabs[1].id ? (
              <div className="all-projects-card">
                <div className="pftp-textfield">
                  <div className="pftp-textfield__inputgroup">
                    <input
                      autoComplete="new-password"
                      required="required"
                      value={this.state.searchFieldValue}
                      onChange={this.onInputChange.bind(this)}
                    />
                    <span className="pftp-textfield__inputgroup--highlight" />
                    <span className="pftp-textfield__inputgroup--bar" />
                    <label>Search</label>
                  </div>
                  <span className="search-bar__button">
                    <i className="material-icons header-icons">search</i>
                  </span>
                </div>
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
                    {Object.keys(filteredProjects).length !== 0
                      ? Object.keys(filteredProjects).map(key => (
                          <tr key={'tr' + key}>
                            <td className="align-left">
                              {filteredProjects[key].name}
                            </td>
                            <td className="align-left">
                              {filteredProjects[key].tpo_name}
                            </td>
                            <td className="align-right">
                              {filteredProjects[key].countPlanted}
                            </td>
                            <td className="align-right">
                              {filteredProjects[key].currency +
                                ' ' +
                                filteredProjects[key].treeCost}
                            </td>
                            <td>
                              <PrimaryButton>See more</PrimaryButton>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            ) : null}
          </Tabs>
        </CardLayout>
      </div>
    );
  }
}

SelectPlantProject.propTypes = {
  plantProjects: PropTypes.object,
  selectProject: PropTypes.func
};
