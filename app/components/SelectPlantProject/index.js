import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
// import { history } from '../Common/BrowserRouter';

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
import DescriptionHeading from '../Common/Heading/DescriptionHeading';

export default class SelectPlantProject extends Component {
  static data = {
    tabs: [
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
      priceSortedProjects: props.plantProjects,
      searchFieldValue: '',
      mode: 'name',
      isOpen: false,
      modalProject: null
    };
  }

  componentWillMount() {
    let { plantProjects, currencies } = this.props;
    currencies = currencies.currencies;
    let featuredProjects = plantProjects.reduce((projects, project) => {
      if (project.isFeatured) {
        projects.push(project);
      }
      return projects;
    }, []);
    let priceSortedProjects = JSON.parse(JSON.stringify(plantProjects));
    if (currencies) {
      priceSortedProjects = priceSortedProjects.sort(function(a, b) {
        return (
          a.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
          b.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
        );
      });
    }
    this.setState({
      filteredProjects: plantProjects,
      featuredProjects: featuredProjects,
      priceSortedProjects: priceSortedProjects
    });
  }

  componentWillReceiveProps(nextProps) {
    let { plantProjects, currencies } = nextProps;
    currencies = currencies.currencies;
    let featuredProjects = plantProjects.reduce((projects, project) => {
      if (project.isFeatured) {
        projects.push(project);
      }
      return projects;
    }, []);
    let priceSortedProjects = plantProjects;
    if (currencies) {
      priceSortedProjects = plantProjects.sort(function(a, b) {
        return (
          a.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
          b.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
        );
      });
    }
    this.setState({
      filteredProjects: plantProjects,
      featuredProjects: featuredProjects,
      priceSortedProjects: priceSortedProjects
    });
  }

  onInputChange = event => {
    let value = event.target.value.toLowerCase();
    let { plantProjects } = this.props;
    let filteredProjects = plantProjects.reduce((projects, project) => {
      if (
        project.name.toLowerCase().includes(value) ||
        project.tpo_name.toLowerCase().includes(value)
      ) {
        projects.push(project);
      }
      return projects;
    }, []);
    this.setState({
      filteredProjects: filteredProjects,
      searchFieldValue: value
    });
  };

  handleModeChange = tab => {
    this.setState({ mode: tab });
  };

  callExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  onSelectClickedFeaturedProjects = id => {
    this.props.selectProject(id);
  };

  onSelectClicked = id => {
    this.props.selectProject(id);
    this.onRequestClose();
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
      modalProject: this.props.plantProjects.find(
        project => project['id'] === key
      )
    });
  }

  render() {
    let {
      filteredProjects,
      featuredProjects,
      priceSortedProjects
    } = this.state;
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
        <DescriptionHeading>
          {i18n.t('label.donate_trees_description')}
        </DescriptionHeading>
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
            <PrimaryButton
              onClick={() => this.onSelectClicked(this.state.modalProject.id)}
            >
              {i18n.t('label.select_project')}
            </PrimaryButton>
          </div>
        </ModalDialog>
        <CardLayout className="tpo-footer-card-layout">
          <div className="select-project__container">
            <ContentHeader caption={i18n.t('label.featuredProjects')} />
            <Slider {...settings}>
              {featuredProjects.length !== 0
                ? featuredProjects.map(project => (
                    <div key={project.id}>
                      <PlantProjectFull
                        callExpanded={() => this.callExpanded()}
                        expanded={this.state.expanded}
                        plantProject={project}
                        tpoName={project.tpo_name}
                      />
                      <PrimaryButton
                        onClick={() =>
                          this.onSelectClickedFeaturedProjects(project.id)
                        }
                      >
                        {i18n.t('label.select_project')}
                      </PrimaryButton>
                    </div>
                  ))
                : null}
            </Slider>
          </div>
        </CardLayout>
        <CardLayout className="tpo-footer-card-layout">
          <div className="select-project__container">
            <Tabs
              data={SelectPlantProject.data.tabs}
              onTabChange={this.handleModeChange}
              activeTab={this.state.mode !== '' ? this.state.mode : null}
            >
              {this.state.mode === SelectPlantProject.data.tabs[0].id ? (
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
                  <div className="table-responsive">
                    <table className="projects-list">
                      <thead>
                        <tr>
                          <th className="align-left">
                            {i18n.t('label.project')}
                          </th>
                          <th className="align-left">
                            {i18n.t('label.organisation')}
                          </th>
                          <th className="align-right">
                            <span>{i18n.t('label.plantedTrees')}</span>
                          </th>
                          <th className="align-right">
                            <span>{i18n.t('label.Cost')}</span>
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProjects.length !== 0
                          ? filteredProjects.map(project => (
                              <tr key={'tr' + project.id}>
                                <td className="align-left">{project.name}</td>
                                <td className="align-left">
                                  {project.tpo_name}
                                </td>
                                <td className="align-right">
                                  {project.countPlanted}
                                </td>
                                <td className="align-right">
                                  {project.currency + ' ' + project.treeCost}
                                </td>
                                <td>
                                  <PrimaryButton
                                    onClick={() => this.openModal(project.id)}
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
                </div>
              ) : null}
              {this.state.mode === SelectPlantProject.data.tabs[1].id ? (
                <div className="all-projects-card">
                  <div className="table-responsive">
                    <table className="projects-list">
                      <thead>
                        <tr>
                          <th className="align-left">
                            {i18n.t('label.project')}
                          </th>
                          <th className="align-left">
                            {i18n.t('label.organisation')}
                          </th>
                          <th className="align-right">
                            <span>{i18n.t('label.plantedTrees')}s</span>
                          </th>
                          <th className="align-right">
                            <span>{i18n.t('label.Cost')}</span>
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {priceSortedProjects.length !== 0
                          ? priceSortedProjects.map(project => (
                              <tr key={'tr' + project.id}>
                                <td className="align-left">{project.name}</td>
                                <td className="align-left">
                                  {project.tpo_name}
                                </td>
                                <td className="align-right">
                                  {project.countPlanted}
                                </td>
                                <td className="align-right">
                                  {project.currency + ' ' + project.treeCost}
                                </td>
                                <td>
                                  <PrimaryButton
                                    onClick={() => this.openModal(project.id)}
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
                </div>
              ) : null}
            </Tabs>
          </div>
        </CardLayout>
      </div>
    );
  }
}

SelectPlantProject.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectProject: PropTypes.func
};
