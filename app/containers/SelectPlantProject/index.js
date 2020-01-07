import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper';

import {
  getAllPlantProjectsSelector,
  currenciesSelector
  // sortedUserContributionsSelector
} from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { loadProject, loadProjects } from '../../actions/loadTposAction';
import SelectPlantProject from '../../components/SelectPlantProject';
import { updateStaticRoute } from '../../helpers/routerHelper/routerHelper';
import { fetchCurrencies } from '../../actions/currencies';

class SelectPlantProjectContainer extends PureComponent {
  // componentWillMount() {
  //   let plantProjects = this.props.plantProjects.filter(
  //     project => project.allowDonations
  //   );
  //   let userPreviousDonations = this.props.userSortedContributions.filter(
  //     project => project.contributionType === 'donation'
  //   );
  //   if (userPreviousDonations.length > 0) {
  //     let selectedProject = plantProjects.filter(
  //       project => project.id === userPreviousDonations[0].plantProjectId
  //     );
  //     if (selectedProject.length > 0) {
  //       //TODO hkurra commenting this to fix donation on APP
  //       // this.selectPlantProjectAction(selectedProject[0].id);
  //     }
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   let plantProjects = nextProps.plantProjects.filter(
  //     project => project.allowDonations
  //   );
  //   let userPreviousDonations = nextProps.userSortedContributions.filter(
  //     project => project.contributionType === 'donation'
  //   );
  //   if (userPreviousDonations.length > 0) {
  //     let selectedProject = plantProjects.filter(
  //       project => project.id === userPreviousDonations[0].plantProjectId
  //     );
  //     if (selectedProject.length > 0) {
  //       //TODO hkurra commenting this to fix donation on APP
  //       // this.selectPlantProjectAction(selectedProject[0].id);
  //     }
  //   }
  // }

  async componentDidMount() {
    let data = await this.props.loadProjects('featured');

    console.log('===got data in await in did mount:', data);
    if (!this.props.currencies.currencies) {
      this.props.fetchCurrencies();
    }
    this.props.selectPlantProjectAction(null);
  }

  render() {
    // filter project only donatable
    let plantProjects = this.props.plantProjects.filter(
      project => project.allowDonations
    );
    console.log('==== plantprojects', plantProjects);
    return !plantProjects.length ? null : (
      <SelectPlantProject
        selectProject={this.selectPlantProjectAction}
        currencies={this.props.currencies}
        onMoreClick={this.onMoreClick}
        plantProjects={plantProjects}
        navigation={this.props.navigation}
        supportTreecounter={this.props.supportTreecounter}
        loadDetails={this.loadDetails}
      />
    );
  }
  loadDetails = ({ id }) => {
    return this.props.loadProject({ id });
  };
  onMoreClick = async (id, name) => {
    let project = this.props.plantProjects.find(
      project => project['id'] === id
    );
    console.log('project on more click', project);
    if (project && !project.paymentSetup) {
      project = await this.loadDetails({ id: id });
    }
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    if (navigation) {
      updateRoute('app_selectProject', navigation, 1, {
        userForm: navigation.getParam('userForm'),
        titleParam: name
      });
    }
  };
  selectPlantProjectAction = id => {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    if (navigation) {
      updateStaticRoute('app_donate_detail', navigation, {
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod')
      });
    }
  };
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state),
  // userSortedContributions: sortedUserContributionsSelector(state),
  currencies: currenciesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { selectPlantProjectAction, fetchCurrencies, loadProject, loadProjects },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectPlantProjectContainer
);

SelectPlantProjectContainer.propTypes = {
  plantProjects: PropTypes.array,
  // userSortedContributions: PropTypes.array,
  currencies: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  navigation: PropTypes.any,
  fetchCurrencies: PropTypes.func
};
