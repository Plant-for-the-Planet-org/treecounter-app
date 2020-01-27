import React, { useEffect, useState } from 'react';

import { PermissionsAndroid, View, Button, Text } from 'react-native';
import Contacts from 'react-native-contacts';

export default (ContactsList = props => {
  const [contacts, setContacts] = useState([]);
  openProjects = (formValue, type) => {
    // console.log('Open Project called up ', formValue);
    props.openProjects(formValue, type);
  };

  getList = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.log('cannot access');
      } else {
        setContacts(contacts);
        console.log(contacts);
      }
    });
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: ' This app would like to see your contacts'
      }).then(() => {
        getList();
      });
    } else if (Platform.OS === 'ios') {
      getList();
    }
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(contacts)}</Text>
    </View>
  );
});
