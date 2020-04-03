import React from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';
import Contacts from 'react-native-contacts';
import styles from './../../../styles/gifttrees/giftrees';
import GetRandomImage from '../../../utils/getRandomImage';
import i18n from '../../../locales/i18n';
import HeaderNew from './../../Header/HeaderNew';
import { updateRoute } from '../../../helpers/routerHelper';
import PrimaryButton from '../../Common/Button/PrimaryButton.native';
import colors from '../../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectContacts = props => {
  const [contacts, setContacts] = React.useState([]);
  const [searchContacts, setSearchContacts] = React.useState([]);
  const [searchText, onChangeSearch] = React.useState('');
  const [isSearch, toggleIsSearch] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');

  const loadContacts = async () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.warn('Permission to access contacts was denied');
      } else {
        let newContacts = [];
        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i].emailAddresses.length > 0) {
            newContacts.push({ ...contacts[i], isSelected: false });
          }
        }
        setContacts(newContacts);
        setSearchContacts(newContacts);
      }
    });
  };

  React.useEffect(() => {
    if (!contacts.length > 0) {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.'
          }
        ).then(() => {
          loadContacts();
        });
      } else {
        loadContacts();
      }
    }
  }, []);

  React.useEffect(() => {
    if (searchText === '') {
      setSearchContacts(contacts);
    }
  }, [searchText]);

  const Item = props => {
    const { item, index } = props;
    return (
      <TouchableOpacity
        onPress={() => {
          let newContactsArr = [...searchContacts];
          newContactsArr[index].isSelected = !newContactsArr[index].isSelected;
          setSearchContacts(newContactsArr);
        }}
        style={{ flexDirection: 'row', marginBottom: 30 }}
      >
        {props.item.hasThumbnail ? (
          <Image
            style={{ height: 50, width: 50, borderRadius: 25 }}
            source={{ uri: props.item.thumbnailPath }}
          />
        ) : (
          <GetRandomImage name={item.displayName} />
        )}
        {item.isSelected ? (
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: colors.PRIMARY_COLOR,
                opacity: 0.7
              }}
            />
            <View style={{ position: 'absolute' }}>
              <Icon size={30} name="check" color="#ffffff" />
            </View>
          </View>
        ) : null}

        <View style={{ marginLeft: 15, justifyContent: 'center' }}>
          <Text style={styles.contactDisplayName}>{item.displayName}</Text>
          <Text>{item.emailAddresses[0].email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const searchContact = text => {
    onChangeSearch(text);
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      //   loadContacts();
      setSearchContacts(contacts);
    } else if (emailAddressRegex.test(text)) {
      setSearchContacts(
        contacts.filter(contact => {
          let emailMatched = false;
          for (let i = 0; i < contact.emailAddresses.length; i++) {
            if (
              contact.emailAddresses[i].email
                .toLowerCase()
                .includes(text.toLowerCase())
            ) {
              emailMatched = true;
            }
          }
          if (emailMatched) {
            return contact;
          }
        })
      );
    } else {
      setSearchContacts(
        contacts.filter(contact => {
          if (contact.displayName.toLowerCase().includes(text.toLowerCase())) {
            console.log(contact.displayName);
            return contact;
          }
        })
      );
    }
  };

  const onNextClick = () => {
    let giftContacts = [];
    for (let i = 0; i < searchContacts.length; i++) {
      if (searchContacts[i].isSelected) {
        giftContacts.push({
          firstName: searchContacts[i].displayName,
          lastName: '',
          email: searchContacts[i].emailAddresses[0].email
        });
      }
    }

    if (giftContacts.length === 0) {
      setErrMsg('Please select a contact');
    } else {
      setErrMsg('');
      updateRoute('app_gift_projects', props.navigation, {
        context: {
          contextType: 'gift-contact',
          giftDetails: {
            giftContacts,
            giftMessage: ''
          }
        }
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderNew
        title={''}
        navigation={props.navigation}
        onChangeSearch={onChangeSearch}
        searchText={searchText}
        searchPlaceholder={'Search Contact'}
        isSearch={isSearch}
        toggleIsSearch={toggleIsSearch}
        searchContact={searchContact}
      />
      <ScrollView
        style={{
          paddingHorizontal: 20,

          marginTop: Platform.OS === 'ios' ? 110 : 70
        }}
      >
        {!isSearch ? (
          <>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                fontSize: 27,
                lineHeight: 40,
                letterSpacing: 0,
                textAlign: 'left',
                color: '#4d5153'
              }}
            >
              {i18n.t('label.gift_trees')}
            </Text>

            <Text style={styles.nGiftDesc}>
              {i18n.t('label.gift_tree_description_new')}
            </Text>
          </>
        ) : null}

        <Text style={styles.selectContactTitle}>Select Contact</Text>

        <FlatList
          data={searchContacts}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} navigation={props.navigation} />
          )}
        />
      </ScrollView>
      <PrimaryButton buttonStyle={{ marginVertical: 10 }} onClick={onNextClick}>
        Next
      </PrimaryButton>
    </View>
  );
};
export default SelectContacts;
