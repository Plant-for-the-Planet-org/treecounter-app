import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Modal from "react-native-modalbox";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { getCountryFlagImageUrl } from "../../../actions/apiRouting";
import countryData from "../../../assets/countryCodes.json";
import styles from "../../../styles/donations/donationDetails";

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

export function SelectCountryModal(props) {
  let {
    selectedCountry,
    setSelectedCountry,
    showModal,
    setShowModal,
    taxDeductibleCountries
  } = props;
  const activeColor = "#74ba00";
  const defaultColor = "#4d5153";

  const [search, setSearch] = useState("");
  const [countriesList, setCountriesList] = useState(taxDeductibleCountries);

  const keyExtractor = d => d.item;

  const renderItem = ({ item: countryCode }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.setFormikValue
            ? props.setFormikValue("country", countryCode)
            : setSelectedCountry(countryCode);
          closeModal();
        }}
      >
        <View
          key={countryCode}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 12
          }}
        >
          <Image
            source={{
              uri: getCountryFlagImageUrl(
                getCountryData(countryCode).currencyCountryFlag,
                "png",
                256
              )
            }}
            style={{ width: 24, height: 15 }}
          />
          <Text
            style={{
              paddingLeft: 16,
              lineHeight: 22,
              flex: 1,
              fontFamily: "OpenSans-SemiBold",
              fontSize: 16,
              color:
                selectedCountry === countryCode ? activeColor : defaultColor
            }}
          >
            {getCountryData(countryCode).country}
          </Text>
          {selectedCountry === countryCode && (
            <MaterialIcon
              name="done"
              size={24}
              color="#89b53a"
              style={{
                marginLeft: 5
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setSearch();
    setCountriesList(taxDeductibleCountries);
    setShowModal(false);
  };

  const searchCountry = searchString => {
    setSearch(searchString);
    let arrayToSearchCountry = [];
    for (let i = 0; i < taxDeductibleCountries.length; i++) {
      if (
        taxDeductibleCountries[i].includes(searchString) ||
        getCountryData(taxDeductibleCountries[i]).country.includes(searchString) // Fetch all the country names and filter against the search string
      ) {
        arrayToSearchCountry.push(taxDeductibleCountries[i]);
      }
    }

    setCountriesList(arrayToSearchCountry); // Return array with only country codes after filter is applied to show in the Flatlist
  };

  return (
    <Modal
      isOpen={showModal}
      position={"left"}
      onClosed={closeModal}
      backdropPressToClose
      coverScreen
      keyboardTopOffset={0}
      swipeToClose
    >
      <View
        style={{
          opacity: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: Platform.OS === "ios" ? 54 : 20,
          marginBottom: 20,
          paddingHorizontal: 24
        }}
      >
        <TouchableOpacity>
          <MaterialIcon
            name="search"
            size={24}
            color="#4d5153"
            style={{ marginRight: 6 }}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            fontFamily: "OpenSans-SemiBold",
            fontSize: 18,
            color: defaultColor,
            flexGrow: 1
          }}
          onChangeText={text => searchCountry(text)}
          value={search}
          autoFocus
          placeholder={"Search Country"}
        />
        <TouchableOpacity onPress={() => searchCountry("")}>
          {search ? (
            <MaterialIcon name="close" size={30} color="#4d5153" />
          ) : null}
        </TouchableOpacity>
      </View>
      <FlatList
        data={countriesList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          backgroundColor: "#fff",
          paddingHorizontal: 24,
          paddingBottom: 60,
          zIndex: 2
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 24,
          alignSelf: "center",
          backgroundColor: "white",
          borderWidth: 0.5,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          height: 36,
          width: 36,
          zIndex: 4000
        }}
        onPress={() => closeModal()}
      >
        <MaterialIcon name="close" size={24} color="#4d5153" />
      </TouchableOpacity>
    </Modal>
  );
}

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
