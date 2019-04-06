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
let Form = t.form.Form;

export default class MineCompetitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      pageIndex: 0,
      showCompetitionForm: false,
      featuredCompetitions: []
    };
    this.onActionButtonPress = this.onActionButtonPress.bind(this);
  }
  onActionButtonPress() {
    this.setState({
      showCompetitionForm: true
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
  componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
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
                  onMoreClick={id => this.props.onMoreClick(id)}
                  competition={project}
                  leaveCompetition={id => this.props.leaveCompetition(id)}
                  enrollCompetition={id => this.props.enrollCompetition(id)}
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
        <CardLayout>
          <Form
            ref={'competitionForm'}
            type={competitionFormSchema}
            options={competitionFormSchemaOptions}
          />
        </CardLayout>
      </KeyboardAwareScrollView>
    );
  }
}
MineCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any
};
