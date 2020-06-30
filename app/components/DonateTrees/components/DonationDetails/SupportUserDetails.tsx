import React from "react";
import { Text, View } from "react-native";
import styles from "../../../../styles/donations/donationDetails";
import UserProfileImage from "../../../Common/UserProfileImage";

export const SupportUserDetails = props => {
  return (
    <View>
      <View style={[{ marginTop: 20, marginBottom: 0 }]}>
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <View style={styles.supportUser}>
          <UserProfileImage
            profileImage={
              props.context.supportTreeCounterDetails &&
              props.context.supportTreeCounterDetails.treecounterAvatar
            }
            imageStyle={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
          <View style={styles.supportUserNameContainer}>
            <Text style={styles.supportUserName}>
              {props.context.supportTreeCounterDetails.displayName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
