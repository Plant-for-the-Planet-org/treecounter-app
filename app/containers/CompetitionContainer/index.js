import React from 'react';
import { bindActionCreators } from 'redux';
import Competiton from '../../components/Competition/index.native';
import { updateRoute } from '../../helpers/routerHelper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  createCompetition,
  enrollCompetition,
  fetchCompetitions,
  fetchMineCompetitions,
  leaveCompetition
} from '../../actions/competition';
import {
  competitionsSelector,
  getAllCompetitionsSelector
} from '../../selectors';
import { supportTreecounterAction } from '../../actions/supportTreecounterAction';
import PublicTreecounter from '../../components/PublicTreeCounter/PublicTreecounter';

class CompetitionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  createCompetition = value => {
    this.props.createCompetition(value, this.props.navigation);
  };
  componentDidMount() {
    this.props.fetchCompetitions('featured');
    this.props.fetchCompetitions('all');
    this.props.fetchMineCompetitions();
  }
  leaveCompetition(id) {
    this.props.leaveCompetition(id);
  }
  enrollCompetition(id) {
    this.props.enrollCompetition(id);
  }
  render() {
    return (
      <Competiton
        allCompetitions={this.props.allCompetitions}
        onMoreClick={id => this.onMoreClick(id)}
        leaveCompetition={id => this.leaveCompetition(id)}
        enrollCompetition={id => this.enrollCompetition(id)}
        onCreateCompetition={this.createCompetition}
        supportTreecounterAction={this.props.supportTreecounterAction}
      />
    );
  }
  onMoreClick(id) {
    //this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    if (navigation) {
      updateRoute('app_competition', navigation, 1, {
        competition: id
      });
    }
  }
}
const mapStateToProps = state => ({
  allCompetitions: getAllCompetitionsSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCompetitions,
      fetchMineCompetitions,
      leaveCompetition,
      enrollCompetition,
      createCompetition,
      supportTreecounterAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CompetitionContainer
);
CompetitionContainer.propTypes = {
  navigation: PropTypes.any,
  fetchCompetitions: PropTypes.any,
  allCompetitions: PropTypes.any,
  fetchMineCompetitions: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  createCompetition: PropTypes.any,
  supportTreecounterAction: PropTypes.any
};
