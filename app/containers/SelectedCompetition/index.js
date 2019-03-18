import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  selectedPlantProjectSelector,
  selectedTpoSelector
} from '../../selectors';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import CompetitionFull from '../../components/Competition/CompetitionFull';

import {
  clearPlantProject,
  selectPlantProjectAction
} from '../../actions/selectPlantProjectAction';

class SelectedCompetitionContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    if (this.props.selectedProject) {
      return <CompetitionFull {...this.props} />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectedCompetitionContainer
);

SelectedCompetitionContainer.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  clearPlantProject: PropTypes.func
};
