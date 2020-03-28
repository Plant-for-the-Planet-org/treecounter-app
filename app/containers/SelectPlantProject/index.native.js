import React from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
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

const SelectPlantProjectContainer = (props) => {
  let context = {}
  if (props.navigation.getParam('context')) {
    context = props.navigation.getParam('context')
  }
  console.log('Context Received --- ', context)
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  )
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPlantProjectContainer);

SelectPlantProjectContainer.propTypes = {
  plantProjects: PropTypes.array,
  // userSortedContributions: PropTypes.array,
  currencies: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  navigation: PropTypes.any,
  fetchCurrencies: PropTypes.func
};
