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

class SelectPlantProjectContainer extends Component {
  componentDidMount() {
    //  this.props.selectPlantProjectAction(1);
  }
  render() {
    console.log('select plant props', this.props);
    return (
      <SelectPlantProject
        plantProjects={this.props.plantProjects}
        selectProject={this.props.selectPlantProjectAction}
        currencies={this.props.currencies}
        onMoreClick={id => this.onMoreClick(id)}
      />
    );
  }
  onMoreClick(id) {
    // const { navigation } = this.props;
    // console.log('OnMore')
    // updateRoute('app_donateTrees', navigation, id );
    this.props.selectProject(id);
  }
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state),
  currencies: currenciesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPlantProjectAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectPlantProjectContainer
);

SelectPlantProjectContainer.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectPlantProjectAction: PropTypes.func
};
