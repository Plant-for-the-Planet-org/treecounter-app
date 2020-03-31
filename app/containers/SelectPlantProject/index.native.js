import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper';
import {
  getAllPlantProjectsSelector,
  currenciesSelector
} from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { loadProject, loadProjects } from '../../actions/loadTposAction';
import SelectPlantProject from '../../components/SelectPlantProject';
import { fetchCurrencies } from '../../actions/currencies';

class SelectPlantProjectContainer extends PureComponent {

  async componentDidMount() {
    let data = await this.props.loadProjects('featured');
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
    let context = {}
    if (this.props.navigation.getParam('context')) {
      context = this.props.navigation.getParam('context')
    }
    return !plantProjects.length ? null : (
      <SelectPlantProject
        selectProject={this.selectPlantProjectAction}
        currencies={this.props.currencies}
        onMoreClick={this.onMoreClick}
        plantProjects={plantProjects}
        navigation={this.props.navigation}
        supportTreecounter={this.props.supportTreecounter}
        context={context}
      />
    );
  }

  // This function takes the user from the list of projects to the single project page
  onMoreClick = async (id, name) => {
    let project = this.props.plantProjects.find(
      project => project['id'] === id
    );
    if (project && !project.paymentSetup) {
      project = await this.props.loadProject({ id });
    }
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;

    if (navigation) {
      updateRoute('app_selectedProject', navigation, 1, {
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod'),
        titleParam: name,
        context: this.props.navigation.getParam('context')
      });
    }
  };
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state),
  currencies: currenciesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { selectPlantProjectAction, fetchCurrencies, loadProject, loadProjects },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPlantProjectContainer);

SelectPlantProjectContainer.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  navigation: PropTypes.any,
  fetchCurrencies: PropTypes.func
};
