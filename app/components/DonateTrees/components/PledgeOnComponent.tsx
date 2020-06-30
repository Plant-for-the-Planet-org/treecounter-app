import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import styles from "../../../styles/donations/donationDetails";
import { getImageUrl } from "../../../actions/apiRouting";
import { formatDate } from "../../../utils/utils";
const width = Dimensions.get("window").width;

export function PledgeOnComponent(props: {
  pledgeDetails: { image: any; eventName: React.ReactNode; eventDate: any };
}) {
  return (
    <>
      <Text style={styles.titlePledge}>Pledged To</Text>
      <View style={styles.pledgeDetails}>
        <Image
          style={styles.pledgeImage}
          source={{
            uri: getImageUrl("event", "thumb", props.pledgeDetails.image)
          }}
        />
        <View style={styles.pledgeNameAmount}>
          <Text style={styles.pledgeName}>{props.pledgeDetails.eventName}</Text>
          <View style={styles.pledgeAmountView}>
            <Text style={styles.pledgeAmountText}>
              On {formatDate(props.pledgeDetails.eventDate)}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

export function PledgeTreeCount(props: {
  treeCountPledged: any;
  treeCount: any;
  setTreeCount: (arg0: number) => void;
}) {
  const [customTreeCount, setCustomTreeCount] = React.useState(false);
  const [tempTreeCount, setTempTreeCount] = React.useState(0);
  let defaultTreeCountOption = props.treeCountPledged;

  const [erorrMessage, setErrorMessage] = React.useState(false);
  const customTreeCountRef = React.useRef(null);

  if (!props.treeCount) {
    props.setTreeCount(defaultTreeCountOption);
  }
  if (
    customTreeCountRef.current &&
    !customTreeCountRef.current.isFocused &&
    customTreeCount
  ) {
    props.setTreeCount(tempTreeCount);
  }

  if (erorrMessage) {
    setTimeout(() => setErrorMessage(false), 3000);
  }

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            props.setTreeCount(defaultTreeCountOption);
            setCustomTreeCount(false);
          }}
          style={
            props.treeCount === defaultTreeCountOption
              ? styles.selectedView
              : styles.selectorView
          }
        >
          <Text
            style={
              props.treeCount === defaultTreeCountOption
                ? styles.selectedTreeCountText
                : styles.treeCountText
            }
          >
            {defaultTreeCountOption} Trees
          </Text>
        </TouchableOpacity>

        {customTreeCount ? (
          <View style={[styles.customSelectedView, { width: width * 0.6 }]}>
            <TextInput
              style={
                customTreeCount
                  ? styles.treeCountTextInputSelected
                  : styles.treeCountTextInput
              }
              onChangeText={treeCount => setTempTreeCount(Number(treeCount))}
              onSubmitEditing={() =>
                tempTreeCount < defaultTreeCountOption
                  ? (setErrorMessage(true),
                    props.setTreeCount(defaultTreeCountOption),
                    setCustomTreeCount(false))
                  : props.setTreeCount(tempTreeCount)
              }
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
              props.setTreeCount(tempTreeCount);
            }}
            style={[styles.customSelectorView, { width: width * 0.6 }]}
          >
            <Text style={styles.customTreeCountText}>Custom Trees</Text>
          </TouchableOpacity>
        )}
      </View>
      {erorrMessage ? (
        <Text style={styles.pledgeTreeCountError}>
          Tree count should be higher than the pledged tree count
        </Text>
      ) : null}
    </>
  );
}
