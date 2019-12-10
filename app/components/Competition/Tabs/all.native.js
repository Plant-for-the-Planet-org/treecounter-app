import React, { Component } from 'react';
import { ScrollView, Text, View, Image, RefreshControl } from 'react-native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees } from './../../../assets';
import styles from '../../../styles/competition/competition-master.native';
import i18n from '../../../locales/i18n';

export default class AllCompetitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllCompetitions: [],
      refreshing: false
    };
  }
  componentWillMount() {
    let { allCompetitions } = this.props;
    let showAllCompetitions = [];
    let CurrentDate = new Date();

    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'all') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (endDate > CurrentDate) {
              showAllCompetitions.push(comp);
            }
          });
        }
      });
    }
    this.setState({
      showAllCompetitions: showAllCompetitions
    });
  }

  componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
    let showAllCompetitions = [];
    let CurrentDate = new Date();

    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'all') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (endDate > CurrentDate) {
              showAllCompetitions.push(comp);
            }
          });
        }
      });
    }
    this.setState({
      showAllCompetitions: showAllCompetitions
    });
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.props
      .updateAllCompetitions()
      .then(() => {
        this.setState({ refreshing: false });
      })
      .catch(() => {
        this.setState({ refreshing: false });
      });
  };

  render() {
    let { showAllCompetitions } = this.state;
    return (
      <ScrollView
        contentContainerStyle={[
          scrollStyle.styleContainer,
          { paddingBottom: 72 }
        ]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>
            {i18n.t('label.all_compeition_tab_header')}
          </Text>
          <Image
            source={trees}
            style={{ height: 60, flex: 1 }}
            resizeMode="contain"
          />
        </View>
        {showAllCompetitions.length > 0
          ? showAllCompetitions.map(competition => (
              <CompetitionSnippet
                key={'competition' + competition.id}
                cardStyle={styles.cardStyle}
                onMoreClick={id => this.props.onMoreClick(id, competition.name)}
                leaveCompetition={id => this.props.leaveCompetition(id)}
                enrollCompetition={id => this.props.enrollCompetition(id)}
                editCompetition={this.props.editCompetition}
                competition={competition}
                type="all"
              />
            ))
          : null}
      </ScrollView>
    );
  }
}
AllCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
