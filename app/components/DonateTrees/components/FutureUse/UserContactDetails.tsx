import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../../../styles/donations/donationDetails";

export const UserContactDetails = props => {
  let { donorDetails } = props;
  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
        <TouchableOpacity>
          {donorDetails.firstName ? (
            <Text style={styles.sectionRightButton}>Edit</Text>
          ) : (
            <Text style={styles.sectionRightButton}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
      {donorDetails.firstName ? (
        <View>
          <Text style={styles.contactDetailsAddress}>
            {donorDetails.firstName} {donorDetails.lastName}
          </Text>
          {donorDetails.companyName ? (
            <Text style={styles.contactDetailsAddress}>
              {donorDetails.companyName}
            </Text>
          ) : null}
          <Text style={styles.contactDetailsAddress}>{donorDetails.email}</Text>
          <Text style={styles.contactDetailsAddress}>
            {donorDetails.country}
          </Text>
        </View>
      ) : null}
    </>
  );
};
