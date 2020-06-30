import React from "react";
import { Text, View, Switch } from "react-native";
import styles from "../../../../styles/donations/donationDetails";
import { formatNumber } from "../../../../utils/utils";

export function CoverFee(props) {
  return (
    <View style={styles.coverCommissionView}>
      <Text style={styles.coverCommissionText}>
        Help {props.selectedProject.tpoSlug} cover the credit card fee of{" "}
        {formatNumber(
          (props.treeCount / 100) * 2.9 + 0.3,
          null,
          props.selectedCurrency
        )}{" "}
      </Text>
      <Switch
        style={styles.coverCommissionSwitch}
        onValueChange={props.toggleSetCommission}
        trackColor={{ false: "#f2f2f7", true: "#88b439" }}
        value={props.commissionSwitch}
      />
    </View>
  );
}

{
  /* Commission Covering Usage */
}

{
  //   <CoverFee
  //     selectedProject={props.selectedProject.tpoSlug}
  //     treeCount={context.treeCount}
  //     selectedCurrency={props.selectedCurrency}
  //     toggleSetCommission={toggleSetCommission}
  //     commissionSwitch={context.commissionSwitch}
  //   />;
}
