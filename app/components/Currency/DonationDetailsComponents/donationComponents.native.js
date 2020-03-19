import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { debug } from '../../../debug';
import styles from '../../../styles/donation/donationDetails';
import i18n from '../../../locales/i18n';

export function SelectTreeCount(props) {
  const [customTreeCount, setCustomTreeCount] = React.useState(false);
  let treeCountOptions;

  if (props.selectedProject) {
    if (
      props.selectedProject.paymentSetup.treeCountOptions &&
      props.selectedProject.paymentSetup.treeCountOptions.option1
    ) {
      const {
        option1,
        option2,
        option3
      } = props.selectedProject.paymentSetup.treeCountOptions;
      const d = props.selectedProject.paymentSetup.treeCountOptions.default;
      treeCountOptions = [d, option1, option2, option3].filter(a => a);
      d && props.setTreeCount(d);
    } else {
      treeCountOptions = [10, 25, 50, 100];
    }
  }

  return (
    <View style={[styles.treeCountSelector, { marginLeft: 8 }]}>
      {treeCountOptions.map(option => (
        <TouchableOpacity
          onPress={() => {
            debug('selecting option', option);
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
            style={[
              props.treeCount === option
                ? styles.selectedTreeCountText
                : styles.treeCountText
            ]}
          >
            <Text>{option}</Text>
          </Text>
          <Text
            style={[
              props.treeCount === option
                ? styles.selectedTreeCountText
                : styles.treeCountText
            ]}
          >
            <Text>{i18n.t('label.donate_trees_text')}</Text>
          </Text>
        </TouchableOpacity>
      ))}
      {customTreeCount ? (
        <View style={[styles.selectedView, styles.customSelectedView]}>
          <TextInput
            style={
              customTreeCount
                ? styles.treeCountTextInputSelected
                : styles.treeCountTextInput
            }
            onChangeText={treeCount => props.setTreeCount(treeCount)}
            value={props.treeCount.toString()}
            keyboardType={'number-pad'}
            autoFocus
          />
          <Text
            style={
              customTreeCount
                ? styles.selectedTreeCountText
                : styles.treeCountNumber
            }
          >
            {i18n.t('label.donate_trees_text')}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCustomTreeCount(true);
            const a = treeCountOptions[treeCountOptions.length - 1] + 50;
            debug(a);
            props.setTreeCount(a);
          }}
          style={[styles.selectorView, styles.customSelectorView]}
        >
          <Text style={styles.customTreeCountText}>
            {i18n.t('label.custom_tree')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
