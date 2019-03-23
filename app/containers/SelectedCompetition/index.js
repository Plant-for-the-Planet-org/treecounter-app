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
    const { match } = props;
    let competition_id = null;
    if (match) {
      competition_id = match.params.competition;
    } else if (props.navigation) {
      competition_id = props.navigation.competition;
    }
    this.state = {
      competition_id: competition_id
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match) {
    } else if (nextProps.navigation && this.props.navigation) {
      if (nextProps.navigation !== this.props.navigation) {
        this.setState({
          competition_id: nextProps.navigation.competition
        });
      }
    }
  }
  componentDidMount() {}

  render() {
    if (this.state.competition_id) {
      return (
        <CompetitionFull
          {...this.props}
          competition_id={this.state.competition_id}
        />
      );
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
  match: PropTypes.any,
  navigation: PropTypes.any
};
