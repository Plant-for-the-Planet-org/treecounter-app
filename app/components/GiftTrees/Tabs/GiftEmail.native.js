import React, { Component } from 'react';
import {
  giftInvitationFormSchema,
  giftInvitationSchemaOptions
} from '../../../server/parsedSchemas/giftTrees';
import t from 'tcomb-form-native';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { TextInput, View, Image, Text } from 'react-native';
import { iosInformation } from '../../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../../locales/i18n';

let TCombForm = t.form.Form;

export default class GiftEmail extends Component {
  constructor(props) {
    super(props);
    this.setGiftInvitation = element => {
      this.giftInvitation = element;
    };
    this.state = { formValue: null, giftMessage: '' };
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentWillMount() {}

  onNextClick() {
    if (this.giftInvitation.getValue()) {
      this.setState({ formValue: this.giftInvitation.getValue() });
      this.props.openProjects(
        this.giftInvitation.getValue(),
        'invitation',
        this.state.giftMessage
      );
    }
  }
  onChangeText(val) {
    if (!this.giftInvitation.getValue()) {
      this.giftInvitation.validate();
    } else {
      this.setState({ formValue: this.giftInvitation.getValue() });
    }
    this.setState({
      giftMessage: val
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should component update called');
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
  render() {
    console.log('Render of email called');
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View
          style={{
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
                  width: '90%'
                }}
              >
                {i18n.t('label.gift_trees_description')}
              </Text>
            </View>
          </CardLayout>
          <CardLayout>
            <TextInput
              // multiline={true}
              style={{
                height: 100,
                color: '#686060',
                borderColor: '#c4bfbf',
                borderWidth: 1,
                margin: 10,
                padding: 5
              }}
              underlineColorAndroid={'transparent'}
              onChangeText={val => this.onChangeText(val)}
              placeholder={'Gift Message'}
            />
            <TCombForm
              ref={this.setGiftInvitation}
              type={giftInvitationFormSchema}
              options={giftInvitationSchemaOptions}
              value={this.state.formValue}
            />

            <PrimaryButton onClick={this.onNextClick}>
              {i18n.t('next')}
            </PrimaryButton>
          </CardLayout>
        </View>
      </KeyboardAwareScrollView>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('component did update called');
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    Object.entries(this.state).forEach(
      ([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
    );
  }
  componentWillUnmount() {
    // console.log('Gift Email Unmounted');
  }
}
