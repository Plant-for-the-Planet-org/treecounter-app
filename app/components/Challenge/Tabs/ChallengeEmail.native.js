import React, { Component } from 'react';
import {
  challengeFormSchema,
  challengeFormSchemaOptions
} from '../../../server/parsedSchemas/challenge';
import t from 'tcomb-form-native';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { TextInput, View, Text } from 'react-native';
import ChallengeList from '../challengeList';
import { delimitNumbers } from '../../../utils/utils';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import CheckBox from 'react-native-check-box';
import i18n from '../../../locales/i18n';
import TabContainer from '../../../containers/Menu/TabContainer';

import challengeStyles from '../../../styles/challenge';
import styles from '../../../styles/register_trees.native';
import errorStyles from '../../../styles/profilepicker.native';
let TCombForm = t.form.Form;
const getFormLayoutTemplate = () => {
  const formLayoutTreesTemplate = locals => {
    return (
      <View style={styles.registerTree__form}>
        <View style={styles.registerTree__form__row}>
          <View style={{ flex: 1 }}>{locals.inputs.firstname}</View>
          <View style={{ flex: 1 }}>{locals.inputs.lastname}</View>
        </View>
        <View style={styles.registerTree__form__row__split}>
          {locals.inputs.email}
        </View>
      </View>
    );
  };
  return formLayoutTreesTemplate;
};
class ChallengeEmail extends Component {
  constructor(props) {
    super(props);
    this.setChallengeInvitation = element => {
      this.challengeInvitation = element;
    };
    this.state = {
      treeCount: 1000,
      isChecked: false,
      byYear: '',
      tempForm: {}
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
  }

  onNextClick() {
    if (this.challengeInvitation.getValue()) {
      let value = this.challengeInvitation.getValue();
      requestData = {
        invitee: { ...value }
      };
      if (this.state.isChecked) {
        requestData.endDate = this.state.byYear;
      }
      requestData.challengeMethod = 'invitation';
      requestData.goal = this.state.treeCount;
      this.props.challengeUser(requestData);
      // this.setState({
      //   treeCount: 1000,
      //   isChecked: false,
      //   byYear: '',
      //   tempForm: {}
      // });
      // let currentYear = new Date().getFullYear(),
      //   years = [];
      // let endYear = currentYear + 10;
      //
      // while (currentYear <= endYear) {
      //   years.push(currentYear++);
      // }
      // this.years = years.map(item => {
      //   return { value: item };
      // });
    } else {
      this.challengeInvitation.validate();
    }
  }

  onFormChange = value => {
    this.setState({ tempForm: value });
  };

  handleTreeCountChange(treeCount) {
    if (treeCount === '') {
      treeCount = 0;
    }
    this.setState({
      treeCount: treeCount ? parseInt(treeCount.replace(/,/g, '')) : 0
    });
  }

  render() {
    const schema = {
      template: getFormLayoutTemplate(),
      ...this.props.challengeFormSchemaOptions
    };
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: '100%'
          }}
          contentContainerStyle={{
            paddingBottom: 72
          }}
          enableOnAndroid={true}
        >
          {this.props.error ? (
            <View style={errorStyles.containerDedicateStyle}>
              <View style={errorStyles.dedicateTreeName}>
                <Text style={errorStyles.textDedicateStyle}>
                  {this.props.error}
                </Text>
              </View>
            </View>
          ) : null}
          <CardLayout style={[challengeStyles.challengeContainer]}>
            <View style={challengeStyles.challengeColumnContainer}>
              <TCombForm
                ref={this.setChallengeInvitation}
                type={challengeFormSchema}
                options={schema}
                value={this.state.tempForm}
                onChange={this.onFormChange}
              />
              <View style={challengeStyles.flexContainerStyle}>
                <Text>{i18n.t('label.challenge_to_plant')} </Text>
                <TextInput
                  keyboardType="numeric"
                  style={challengeStyles.treecount_input}
                  onChangeText={evt => this.handleTreeCountChange(evt)}
                  value={delimitNumbers(this.state.treeCount)}
                  autoCapitalize={'sentences'}
                />
                <Text>{i18n.t('label.trees')}</Text>
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
                  rightText={'by'}
                />
                <Dropdown
                  containerStyle={{
                    width: 70
                  }}
                  dropdownOffset={{
                    top: 0,
                    left: 0
                  }}
                  onChangeText={item =>
                    this.setState({
                      byYear: item
                    })
                  }
                  label="Year"
                  data={this.years}
                />
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
        </KeyboardAwareScrollView>
        <TabContainer {...this.props} />
      </View>
    );
  }
}

export default withNavigation(ChallengeEmail);
