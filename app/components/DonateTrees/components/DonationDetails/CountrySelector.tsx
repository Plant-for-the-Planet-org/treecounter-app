import React, { useState } from "react";
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
import { getCountryFlagImageUrl } from "../../../../actions/apiRouting";
import countryData from "../../../../assets/countryCodes.json";
import styles from "../../../../styles/donations/donationDetails";

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
