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
    console.log('select plant props', this.props);
    return (
      <SelectPlantProject
        plantProjects={this.props.plantProjects}
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
    console.log('OnMore');
    updateRoute('app_selectProject', navigation, 1);
  }
  selectPlantProjectAction(id) {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    updateStaticRoute('app_donate_detail', navigation);
  }
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state),
  currencies: currenciesSelector(state)
});

const mapDispatchToProps = dispatch => {
  fetchCurrencies;
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
  navigation: PropTypes.object
};
