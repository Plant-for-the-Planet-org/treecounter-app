import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper';

import {
  getAllPlantProjectsSelector,
  currenciesSelector
} from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import SelectPlantProject from '../../components/SelectPlantProject';
import { updateStaticRoute } from '../../helpers/routerHelper/routerHelper.native';
import { fetchCurrencies } from '../../actions/currencies';

class SelectPlantProjectContainer extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }
  render() {
    //filter project only donatable
    let plantProjects = this.props.plantProjects.filter(
      project => project.allowDonations
    );
    return (
      <SelectPlantProject
        plantProjects={plantProjects}
        selectProject={id => this.selectPlantProjectAction(id)}
        currencies={this.props.currencies}
        onMoreClick={id => this.onMoreClick(id)}
        {...this.props}
      />
    );
  }
  onMoreClick(id) {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    if (navigation) {
      updateRoute(
        'app_selectProject',
        navigation,
        1,
        navigation.getParam('userForm')
      );
    }
  }
  selectPlantProjectAction(id) {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    if (navigation) {
      updateStaticRoute('app_donate_detail', navigation, {
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod')
      });
    }
  }
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state),
  currencies: currenciesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { selectPlantProjectAction, fetchCurrencies },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectPlantProjectContainer
);

SelectPlantProjectContainer.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  navigation: PropTypes.any,
  fetchCurrencies: PropTypes.func
};
