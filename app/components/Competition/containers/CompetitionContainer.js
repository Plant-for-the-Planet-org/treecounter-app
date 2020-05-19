import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createCompetition,
  enrollCompetition,
  fetchCompetitions,
  fetchMineCompetitions,
  leaveCompetition,
  setCurrentCompetitions,
  clearCurrentCompetitions
} from './../redux/competitionActions';
import { supportTreecounterAction } from '../../../actions/supportTreecounterAction';
import LoadingIndicator from '../../../components/Common/LoadingIndicator';
import Competiton from './../screens/CompetitionList';
import { debug } from '../../../debug';
import { updateRoute } from '../../../helpers/routerHelper';
import {
  formatDateToMySQL,
  handleServerResponseError
} from '../../../helpers/utils';
// import { getAllCompetitionsSelector } from '../../selectors';
import { getContentLoaderState } from '../../../reducers/contentloaderReducer';
import { competitionFormSchemaOptions } from '../../../server/parsedSchemas/competition';

class CompetitionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      competitionFormSchemaOptions
    };
  }

  componentDidMount() {
    this.fetchCompetitions('featured', 1);
    this.fetchCompetitions('all', 1);
    this.fetchMineCompetitions();
    this.fetchCompetitions('archived', 1);
  }

  createCompetition = value => {
    if (value) {
      let newvalue = {
        ...value,
        endDate: formatDateToMySQL(value.endDate)
      };
      this.props
        .createCompetition(newvalue, this.props.navigation)
        .then((/* success */) => {})
        .catch(err => {
          debug('err signup data', err);
          let newSchemaOptions = handleServerResponseError(
            err,
            this.state.competitionFormSchemaOptions
          );
          this.setState({
            competitionFormSchemaOptions: {
              ...newSchemaOptions
            }
          });
        });
    }
  };

  leaveCompetition(id) {
    this.props.leaveCompetition(id);
  }
  enrollCompetition(id) {
    this.props.enrollCompetition(id);
  }
  editCompetition(id) {
    const { navigation } = this.props;
    if (navigation) {
      updateRoute('app_editCompetition', navigation, 1, {
        competition: id
      });
    }
  }

  fetchCompetitions = async (category, page) => {
    await this.props.fetchCompetitions(category, page);
  };

  fetchMineCompetitions = async () => {
    await this.props.fetchMineCompetitions();
  };

  render() {
    // debug(this.props.contentloader, '**********************');
    const { contentloader } = this.props;
    return !contentloader ? (
      <Competiton
        allCompetitions={this.props.allCompetitions}
        featuredCompetitions={this.props.featuredCompetitions}
        mineCompetitions={this.props.mineCompetitions}
        archivedCompetitions={this.props.archivedCompetitions}
        currentAllCompetitions={this.props.currentAllCompetitions}
        currentFeaturedCompetitions={this.props.currentFeaturedCompetitions}
        currentArchivedCompetitions={this.props.currentArchivedCompetitions}
        setCurrentCompetitions={this.props.setCurrentCompetitions}
        clearCurrentCompetitions={this.props.clearCurrentCompetitions}
        onMoreClick={(id, name) => this.onMoreClick(id, name)}
        leaveCompetition={id => this.leaveCompetition(id)}
        enrollCompetition={id => this.enrollCompetition(id)}
        onCreateCompetition={this.createCompetition}
        competitionFormSchemaOptions={this.state.competitionFormSchemaOptions}
        supportTreecounterAction={this.props.supportTreecounterAction}
        editCompetition={id => this.editCompetition(id)}
        navigation={this.props.navigation}
        fetchMineCompetitions={() => this.fetchMineCompetitions()}
        fetchCompetitions={(category, page) =>
          this.fetchCompetitions(category, page)
        }
      />
    ) : (
      <LoadingIndicator contentLoader screen="Competition" />
    );
  }

  onMoreClick(id, name) {
    const { navigation } = this.props;
    if (navigation) {
      updateRoute('app_competition', navigation, 1, {
        competition: id,
        titleParam: name
      });
    }
  }
}
const mapStateToProps = state => ({
  // allCompetitions: getAllCompetitionsSelector(state),
  contentloader: getContentLoaderState(state),
  allCompetitions: state.competitionsReducer.allCompetitions,
  featuredCompetitions: state.competitionsReducer.featuredCompetitions,
  archivedCompetitions: state.competitionsReducer.archivedCompetitions,
  currentAllCompetitions: state.competitionsReducer.currentAllCompetitions,
  currentFeaturedCompetitions:
    state.competitionsReducer.currentFeaturedCompetitions,
  currentArchivedCompetitions:
    state.competitionsReducer.currentArchivedCompetitions,
  mineCompetitions: state.competitionsReducer.mineCompetitions
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCompetitions,
      fetchMineCompetitions,
      leaveCompetition,
      enrollCompetition,
      createCompetition,
      supportTreecounterAction,
      setCurrentCompetitions,
      clearCurrentCompetitions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionContainer);
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
