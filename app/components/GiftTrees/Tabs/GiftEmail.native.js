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
    this.state = { form: null, giftMessage: '' };
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentWillMount() {}

  onNextClick() {
    if (this.giftInvitation.getValue()) {
      let value = this.giftInvitation.getValue();
      this.setState(
        {
          form: value
        },
        () => {
          this.props.openProjects(this.state.form, 'invitation');
        }
      );
    } else {
      this.giftInvitation.validate();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
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
    const textColor = '#c4bfbf';
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 72 }}
        enableOnAndroid
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
                color: textColor,
                marginRight: 10,
                width: '90%'
              }}
            >
              {i18n.t('label.gift_trees_description')}
            </Text>
          </View>
        </CardLayout>

        <CardLayout>
          <TCombForm
            ref={this.setGiftInvitation}
            type={giftInvitationFormSchema}
            options={giftInvitationSchemaOptions}
            value={this.state.form}
          />
          <PrimaryButton onClick={this.onNextClick}>
            {i18n.t('label.next')}
          </PrimaryButton>
        </CardLayout>
      </KeyboardAwareScrollView>
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
