/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import {
  ScrollView,
  Text,
  View,
  Image,
  RefreshControl,
  FlatList,
  Animated
} from 'react-native';
import styles from '../../../styles/competition/competition-master.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees } from './../../../assets';
import i18n from '../../../locales/i18n';

export default class ClosedCompetitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archivedCompetitions: [],
      refreshing: false
    };
  }
  UNSAFE_componentWillMount() {
    let { allCompetitions } = this.props;
    let archivedCompetitions = [];
    let CurrentDate = new Date();

    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'archived') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (CurrentDate > endDate) {
              archivedCompetitions.push(comp);
            }
          });
        }
      });
    }
    this.setState({
      archivedCompetitions: archivedCompetitions
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
    let archivedCompetitions = [];
    let CurrentDate = new Date();
    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'archived') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (CurrentDate > endDate) {
              archivedCompetitions.push(comp);
            }
          });
        }
      });
    }
    this.setState({
      archivedCompetitions: archivedCompetitions
    });
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.props
      .updateArchivedCompetitions()
      .then(() => {
        this.setState({ refreshing: false });
      })
      .catch(() => {
        this.setState({ refreshing: false });
      });
  };

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => (
    <CompetitionSnippet
      key={'competition' + item.id}
      cardStyle={styles.cardStyle}
      onMoreClick={id => this.props.onMoreClick(id, item.name)}
      leaveCompetition={id => this.props.leaveCompetition(id)}
      enrollCompetition={id => this.props.enrollCompetition(id)}
      editCompetition={this.props.editCompetition}
      competition={item}
      type="featured"
    />
  );

  render() {
    let { archivedCompetitions } = this.state;
    return (
      <ScrollView
        contentContainerStyle={[
          scrollStyle.styleContainer,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        scrollEventThrottle={24}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: this.props.scrollY }
            }
          }
        ])}
      >
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>
            {i18n.t('label.archived_compeition_tab_header')}
          </Text>
          <Image
            source={trees}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <FlatList
          data={archivedCompetitions}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </ScrollView>
    );
  }
}
ClosedCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
