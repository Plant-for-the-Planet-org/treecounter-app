import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/competition/mine.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n';
import close_green from '../../../assets/images/icons/close_green.png';
import { trees } from './../../../assets';

export default class MineCompetitions extends Component {
  constructor(props) {
    super(props);
    this.createCompetitionForm = element => {
      this.createCompetition = element;
    };
    this.state = {
      expanded: false,
      pageIndex: 0,
      showCompetitionForm: false,
      featuredCompetitions: [],
      formValue: null
    };
    this.onActionButtonPress = this.onActionButtonPress.bind(this);
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
    }
  }

  render() {
    let { featuredProjects, featuredCompetitions } = this.state;

    return (
      <View style={styles.mineContainer}>
        <ScrollView
          contentContainerStyle={[
            scrollStyle.styleContainer,
            { paddingBottom: 72 }
          ]}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: 20,
              marginBottom: 0
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 21,
                letterSpacing: 0,
                textAlign: 'left',
                color: '#4d5153',
                maxWidth: '70%'
              }}
            >
              {featuredCompetitions.length > 0
                ? "List of all competitions you've joined or created."
                : "It seems you don't have any competitions yet. Please join or create one, and they will appear here."}
            </Text>
            <Image
              source={trees}
              style={{ height: 60, flex: 1 }}
              resizeMode="contain"
            />
          </View>
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
        {/* <ActionButton
          buttonColor="rgba(183, 211, 127, 1)"
          buttonTextStyle={styles.action_button}
          offsetY={72}
          onPress={() => this.onActionButtonPress()}
        /> */}
      </View>
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
