import React from 'react';
import { bindActionCreators } from 'redux';
import Competiton from '../../components/Competition/index.native';
import { updateRoute } from '../../helpers/routerHelper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCompetitions } from '../../actions/competition';
import { competitionsSelector } from '../../selectors';

class CompetitionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCompetitions('featured');
  }

  render() {
    return (
      <Competiton
        allCompetitions={this.props.competitions}
        onMoreClick={id => this.onMoreClick(id)}
      />
    );
  }
  onMoreClick(id) {
    //this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    if (navigation) {
      updateRoute('app_competition', navigation, 1, { competition: id });
    }
  }
}
const mapStateToProps = state => ({
  competitions: competitionsSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCompetitions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CompetitionContainer
);
CompetitionContainer.propTypes = {
  navigation: PropTypes.any,
  fetchCompetitions: PropTypes.any,
  competitions: PropTypes.any
};
