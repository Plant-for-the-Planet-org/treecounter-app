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
    let competition_id = null,
      type = 'featured';
    if (match) {
      competition_id = match.params.competition;
      type = match.params.type;
    } else if (props.navigation) {
      competition_id = props.navigation.getParam('competition', null);
      type = props.navigation.getParam('type', null);
    }
    this.state = {
      competition_id: competition_id,
      type: type
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match) {
    } else if (nextProps.navigation && this.props.navigation) {
      if (nextProps.navigation !== this.props.navigation) {
        this.setState({
          competition_id: nextProps.navigation.getParam('competition', null),
          type: nextProps.navigation.getParam('type', 'featured')
        });
      }
    }
  }
  componentDidMount() {}

  render() {
    console.log(this.state, this.props);
    if (this.state.competition_id) {
      return (
        <CompetitionFull
          {...this.props}
          competition_id={this.state.competition_id}
          type={this.state.type}
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
