import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import countryData from "../../../../assets/countryCodes.json";
import styles from "../../../../styles/donations/donationDetails";

export function TaxReceipt(props) {
  let {
    taxReceiptSwitch,
    toggleTaxReceipt,
    selectedTaxCountry,
    setShowTaxCountryModal,
    oneTaxCountry
  } = props;
  const SelectedCountryText = () => {
    return (
      <Text
        style={[
          styles.isTaxDeductibleCountry,
          taxReceiptSwitch ? null : { color: "rgba(0, 0, 0, 0.3)" }
        ]}
      >
        {getCountryData(selectedTaxCountry).country}
      </Text>
    );
  };
  return (
    <View style={styles.isTaxDeductibleView}>
      <View>
        <Text style={styles.isTaxDeductibleText}>
          Send me a tax deduction receipt for
        </Text>
        {oneTaxCountry ? (
          <TouchableOpacity
            onPress={() => {
              setShowTaxCountryModal(
                prevTaxCountryModal => !prevTaxCountryModal
              ),
                toggleTaxReceipt(true);
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <SelectedCountryText />
            <Icon
              name={"chevron-down"}
              size={14}
              color={taxReceiptSwitch ? "#89b53a" : "rgba(0, 0, 0, 0.2)"}
            />
          </TouchableOpacity>
        ) : (
          <SelectedCountryText />
        )}
      </View>

      <Switch
        style={styles.isTaxDeductibleSwitch}
        onValueChange={toggleTaxReceipt}
        value={taxReceiptSwitch}
        thumbColor={taxReceiptSwitch ? "#89b53a" : "#bdc3c7"}
        trackColor={{
          false: "#f2f2f7",
          true: "rgba(137, 181, 58, 0.6)"
        }}
      />
    </View>
  );
}

export function getCountryData(countryCode) {
  return countryData.find(c => c.countryCode == countryCode) || {};
}
