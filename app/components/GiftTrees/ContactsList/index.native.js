import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import { PermissionsAndroid, View, Button } from 'react-native';
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
      <Button title="Enter Receiver’s details" />
      <Button title="Select from contacts" />
    </View>
  );
  // return <GiftTabView openProjects={this.openProjects} {...props} />;
});
