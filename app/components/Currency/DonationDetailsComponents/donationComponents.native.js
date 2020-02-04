import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../../../styles/donation/donationDetails';
import i18n from '../../../locales/i18n';

export function SelectTreeCount(props) {
  const [customTreeCount, setCustomTreeCount] = React.useState(false);
  let treeCountOptions;

  if (props.selectedProject) {
    if (
      props.selectedProject.paymentSetup.treeCountOptions &&
      props.selectedProject.paymentSetup.treeCountOptions.fixedTreeCountOptions
    ) {
      treeCountOptions =
        props.selectedProject.paymentSetup.treeCountOptions
          .fixedTreeCountOptions;
    } else {
      treeCountOptions = [10, 20, 50, 150];
    }
  }

  return (
    <View style={styles.treeCountSelector}>
      {treeCountOptions.map(option => (
        <TouchableOpacity
          onPress={() => {
            console.log('selecting option', option);
            props.setTreeCount(option);
            setCustomTreeCount(false);
          }}
          style={
            props.treeCount === option
              ? styles.selectedView
              : styles.selectorView
          }
          key={option}
        >
          <Text
            style={
              props.treeCount === option
                ? styles.selectedTreeCountText
                : styles.treeCountText
            }
          >
            {option} {i18n.t('label.donate_trees')}
          </Text>
        </TouchableOpacity>
      ))}
      {customTreeCount ? (
        <View style={styles.customSelectedView}>
          <TextInput
            style={
              customTreeCount
                ? styles.treeCountTextInputSelected
                : styles.treeCountTextInput
            }
            onChangeText={treeCount => props.setTreeCount(treeCount)}
            value={props.treeCount}
            keyboardType={'number-pad'}
            autoFocus
          />
          <Text
            style={
              customTreeCount
                ? styles.treeCountNumberSelected
                : styles.treeCountNumber
            }
          >
            {i18n.t('label.donate_trees')}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCustomTreeCount(true);
            props.setTreeCount('');
          }}
          style={styles.customSelectorView}
        >
          <Text style={styles.customTreeCountText}>
            {i18n.t('label.custom_tree')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
