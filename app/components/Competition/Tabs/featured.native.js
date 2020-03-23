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

export default class FeaturedCompetitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featuredCompetitions: [],
      refreshing: false
    };
  }
  UNSAFE_componentWillMount() {
    let { allCompetitions } = this.props;
    let featuredCompetitions = [];
    let CurrentDate = new Date();

    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'featured') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (endDate > CurrentDate) {
              featuredCompetitions.push(comp);
            }
          });
        }
      });
    }
    this.setState({
      featuredCompetitions: featuredCompetitions
    });
  }

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

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
    let featuredCompetitions = [];
    let CurrentDate = new Date();
    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'featured') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (endDate > CurrentDate) {
              featuredCompetitions.push(comp);
            }
          });
        }
      });
    }
    this.setState({
      featuredCompetitions: featuredCompetitions
    });
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.props
      .updateFeaturedCompetitions()
      .then(() => {
        this.setState({ refreshing: false });
      })
      .catch(() => {
        this.setState({ refreshing: false });
      });
  };

  render() {
    let { featuredCompetitions } = this.state;
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
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: this.props.scrollY }
              }
            }
          ],
          {
            useNativeDriver: false
          }
        )}
      >
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>
            {i18n.t('label.featured_compeition_tab_header')}
          </Text>
          <Image
            source={trees}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>

        <FlatList
          data={featuredCompetitions}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </ScrollView>
    );
  }
}

FeaturedCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
