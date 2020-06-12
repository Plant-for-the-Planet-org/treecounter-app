import React from "react";
import {
  Animated,
  TouchableOpacity,
  Image,
  BackHandler,
  View
} from "react-native";
import { backArrow, closeIcon } from "../../assets";

let HEADER_MAX_HEIGHT = 80;
let HEADER_MIN_HEIGHT = 80;

// let HEADER_TEXT_MAX_HEIGHT = 80;
let HEADER_TEXT_MIN_HEIGHT = 40;

export default function HeaderAnimated(props) {
  const headerHeight = props.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp"
  });
  const headerZindex = props.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
    outputRange: [1000, 1000, 10000],
    extrapolate: "clamp"
  });

  const headerTitleZIndex = props.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT,
      100
    ],
    outputRange: [100, 100, 100, 1001],
    extrapolate: "clamp"
  });

  const headerTitleBottom = props.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT + 26
    ],
    outputRange: [-116, -110, -64],
    extrapolate: "clamp"
  });

  const headerTitleLeft = props.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT + 26
    ],
    outputRange: [24, 24, 24, 72],
    extrapolate: "clamp"
  });

  const headerFontSize = props.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT + 26
    ],
    outputRange: [27, 27, 27, 18],
    extrapolate: "clamp"
  });

  let navigateBack = () => {
    console.log("Back Button Hit");
    if (props.onBack) {
      props.onBack();
    }
    props.navigation.goBack();
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", navigateBack);
    // clean up
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", navigateBack);
    };
  });

  const textColor = "#4d5153";
  const whiteColor = "white";
  return (
    <View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: whiteColor,
          height: headerHeight,
          zIndex: headerZindex,
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          width: "100%"
        }}
      >
        <TouchableOpacity
          style={{ height: 18, zIndex: 1001, left: 24 }}
          onPress={navigateBack}
        >
          <Image
            source={props.showClose ? closeIcon : backArrow}
            resizeMode="contain"
            style={{ height: 18, width: 24 }}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: headerTitleBottom,
          left: headerTitleLeft,
          zIndex: headerTitleZIndex
        }}
      >
        <Animated.Text
          style={{
            fontFamily: "OpenSans-ExtraBold",
            fontSize: headerFontSize,
            lineHeight: 40,
            letterSpacing: 0,
            textAlign: "left",
            color: textColor
          }}
        >
          {props.title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}
