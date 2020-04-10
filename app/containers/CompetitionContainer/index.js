import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createCompetition,
  enrollCompetition,
  fetchCompetitions,
  fetchMineCompetitions,
  leaveCompetition
} from '../../actions/competition';
import { supportTreecounterAction } from '../../actions/supportTreecounterAction';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Competiton from '../../components/Competition';
import {
  setDonationContext,
  setSupportDetails
} from '../../components/DonateTrees/redux/action';
import { debug } from '../../debug';
import { updateRoute } from '../../helpers/routerHelper';
import {
  formatDateToMySQL,
  handleServerResponseError
} from '../../helpers/utils';
import { getContentLoaderState } from '../../reducers/contentloaderReducer';
import { getAllCompetitionsSelector } from '../../selectors';
import { competitionFormSchemaOptions } from '../../server/parsedSchemas/competition';
class CompetitionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      competitionFormSchemaOptions
    };
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
          this.setState(
            {
              competitionFormSchemaOptions: {
                ...newSchemaOptions
              }
            }
            // () => {
            //   formRef.validate();
            // }
          );
        });
    }
  };
  componentDidMount() {
    this.props.fetchCompetitions('featured');
    this.props.fetchCompetitions('all');
    this.props.fetchCompetitions('archived');
    this.props.fetchMineCompetitions();
  }
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

  updateAllCompetitions = async () => {
    return this.props.fetchCompetitions('all');
  };
  updateFeaturedCompetitions = async () => {
    return this.props.fetchCompetitions('featured');
  };
  updateMineCompetitions = async () => {
    return this.props.fetchMineCompetitions();
  };
  updateArchivedCompetitions = async () => {
    return this.props.fetchCompetitions('archived');
  };

  render() {
    debug(this.props.contentloader, '**********************');
    const { contentloader } = this.props;
    return !contentloader ? (
      <Competiton
        allCompetitions={this.props.allCompetitions}
        onMoreClick={(id, name) => this.onMoreClick(id, name)}
        leaveCompetition={id => this.leaveCompetition(id)}
        enrollCompetition={id => this.enrollCompetition(id)}
        onCreateCompetition={this.createCompetition}
        competitionFormSchemaOptions={this.state.competitionFormSchemaOptions}
        supportTreecounterAction={this.props.supportTreecounterAction}
        setSupportDetails={this.props.setSupportDetails}
        setDonationContext={this.props.setDonationContext}
        editCompetition={id => this.editCompetition(id)}
        navigation={this.props.navigation}
        updateAllCompetitions={this.updateAllCompetitions}
        updateFeaturedCompetitions={this.updateFeaturedCompetitions}
        updateMineCompetitions={this.updateMineCompetitions}
        updateArchivedCompetitions={this.updateArchivedCompetitions}
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
  allCompetitions: getAllCompetitionsSelector(state),
  contentloader: getContentLoaderState(state)
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
      setSupportDetails,
      setDonationContext
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
