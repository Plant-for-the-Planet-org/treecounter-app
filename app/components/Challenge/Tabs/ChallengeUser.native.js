import React, { Component } from 'react';
import { ScrollView, View, TextInput, Text } from 'react-native';
import SearchUser from './SearchUser.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import ChallengeList from '../challengeList';
import CardLayout from '../../Common/Card';
import { Picker } from '@react-native-community/picker';
import { withNavigation } from 'react-navigation';
import CheckBox from 'react-native-check-box';
// import TabContainer from '../../../containers/Menu/TabContainer';
import i18n from '../../../locales/i18n';
import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';

import challengeStyles from '../../../styles/challenge';
import styles from '../../../styles/register_trees.native';
import errorStyles from '../../../styles/profilepicker.native';

class ChallengeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSuggestion: null,
      treeCount: 1000,
      isChecked: false,
      byYear: '',
      searchSuggestionName: null
    };
    let currentYear = new Date().getFullYear(),
      years = [];
    let endYear = currentYear + 10;

    while (currentYear <= endYear) {
      years.push(currentYear++);
    }
    this.years = years.map(item => {
      return { value: item };
    });
    this.onNextClick = this.onNextClick.bind(this);
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.challengeSuccess && nextProps.challengeSuccess) {
      let currentYear = new Date().getFullYear(),
        years = [];
      let endYear = currentYear + 10;

      while (currentYear <= endYear) {
        years.push(currentYear++);
      }
      this.years = years.map(item => {
        return { value: item };
      });
      this.setState({
        selectedSuggestion: null,
        treeCount: 1000,
        isChecked: false,
        byYear: '',
        searchSuggestionName: ''
      });
      this.props.resetChallengeSuccess();
    }
  }

  onSearchResultClick(suggestion) {
    this.setState({
      selectedSuggestion: suggestion,
      searchSuggestionName: suggestion.name
    });
  }

  handleTreeCountChange(treeCount) {
    if (treeCount === '') {
      treeCount = 0;
    }
    this.setState({
      treeCount: treeCount ? parseInt(treeCount.replace(/,/g, '')) : 0
    });
  }

  onNextClick() {
    if (this.state.selectedSuggestion) {
      let requestData;
      requestData = {
        challenged: this.state.selectedSuggestion.treecounterId
      };
      if (this.state.isChecked) {
        if (this.state.byYear === '') {
          NotificationManager.error(
            i18n.t('label.please_select_year'),
            i18n.t('label.error'),
            5000
          );
          return;
        }
        requestData.endDate = this.state.byYear;
      }
      requestData.challengeMethod = 'direct';
      requestData.goal = this.state.treeCount;
      this.props.challengeUser(requestData);
    } else {
      NotificationManager.error(
        i18n.t('label.please_select_user'),
        i18n.t('label.error'),
        5000
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: '100%'
          }}
          contentContainerStyle={{
            paddingBottom: 72
          }}
        >
          {this.props.error ? (
            <View style={errorStyles.containerDedicateStyle}>
              <View style={errorStyles.dedicateTreeName}>
                <Text style={errorStyles.textDedicateStyle}>
                  {i18n.t('label.challenge_error', {
                    user: this.state.selectedSuggestion.name,
                    target: parseInt(this.props.error)
                  })}
                </Text>
              </View>
            </View>
          ) : null}
          <CardLayout style={[challengeStyles.challengeContainer]}>
            <View style={challengeStyles.challengeColumnContainer}>
              <SearchUser
                onSearchResultClick={this.onSearchResultClick}
                currentUserProfile={this.props.currentUserProfile}
                searchSuggestion={this.state.searchSuggestionName}
                resetState={this.props.challengeSuccess}
                alreadyInvited={[]}
                hideCompetitions
              />
              <View style={challengeStyles.flexContainerStyle}>
                <Text>{i18n.t('label.challenge_to_plant')} </Text>
              </View>
              <View style={challengeStyles.flexContainerStyle}>
                <TextInput
                  keyboardType="numeric"
                  underlineColorAndroid={'transparent'}
                  style={challengeStyles.treecount_input}
                  onChangeText={evt => {
                    this.handleTreeCountChange(evt);
                  }}
                  value={String(this.state.treeCount)}
                  autoCapitalize={'sentences'}
                />
                <Text>{' ' + i18n.t('label.trees')}</Text>
              </View>
              <View style={challengeStyles.flexContainerStyle}>
                <CheckBox
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked
                    });
                  }}
                  style={{
                    width: 70
                  }}
                  isChecked={this.state.isChecked}
                  rightText={i18n.t('label.by')}
                />
                <Picker
                  selectedValue={this.state.byYear}
                  style={{width: '50%'}}
                  itemStyle={styles.textStyle}
                  mode="dialog"
                  prompt={i18n.t('label.year')}
                  onValueChange={(itemValue) =>
                    this.setState({byYear: itemValue})
                  }>
                  {this.years
                    .map(year => {
                      return (
                        <Picker.Item key={'' + year.value} label={'' + year.value} value={year.value} />
                      );
                    })}
                </Picker>
              </View>
              <PrimaryButton onClick={this.onNextClick}>
                {i18n.t('label.challenge_heading')}
              </PrimaryButton>
            </View>
          </CardLayout>
          <ChallengeList
            challenges={this.props.challenges}
            navigation={this.props.navigation}
            challengeStatus={this.props.challengeStatus}
          />
        </ScrollView>
        {/* <TabContainer {...this.props} /> */}
      </View>
    );
  }
}

export default withNavigation(ChallengeUser);
