import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function PaymentLoader() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
      }}
    >
      <ActivityIndicator
        style={{ alignSelf: "center" }}
        size={"large"}
        color="#89b53a"
      />
      <Text
        style={{ fontFamily: "OpenSans-SemiBold", marginTop: 24, fontSize: 16 }}
      >
        Processing Payment
      </Text>
      <Text
        style={{ fontFamily: "OpenSans-SemiBold", marginTop: 8, fontSize: 16 }}
      >
        Please wait
      </Text>
    </View>
  );
}
