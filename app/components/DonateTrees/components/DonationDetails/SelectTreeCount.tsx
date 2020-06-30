import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../../../styles/donations/donationDetails";

export function SelectTreeCount(props) {
  const [customTreeCount, setCustomTreeCountLocal] = React.useState(
    props.customTreeCount ? props.customTreeCount : false
  );
  const [tempTreeCount, setTempTreeCount] = React.useState(0);
  let treeCountOptions;
  let defaultTreeCountOption;

  const customTreeCountRef = React.useRef(null);

  if (props.treeCountOptions) {
    treeCountOptions = props.treeCountOptions.fixedTreeCountOptions;
    if (!props.treeCount) {
      props.setTreeCount(props.treeCountOptions.fixedDefaultTreeCount);
    }
  } else {
    defaultTreeCountOption = 10;
    treeCountOptions = [10, 20, 50, 150];
    if (!props.treeCount) {
      props.setTreeCount(defaultTreeCountOption);
    }
  }

  if (!customTreeCountRef.isFocused && customTreeCount) {
    props.setTreeCount(tempTreeCount);
  }
  const setCustomTreeCount = value => {
    if (props.hasOwnProperty("customTreeCount")) {
      props.setCustomTreeCount(value);
      setCustomTreeCountLocal(value);
    } else {
      setCustomTreeCountLocal(value);
    }
  };

  return (
    <>
      <View style={styles.treeCountSelector}>
        {treeCountOptions.map(option => (
          <TouchableOpacity
            onPress={() => {
              props.setTreeCount(option);
              setCustomTreeCount(false);
            }}
            style={
              props.treeCount === option
                ? styles.selectedView
                : styles.selectorView
            }
          >
            <Text
              style={
                props.treeCount === option
                  ? styles.selectedTreeCountText
                  : styles.treeCountText
              }
            >
              {option} Trees
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
              onChangeText={treeCount => setTempTreeCount(Number(treeCount))}
              onSubmitEditing={() => props.setTreeCount(tempTreeCount)}
              value={tempTreeCount}
              keyboardType={"number-pad"}
              autoFocus
              ref={customTreeCountRef}
            />
            <Text
              style={
                customTreeCount
                  ? styles.treeCountNumberSelected
                  : styles.treeCountNumber
              }
            >
              Trees
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setCustomTreeCount(true);
              setTempTreeCount(0);
              props.setTreeCount(Number(tempTreeCount));
            }}
            style={styles.customSelectorView}
          >
            <Text style={styles.customTreeCountText}>Custom Trees</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
