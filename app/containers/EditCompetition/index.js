import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  currentUserProfileSelector,
  selectedPlantProjectSelector,
  selectedTpoSelector
} from '../../selectors';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import CompetitionFull from '../../components/Competition/CompetitionFull';

import {
  clearPlantProject,
  selectPlantProjectAction
} from '../../actions/selectPlantProjectAction';
import {
  confirmPart,
  cancelInvite,
  declinePart,
  enrollCompetition,
  invitePart,
  leaveCompetition,
  editCompetition
} from '../../actions/competition';
import CompetitionParticipant from '../../components/Competition/CompetitionParticipant.native';
import { supportTreecounterAction } from '../../actions/supportTreecounterAction';
import Challenge from '../../components/Challenge/createChallenge';
import EditCompetition from '../../components/Competition/EditCompetition.native';
import { handleServerResponseError } from '../../helpers/utils';
import { competitionFormSchemaOptions } from '../../server/parsedSchemas/competition';

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
    } else if (nextProps.navigation && this.props.navigation) {
      if (nextProps.navigation !== this.props.navigation) {
        this.setState({
          competition_id: nextProps.navigation.getParam('competition', null)
        });
      }
    }
  }
  editCompetition(value, params, formRef) {
    let json = {
      name: value.name,
      goal: value.goal,
      endDate: value.endDate,
      access: value.access,
      description: value.description,
      contact: value.contact,
      email: value.email,
      imageFile: value.imageFile
    };
    this.props
      .editCompetition(json, params, this.props.navigation)
      .then(success => {})
      .catch(err => {
        console.log('err signup data', err);
        let newSchemaOptions = handleServerResponseError(
          err,
          this.state.competitionFormSchemaOptions
        );
        this.setState(
          {
            competitionFormSchemaOptions: {
              ...newSchemaOptions
            }
          },
          () => {
            formRef.validate();
          }
        );
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
          competitionFormSchemaOptions={this.state.competitionFormSchemaOptions}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editCompetition
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
  editCompetition: PropTypes.any
};
