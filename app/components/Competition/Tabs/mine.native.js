import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/competition/mine.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import ActionButton from 'react-native-action-button';
import CardLayout from '../../Common/Card';

export default class MineCompetitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      pageIndex: 0,
      showCompetitionForm: false
    };
    this.onActionButtonPress = this.onActionButtonPress.bind(this);
  }
  onActionButtonPress() {
    this.setState({
      showCompetitionForm: true
    });
  }
  componentDidMount() {
    if (this.props.mineCompetitions.length === 0) {
      this.setState({
        showCompetitionForm: true
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if (nextProps.mineCompetitions !== this.props.mineCompetitions) {
      if (nextProps.mineCompetitions.length === 0) {
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

  render() {
    let { featuredProjects } = this.state;
    return !this.state.showCompetitionForm ? (
      <View style={styles.mineContainer}>
        <ScrollView style={styles.mineContainer}>
          {this.props.mineCompetitions && this.props.mineCompetitions.length > 0
            ? this.props.mineCompetitions.map(project => (
                <CompetitionSnippet
                  key={'competition' + project.id}
                  cardStyle={styles.cardStyle}
                  onMoreClick={(id, type) => this.props.onMoreClick(id, type)}
                  competition={project}
                  type={project.category}
                />
              ))
            : null}
        </ScrollView>
        <ActionButton
          buttonColor="rgba(255,255,255,1)"
          buttonTextStyle={styles.action_button}
          onPress={() => this.onActionButtonPress()}
        />
      </View>
    ) : (
      <View style={styles.mineFContainer}>
        <CardLayout style={[styles.mineFormContainer]}>
          <View style={styles.mineSpecsContainer}>
            <Text>This is form</Text>
          </View>
        </CardLayout>
      </View>
    );
  }
}
