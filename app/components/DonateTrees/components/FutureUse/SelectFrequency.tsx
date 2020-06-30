import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../../../styles/donations/donationDetails";

export function SelectFrequency(props) {
  let frequencyOptions = [
    { label: "Once", value: "once" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" }
  ];
  return (
    <>
      <Text
        style={{
          fontFamily: "OpenSans-SemiBold",
          fontSize: 12,
          lineHeight: 17,
          letterSpacing: 0,
          textAlign: "left",
          color: "#4d5153",
          marginTop: 30
        }}
      >
        FREQUENCY
      </Text>
      <View style={styles.repititionSelector}>
        {frequencyOptions.map(option => (
          <TouchableOpacity
            onPress={() => props.setFrequency(option.value)}
            style={
              props.frequency === option.value
                ? styles.repititionSelectedView
                : styles.repititionSelectorView
            }
          >
            <Text
              style={
                props.frequency === option.value
                  ? styles.selectedRepititionText
                  : styles.repititionText
              }
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
