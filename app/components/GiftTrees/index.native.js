import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';

import { updateStaticRoute } from '../../helpers/routerHelper/routerHelper';

export default (GiftTrees = props => {
  return (
    <View>
      <Button
        onPress={() =>
          updateStaticRoute('app_reciever_details', props.navigation)
        }
        title="Enter Receiver’s details"
      />
      <Button
        onPress={() => updateStaticRoute('app_contact_list', props.navigation)}
        title="Select from contacts"
      />
    </View>
  );
});
