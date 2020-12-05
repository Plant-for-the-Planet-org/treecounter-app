import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import _ from 'lodash';
//import { debug } from '../../debug';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_right_orange, arrow_left_orange } from '../../assets';
import CardLayout from '../Common/Card';
// import ContentHeader from '../Common/ContentHeader';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import PrimaryButton from '../Common/Button/PrimaryButton';
import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import ModalDialog from '../Common/ModalDialog';
import i18n from '../../locales/i18n';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';
import { delimitNumbers } from '../../utils/utils';
import NumberFormat from '../Common/NumberFormat';
import { sortProjectsByPrice } from '../../utils/currency';
import { getAllPlantProjectsSelector } from '../../selectors';
import { loadProject, loadProjects } from '../../actions/loadTposAction';

class SelectPlantProject extends Component {
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
      featuredProjects: props.featuredProjects,
      priceSortedProjects: props.plantProjects,
      searchFieldValue: '',
      imageViewMore: false,
      mode: 'name',
      isOpen: false,
      modalProject: null
    };
  }

  UNSAFE_componentWillMount() {
    this.setState(this.initialStateFromProps(this.props));
  }

  async componentDidMount() {
    if (
      this.props.plantProjects.filter(
        plantProject => plantProject.isFeatured && !plantProject.tpoData
      ).length
    ) {
      let { loadProject } = this.props;
      await [
        this.props.plantProjects.map(
          plantProject =>
            plantProject.isFeatured &&
            !plantProject.tpoData &&
            loadProject(plantProject)
        )
      ];
    }
    if (
      !this.props.plantProjects.filter(plantProject => !plantProject.isFeatured)
        .length
    ) {
      let { loadProjects } = this.props;
      await loadProjects('all', { loadAll: true, limit: 100 });
    }
    this.setState(this.initialStateFromProps(this.props));
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState(this.initialStateFromProps(props));
  }

  initialStateFromProps(props) {
    const {
      featuredProjects,
      plantProjects,
      currencies: { currencies }
    } = props;
    // let featuredProjects = plantProjects.filter(project => project.isFeatured);
    // featuredProjects = _.orderBy(featuredProjects, 'id');
    // featuredProjects.length && featuredProjects.push(featuredProjects[0]);

    let priceSortedProjects = sortProjectsByPrice(
      plantProjects,
      true,
      currencies
    );

    return {
      filteredProjects: plantProjects,
      featuredProjects,
      priceSortedProjects
    };
  }

  onInputChange = event => {
    let value = event.target.value.toLowerCase();
    let { plantProjects } = this.props;
    let filteredProjects = plantProjects.reduce((projects, project) => {
      if (
        project.name.toLowerCase().includes(value) ||
        project.tpoName.toLowerCase().includes(value)
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
    this.setState(
      {
        expanded: !this.state.expanded
      },
      () => {
        this.forceUpdate();
      }
    );
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

  async openModal(key) {
    try {
      let project = this.props.plantProjects.find(
        project => project['id'] === key
      );
      if (project && !project.paymentSetup) {
        project = await this.props.loadDetails({ id: key });
      }
      this.setState({
        isOpen: true,
        modalProject: project
      });
    } catch (error) {
      //debug('load details error', error);
    }
  }

  render() {
    let {
      filteredProjects,
      featuredProjects,
      priceSortedProjects
    } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      lazyLoad: true,
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

    const slides = featuredProjects.length !== 0
      ? featuredProjects
        // .sort((a, b) => a.id - b.id)?
        .map(project => {
          return (
            <CardLayout
              className="plant_project_content"
              key={project.id}
            >
              <PlantProjectFull
                onViewMoreClick={() =>
                  this.setState({
                    imageViewMore: !this.state.imageViewMore
                  })
                }
                callExpanded={() => this.callExpanded()}
                expanded={false}
                plantProject={project}
                tpoName={project.tpoName}
              />
              <div className="select-project_button__container">
                <PrimaryButton
                  onClick={() =>
                    this.onSelectClickedFeaturedProjects(project.id)
                  }
                >
                  {i18n.t('label.donate_trees_cap')}
                </PrimaryButton>
              </div>
            </CardLayout>
          );
        })
        : null;

    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>
          {this.props.supportTreecounter &&
            this.props.supportTreecounter.treecounterId &&
            (this.props.supportTreecounter.type == 'company' ? i18n.t('label.give_trees_to_company', {
              companyName: this.props.supportTreecounter.displayName
            }) + '\n' : i18n.t('label.support_trees_to', {
              user: this.props.supportTreecounter.displayName
            })) + '\n'}
          {''}

          <div> {i18n.t('label.select_project')}</div>
          <DescriptionHeading>
            {i18n.t('label.donate_trees_description')}
          </DescriptionHeading>
        </TextHeading>
        <ModalDialog
          isOpen={this.state.isOpen}
          onRequestClose={() => this.onRequestClose()}
        >
          <div className="project-modal-card-layout">
            {this.state.modalProject ? (
              <PlantProjectFull
                onViewMoreClick={() =>
                  this.setState({ imageViewMore: !this.state.imageViewMore })
                }
                expanded={false}
                plantProject={this.state.modalProject}
                tpoName={this.state.modalProject.tpoName}
              />
            ) : null}
            <div className="select-project_button__container">
              <PrimaryButton
                onClick={() => this.onSelectClicked(this.state.modalProject.id)}
              >
                {i18n.t('label.select_project')}
              </PrimaryButton>
            </div>
          </div>
        </ModalDialog>
        <div className="select-project__container remove_shadow">
          <div className="select-project__header">
            {i18n.t('label.featuredProjects')}{' '}
          </div>
          {featuredProjects != null && featuredProjects.length > 0 &&
            <Slider {...settings}>
              {slides}
            </Slider>
          }
        </div>
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
                    <i className="material-icons header-icons">{'search'}</i>
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
                        ? filteredProjects
                          .sort((a, b) => a.id - b.id)
                          .map(project => (
                            <tr key={'tr' + project.id}>
                              <td className="align-left">{project.name}</td>
                              <td className="align-left">
                                {project.tpoName}
                              </td>
                              <td className="align-right">
                                {delimitNumbers(
                                  parseInt(project.countPlanted)
                                )}
                              </td>
                              <td className="align-right">
                                <NumberFormat
                                  currency={project.currency}
                                  data={project.treeCost.toFixed(2)}
                                />
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
                          <span>{i18n.t('label.plantedTrees')}</span>
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
                            <td className="align-left">{project.tpoName}</td>
                            <td className="align-right">
                              {delimitNumbers(parseInt(project.countPlanted))}
                            </td>
                            <td className="align-right">
                              <NumberFormat
                                currency={project.currency}
                                data={project.treeCost.toFixed(2)}
                              />
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
      </div>
    );
  }
}
const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loadProject, loadProjects }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlantProject);
SelectPlantProject.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectProject: PropTypes.func,
  navigation: PropTypes.object
};
