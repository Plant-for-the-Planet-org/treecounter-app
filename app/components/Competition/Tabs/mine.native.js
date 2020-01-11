/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  RefreshControl,
  FlatList
} from 'react-native';
import styles from '../../../styles/competition/competition-master.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees } from './../../../assets';
import i18n from '../../../locales/i18n';
export default class MineCompetitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCompetitions: [],
      refreshing: false
    };
  }

  componentDidMount() {
    let { allCompetitions } = this.props;
    let myCompetitions = [];
    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'mine') {
          val.competitions.forEach(comp => {
            myCompetitions.push(comp);
          });
        }
      });
    }
    this.setState({
      myCompetitions: myCompetitions
    });
  }

  componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
    if (allCompetitions !== this.props.allCompetitions) {
      let myCompetitions = [];
      if (allCompetitions.length > 0) {
        allCompetitions.forEach(val => {
          if (val.category === 'mine') {
            val.competitions.forEach(comp => {
              myCompetitions.push(comp);
            });
          }
        });
      }
      this.setState({
        myCompetitions: myCompetitions
      });
    }
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.props
      .updateMineCompetitions()
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
      competition={item}
      leaveCompetition={id => this.props.leaveCompetition(id)}
      enrollCompetition={id => this.props.enrollCompetition(id)}
      editCompetition={this.props.editCompetition}
      type="mine"
    />
  );

  render() {
    let { myCompetitions } = this.state;

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
            {myCompetitions.length > 0
              ? i18n.t('label.mine_compeition_tab_header')
              : i18n.t('label.mine_compeition_tab_header_null')}
          </Text>
          <Image
            source={trees}
            style={{ height: 60, flex: 1 }}
            resizeMode="contain"
          />
        </View>

        <FlatList
          data={myCompetitions}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </ScrollView>
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
