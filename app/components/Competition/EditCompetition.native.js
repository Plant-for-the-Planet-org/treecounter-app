import React, { Component } from 'react';
import { updateStaticRoute } from '../../helpers/routerHelper';
import CardLayout from '../Common/Card';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  competitionFormSchema,
  competitionFormSchemaOptions
} from '../../server/parsedSchemas/competition';
import i18n from '../../locales/i18n';
import PrimaryButton from '../Common/Button/PrimaryButton';
import {
  competitionDetailSelector,
  userCompetitionEnrolledSelector,
  userTreecounterSelector
} from '../../selectors';
import { fetchCompetitionDetail } from '../../actions/competition';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
let Form = t.form.Form;

class EditCompetition extends Component {
  constructor(props) {
    super(props);
    this.createCompetitionForm = element => {
      this.createCompetition = element;
    };
    this.state = {
      expanded: false,
      pageIndex: 0,
      showCompetitionForm: true,
      featuredCompetitions: [],
      formValue: null
    };
    this.onActionButtonPress = this.onActionButtonPress.bind(this);
    this.onCreateCompetition = this.onCreateCompetition.bind(this);
  }
  onActionButtonPress() {
    this.setState({
      showCompetitionForm: true
    });
  }
  componentDidMount() {
    if (this.props.competition_id) {
      this.props.fetchCompetitionDetail(this.props.competition_id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let returnValue = false;
    Object.entries(this.props).forEach(
      ([key, val]) =>
        nextProps[key] !== val ? (returnValue = true) : (returnValue = false)
    );
    Object.entries(this.state).forEach(
      ([key, val]) =>
        nextState[key] !== val ? (returnValue = true) : (returnValue = false)
    );
    return returnValue;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      formValue: nextProps.competitionDetail
    });
  }
  onCreateCompetition() {
    if (this.createCompetition.refs.input.state.value) {
      this.setState({
        formValue: this.createCompetition.refs.input.state.value
      });
      this.props.editCompetition(
        this.createCompetition.refs.input.state.value,
        this.props.competition_id
      );
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <CardLayout style={{ flex: 1 }}>
          <Form
            ref={this.createCompetitionForm}
            type={competitionFormSchema}
            options={competitionFormSchemaOptions}
            value={this.state.formValue}
          />
          <PrimaryButton onClick={() => this.onCreateCompetition()}>
            {i18n.t('label.edit_competition')}
          </PrimaryButton>
        </CardLayout>
      </KeyboardAwareScrollView>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    Object.entries(this.state).forEach(
      ([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
    );
  }
}
const mapStateToProps = state => ({
  competitionDetail: competitionDetailSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCompetitionDetail
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCompetition);
EditCompetition.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  onCreateCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
