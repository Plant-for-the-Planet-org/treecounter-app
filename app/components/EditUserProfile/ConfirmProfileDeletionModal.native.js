import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../styles/edit_profile.native';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';

const colorLiteralWhite = 'white';
class ConfirmProfileDeletionModal extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  render() {
    const deleteProfile = this.props.navigation.getParam('deleteProfile');
    return (
      <View style={styles.confirmDeleteContainer}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            backgroundColor: colorLiteralWhite
          }}
        >
          <View style={styles.container}>
            <Text style={styles.textHeader}>{i18n.t('label.sure')}</Text>
            <Text style={styles.textPara}>
              {i18n.t('label.deletion_warning_heading')}
            </Text>
            <Text style={styles.textPara}>
              {i18n.t('label.deletion_warning_summery')}
            </Text>
            <Text style={styles.textPara}>
              {i18n.t('label.deletion_warning_summery_1')}
            </Text>
            <TextInput
              ref={el => {
                this.username = el;
              }}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              style={styles.textInputfield}
              placeholder={'DELETE'}
              placeholderTextColor={'#686060'}
              underlineColorAndroid={'transparent'}
              maxLength={6}
              multiline={false}
              returnKeyType={'next'}
              allowFontScaling
              autoCapitalize={'sentences'}
            />
            <Text style={[styles.textPara, { marginTop: 15 }]}>
              {i18n.t('label.deletion_prerequisite')}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.bottomRow}>
          <PrimaryButton
            buttonStyle={styles.buttonStyle}
            onClick={() => {
              this.props.navigation.goBack(null);
            }}
          >
            {i18n.t('label.cancel')}
          </PrimaryButton>
          <PrimaryButton
            buttonStyle={styles.buttonStyle}
            onClick={() => {
              if (this.state.username === 'DELETE') {
                deleteProfile();
                this.props.navigation.goBack(null);
              }
            }}
          >
            {i18n.t('label.delete')}
          </PrimaryButton>
        </View>
      </View>
    );
  }
}

export default withNavigation(ConfirmProfileDeletionModal);
ConfirmProfileDeletionModal.propTypes = {
  onSave: PropTypes.any
};
