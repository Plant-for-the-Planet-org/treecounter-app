import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';

import { updateStaticRoute } from '../../helpers/routerHelper/routerHelper';

export default (GiftTrees = props => {
  return (
    <View>
      <Button title="Enter Receiver’s details" />

      <Button
        onClick={() => updateStaticRoute('app_contact_list', props.navigation)}
        title="Select from contacts"
      />
    </View>
  );
  // return <GiftTabView openProjects={this.openProjects} {...props} />;
});
