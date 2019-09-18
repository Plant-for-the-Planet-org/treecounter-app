import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../styles/edit_profile.native';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';

class ConfirmDeletionModal extends Component {
  render() {
    const colorLeteralWhite = 'white';
    const deleteContribution = this.props.navigation.getParam(
      'deleteContribution'
    );
    return (
      <View style={styles.confirmDeleteContainer}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            backgroundColor: colorLeteralWhite
          }}
        >
          <View style={styles.container}>
            <Text style={styles.textHeader}>
              {i18n.t('label.my_trees_delete_confirm')}
            </Text>
            <Text style={styles.textPara}>
              {i18n.t('label.deletion_warning_summary_contribution')}
            </Text>
            <Text style={[styles.textPara, { marginTop: 15 }]}>
              {i18n.t('label.delete_my_trees_action')}
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
              deleteContribution();
              this.props.navigation.goBack(null);
            }}
          >
            {i18n.t('label.delete')}
          </PrimaryButton>
        </View>
      </View>
    );
  }
}

export default withNavigation(ConfirmDeletionModal);
ConfirmDeletionModal.propTypes = {
  navigation: PropTypes.any
};
