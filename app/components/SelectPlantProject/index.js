import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { history } from '../Common/BrowserRouter';

import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_right_orange, arrow_left_orange } from '../../assets';
import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import PrimaryButton from '../Common/Button/PrimaryButton';
import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import ModalDialog from '../Common/ModalDialog';
import i18n from '../../locales/i18n';

export default class SelectPlantProject extends Component {
  static data = {
    tabs: [
      {
        name: i18n.t('label.map'),
        id: 'map'
      },
      {
        name: i18n.t('label.name'),
        id: 'name'
      },
      {
        name: i18n.t('label.price'),
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
      mode: 'name',
      isOpen: false,
      modalProject: null
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

  onSelectClickedFeaturedProjects = () => {
    this.props.selectProject(
      Object.keys(this.state.featuredProjects)[this.state.pageIndex]
    );
    history.goBack();
  };

  onSelectClicked = () => {
    this.props.selectProject(this.state.modalProject.id);
    this.onRequestClose();
    history.goBack();
  };

  plantProjectChanged(index) {
    this.setState({
      pageIndex: index
    });
  }

  onRequestClose() {
    this.setState({
      isOpen: false
    });
  }

  openModal(key) {
    this.setState({
      isOpen: true,
      modalProject: this.props.plantProjects[key]
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
        <TextHeading>{i18n.t('label.select_project')}</TextHeading>
        <ModalDialog
          isOpen={this.state.isOpen}
          onRequestClose={() => this.onRequestClose()}
        >
          <div className="project-modal-card-layout">
            {this.state.modalProject ? (
              <PlantProjectFull
                expanded={false}
                plantProject={this.state.modalProject}
                tpoName={this.state.modalProject.tpo_name}
              />
            ) : null}
            <PrimaryButton onClick={this.onSelectClicked}>
              {i18n.t('label.select_project')}
            </PrimaryButton>
          </div>
        </ModalDialog>
        <CardLayout className="tpo-footer-card-layout">
          <div className="select-project__container">
            <ContentHeader caption={i18n.t('label.featuredProjects')} />
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
              <PrimaryButton onClick={this.onSelectClickedFeaturedProjects}>
                {i18n.t('label.select_project')}
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
                    <label>{i18n.t('label.search')}</label>
                  </div>
                  <span className="search-bar__button">
                    <i className="material-icons header-icons">
                      {i18n.t('label.search')}
                    </i>
                  </span>
                </div>
                <table className="projects-list">
                  <thead>
                    <tr>
                      <th>{i18n.t('label.project')}</th>
                      <th>{i18n.t('label.organisation')}</th>
                      <th>
                        <span>{i18n.t('label.plantedTrees')}</span>
                      </th>
                      <th>{i18n.t('label.Cost')}</th>
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
                              <PrimaryButton
                                onClick={() => this.openModal(key)}
                              >
                                {i18n.t('label.see_more')}
                              </PrimaryButton>
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
