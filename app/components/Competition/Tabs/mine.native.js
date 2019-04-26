import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/competition/mine.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import ActionButton from 'react-native-action-button';
import CardLayout from '../../Common/Card';
import PropTypes from 'prop-types';
import FeaturedCompetitions from './featured.native';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signupFormSchema } from '../../../server/parsedSchemas/signup';
import {
  competitionFormSchema,
  competitionFormSchemaOptions
} from '../../../server/parsedSchemas/competition';
import i18n from '../../../locales/i18n';
import PrimaryButton from '../../Common/Button/PrimaryButton';
let Form = t.form.Form;

export default class MineCompetitions extends Component {
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
      showCompetitionForm: true,
      formValue: null
    });
  }
  componentDidMount() {
    let { allCompetitions } = this.props;
    let featuredCompetitions = [];
    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'mine') {
          val.competitions.forEach(comp => {
            featuredCompetitions.push(comp);
          });
        }
      });
    }
    this.setState({
      featuredCompetitions: featuredCompetitions
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.allCompetitions !== this.props.allCompetitions ||
      nextState.showCompetitionForm !== this.state.showCompetitionForm
    ) {
      return true;
    } else {
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
  }
  componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
    if (allCompetitions !== this.props.allCompetitions) {
      let featuredCompetitions = [];
      if (allCompetitions.length > 0) {
        allCompetitions.forEach(val => {
          if (val.category === 'mine') {
            val.competitions.forEach(comp => {
              featuredCompetitions.push(comp);
            });
          }
        });
      }
      this.setState({
        featuredCompetitions: featuredCompetitions
      });
      if (featuredCompetitions.length === 0) {
        this.setState({
          showCompetitionForm: true
        });
      } else {
        this.setState({
          showCompetitionForm: false
        });
      }
    }
  }
  onCreateCompetition() {
    if (this.createCompetition.refs.input.state.value) {
      this.setState({
        formValue: this.createCompetition.refs.input.state.value
      });
      this.props.onCreateCompetition(
        this.createCompetition.refs.input.state.value,
        this.createCompetition
      );
    }
  }

  render() {
    let { featuredProjects, featuredCompetitions } = this.state;
    return !this.state.showCompetitionForm ? (
      <View style={styles.mineContainer}>
        <ScrollView style={styles.mineContainer}>
          {featuredCompetitions.length > 0
            ? featuredCompetitions.map(project => (
                <CompetitionSnippet
                  key={'competition' + project.id}
                  cardStyle={styles.cardStyle}
                  onMoreClick={id => this.props.onMoreClick(id, project.name)}
                  competition={project}
                  leaveCompetition={id => this.props.leaveCompetition(id)}
                  enrollCompetition={id => this.props.enrollCompetition(id)}
                  editCompetition={this.props.editCompetition}
                  type="mine"
                />
              ))
            : null}
        </ScrollView>
        <ActionButton
          buttonColor="rgba(183, 211, 127, 1)"
          buttonTextStyle={styles.action_button}
          onPress={() => this.onActionButtonPress()}
        />
      </View>
    ) : (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <CardLayout style={{ flex: 1 }}>
          <Form
            ref={this.createCompetitionForm}
            type={competitionFormSchema}
            options={this.props.competitionFormSchemaOptions}
            value={this.state.formValue}
          />
          <PrimaryButton onClick={() => this.onCreateCompetition()}>
            {i18n.t('label.create_competition')}
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
MineCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  onCreateCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
