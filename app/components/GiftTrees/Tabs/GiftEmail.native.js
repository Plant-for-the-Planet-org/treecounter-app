/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  giftInvitationFormSchema,
  giftInvitationSchemaOptions
} from '../../../server/parsedSchemas/giftTrees';
import t from 'tcomb-form-native';
import { View, Image, Text, Keyboard, TouchableOpacity } from 'react-native';
import { iosInformation } from '../../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../../locales/i18n';
import styles from '../../../styles/gifttrees/giftrees';
import buttonStyles from '../../../styles/common/button.native';
import { forward } from './../../../assets';

let TCombForm = t.form.Form;

export default class GiftEmail extends Component {
  constructor(props) {
    super(props);
    this.setGiftInvitation = element => {
      this.giftInvitation = element;
    };
    this.state = { form: null, giftMessage: '', buttonType: 'next' };
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      buttonType: '>'
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      buttonType: 'next'
    });
  };

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
    return (
      <View style={styles.view_container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.formScrollView}
          enableOnAndroid
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 40, height: 40, alignSelf: 'center' }}>
              <Image style={styles.gtDescImage} source={iosInformation} />
            </View>
            <Text style={styles.gtDescription}>
              {i18n.t('label.gift_trees_description')}
            </Text>
          </View>

          <TCombForm
            ref={this.setGiftInvitation}
            type={giftInvitationFormSchema}
            options={giftInvitationSchemaOptions}
            value={this.state.form}
          />
        </KeyboardAwareScrollView>
        {this.state.buttonType === 'next' ? (
          <TouchableOpacity
            style={[
              buttonStyles.actionButtonTouchable,
              { top: undefined, bottom: '14%' }
            ]}
            onPress={this.onNextClick}
          >
            <View style={buttonStyles.actionButtonView}>
              <Text style={buttonStyles.actionButtonText}>
                {i18n.t('label.next')}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {this.state.buttonType === '>' ? (
          <TouchableOpacity
            style={[
              buttonStyles.actionButtonSmallTouchable,
              { top: undefined, bottom: '20%' }
            ]}
            onPress={this.onNextClick}
          >
            <Image
              source={forward}
              resizeMode="cover"
              style={buttonStyles.actionButtonSmallImage}
            />
          </TouchableOpacity>
        ) : null}
      </View>
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
