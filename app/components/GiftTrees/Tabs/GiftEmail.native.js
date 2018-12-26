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
    this.setState({ giftMessage: val });
  }

  render() {
    return (
      <KeyboardAwareScrollView>
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
              Select a person for whom you want to donate trees.Trees you then
              donate will appear in recipeint tree-counter as well as your
              own.If Recipeint does not have a tree-counter then s(he) will get
              email notification.
            </Text>
          </View>
        </CardLayout>
        <CardLayout>
          <TCombForm
            ref={this.setGiftInvitation}
            type={giftInvitationFormSchema}
            options={giftInvitationSchemaOptions}
            value={this.props.formValue}
          />
          <TextInput
            multiline={true}
            style={{
              height: 100,
              color: '#686060',
              borderColor: '#c4bfbf',
              borderWidth: 1,
              margin: 10,
              padding: 5
            }}
            onChangeText={val => this.onChangeText(val)}
            placeholder={'Gift Message'}
          />
          <PrimaryButton onClick={this.onNextClick}>Next</PrimaryButton>
        </CardLayout>
      </KeyboardAwareScrollView>
    );
  }
  componentWillUnmount() {
    // console.log('Gift Email Unmounted');
  }
}
