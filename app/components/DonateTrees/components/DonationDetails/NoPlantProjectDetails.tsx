import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../../../styles/donations/donationDetails";
import Icon from "react-native-vector-icons/FontAwesome5";

export function NoPlantProjectDetails(props) {
  return (
    <TouchableOpacity style={styles.noprojectDetails}>
      <View style={styles.noprojectImage} />
      <View style={styles.noprojectNameAmount}>
        <Text style={styles.noprojectName}>Select Project</Text>
        <Text style={styles.noprojectAmountText}>
          Tap here to view all projects
        </Text>
      </View>
      <View style={[{ alignSelf: "auto", marginRight: 16 }]}>
        <Icon name={"chevron-right"} size={14} color="#4d5153" />
      </View>
    </TouchableOpacity>
  );
}
