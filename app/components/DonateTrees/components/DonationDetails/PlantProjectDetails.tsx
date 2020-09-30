import React from "react";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "../../../../styles/donations/donationDetails";
import Icon from "react-native-vector-icons/FontAwesome5";
import CurrencySelectorList from "../../../Common/CurrencySelectorList.native";
import NumberFormat from "../../../Common/NumberFormat.native.js";
import { getImageUrl } from "../../../../actions/apiRouting";
export function PlantProjectDetails(props) {
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    props.selectedCurrency
  );
  const [force, setForce] = useState(false);
  const caclculateTreeCost = () => {
    return props.rates[selectedCurrency] * props.treeCost;
  };
  const [treeCost, setTreeCost] = useState(caclculateTreeCost());

  const handleCurrencyChange = currency => {
    showCurrencyModal && currency != selectedCurrency
      ? setForce(true)
      : setForce(false);

    setSelectedCurrency(currency);

    setShowCurrencyModal(false);
    setTreeCost(calculateAmount(currency));
    props.setCurrency(currency);
  };
  useEffect(() => {
    setSelectedCurrency(props.globalCurrency.currency);
    props.setCurrency(props.globalCurrency.currency);
  }, [props.globalCurrency]);
  // This function takes the tree Count and calculates the total amount
  const calculateAmount = currency => {
    return (
      Math.round(props.treeCost * parseFloat(props.rates[currency]) * 100) /
        100 +
      props.fee
    );
  };
  return (
    <View style={styles.projectDetails}>
      <Image
        style={styles.projectImage}
        source={{
          uri: getImageUrl("project", "thumb", props.selectedProject.image)
        }}
      />
      <View style={styles.projectNameAmount}>
        <Text style={styles.projectName}>{props.selectedProject.name}</Text>
        <View style={styles.projectAmountView}>
          <TouchableOpacity
            onPress={() => setShowCurrencyModal(true)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.isTaxDeductibleCountry}>
              {selectedCurrency}
            </Text>
            <Icon name={"chevron-down"} size={14} color="#89b53a" />
          </TouchableOpacity>

          {/* <Image style={styles.projectAmountImage} source={currencyIcon} /> */}
          <Text style={styles.projectAmountText}>
            <NumberFormat
              currency={selectedCurrency}
              data={treeCost.toFixed(2)}
              handleCurrencyChange={handleCurrencyChange}
              force={force}
            />{" "}
            per tree
          </Text>
        </View>
      </View>
      <CurrencySelectorList
        hideCurrencyModal={() => setShowCurrencyModal(false)}
        show={showCurrencyModal}
        handleCurrencyChange={handleCurrencyChange}
        selectedCurrency={selectedCurrency}
      />
    </View>
  );
}
