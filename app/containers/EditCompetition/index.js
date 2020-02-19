import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import { editCompetition, deleteCompetition } from '../../actions/competition';
import EditCompetition from '../../components/Competition/EditCompetition.native';
import { handleServerResponseError } from '../../helpers/utils';
import { competitionFormSchemaOptions } from '../../server/parsedSchemas/competition';
import { formatDateToMySQL } from '../../helpers/utils';

class EditCompetitionContainer extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    let competition_id = null;
    if (match) {
      competition_id = match.params.competition;
    } else if (props.navigation) {
      competition_id = props.navigation.getParam('competition', null);
    }
    this.state = {
      competition_id: competition_id,
      competitionFormSchemaOptions
    };
    this.editCompetition = this.editCompetition.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match) {
      // empty
    } else if (nextProps.navigation && this.props.navigation) {
      if (nextProps.navigation !== this.props.navigation) {
        this.setState({
          competition_id: nextProps.navigation.getParam('competition', null)
        });
      }
    }
  }
  editCompetition(value, params) {
    debug(value);
    let json = {
      name: value.name,
      goal: value.goal,
      endDate: formatDateToMySQL(value.endDate),
      access: value.access,
      description: value.description
    };
    if (value.imageFile && value.imageFile.includes('base64')) {
      json.imageFile = value.imageFile;
    }
    if (value.imageFile && value.imageFile === 'null') {
      json.imageFile = null;
    }
    this.props
      .editCompetition(json, params, this.props.navigation)
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
  componentDidMount() {}

  render() {
    if (this.state.competition_id) {
      return (
        <EditCompetition
          {...this.props}
          competition_id={this.state.competition_id}
          editCompetition={this.editCompetition}
          deleteCompetition={this.props.deleteCompetition}
          competitionFormSchemaOptions={this.state.competitionFormSchemaOptions}
          navigation={this.props.navigation}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editCompetition,
      deleteCompetition
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditCompetitionContainer
);

EditCompetitionContainer.propTypes = {
  match: PropTypes.any,
  navigation: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  confirmPart: PropTypes.any,
  declinePart: PropTypes.any,
  cancelInvite: PropTypes.any,
  supportTreecounterAction: PropTypes.any,
  editCompetition: PropTypes.any,
  deleteCompetition: PropTypes.any
};
