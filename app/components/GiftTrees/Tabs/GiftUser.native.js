import React, { Component } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import SearchUser from './SearchUser.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import CardLayout from '../../Common/Card';
import { iosInformation } from '../../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../../locales/i18n';

export default class GiftUser extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedSuggestion: null };
    this.onNextClick = this.onNextClick.bind(this);
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
    this.state = { form: {} };
  }
  componentWillMount() {}
  onSearchResultClick(suggestion) {
    // console.log('suggestion clicked', suggestion);
    this.setState({ selectedSuggestion: suggestion });
  }
  onNextClick() {
    if (this.state.selectedSuggestion) {
      this.setState(
        {
          form: {
            treeCounter: this.state.selectedSuggestion.treecounterId,
            message: this.state.message,
            name: this.state.selectedSuggestion.name
          }
        },
        () => {
          this.props.openProjects(this.state.form, 'direct');
        }
      );
    } else {
      this.setState({ error: i18n.t('label.select_valid_user_profile') });
    }
  }
  onChangeText(val) {
    this.setState({ message: val });
  }
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 72 }}
        enableOnAndroid={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: '100%'
          }}
        >
          <CardLayout>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 40, height: 40, alignSelf: 'center' }}>
                <Image
                  style={{ width: undefined, height: undefined, flex: 1 }}
                  source={iosInformation}
                />
              </View>

              <Text
                style={{
                  padding: 5,
                  color: '#c4bfbf',
                  marginRight: 10,
                  width: '90%',
                  color: '#686060'
                }}
              >
                {i18n.t('label.gift_trees_description')}
              </Text>
            </View>
          </CardLayout>
          <CardLayout style={{ flex: 0.8 }}>
            <SearchUser
              onSearchResultClick={this.onSearchResultClick}
              currentUserProfile={this.props.currentUserProfile}
              hideCompetitions
            />
            <View>
              <Text
                style={{
                  color: '#ff0033',
                  fontSize: 11
                }}
              >
                {this.state.error}
              </Text>
            </View>

            <TextInput
              multiline={true}
              style={{
                height: 100,
                margin: 10,
                padding: 5
              }}
              underlineColorAndroid={'transparent'}
              onChangeText={val => this.onChangeText(val)}
              placeholder={i18n.t('label.gift_message')}
            />
          </CardLayout>

          <View style={{ flex: 0.2 }}>
            <PrimaryButton onClick={this.onNextClick}>
              {i18n.t('label.next')}
            </PrimaryButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
