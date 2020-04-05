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
  // const [errMsg, setErrMsg] = React.useState('');
  const [selectedContactsNum, setSelectedContactsNum] = React.useState(0);

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

  const Avatar = ({ item, dimension, style }) => {
    return (
      <View style={style}>
        {item.hasThumbnail ? (
          <Image
            style={{ height: dimension, width: dimension, borderRadius: 25 }}
            source={{ uri: item.thumbnailPath }}
          />
        ) : (
          <GetRandomImage name={item.displayName} dimension={dimension} />
        )}
      </View>
    );
  };

  const Item = props => {
    const { item, disabled } = props;
    return (
      <>
        <Avatar item={item} dimension={50} />
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

        {disabled ? (
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: '#c2c2c2',
              opacity: 0.7
            }}
          />
        ) : null}
        <View style={{ marginLeft: 15, justifyContent: 'center' }}>
          <Text
            style={[
              styles.contactDisplayName,
              disabled ? { color: '#c2c2c2' } : null
            ]}
          >
            {item.displayName}
          </Text>
          <Text style={[disabled ? { color: '#c2c2c2' } : null]}>
            {item.emailAddresses[0].email}
          </Text>
        </View>
      </>
    );
  };

  const TouchItem = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let newContactsArr = [...searchContacts];
          newContactsArr[index].isSelected = !newContactsArr[index].isSelected;
          if (newContactsArr[index].isSelected) {
            setSelectedContactsNum(prevCount => prevCount + 1);
          } else {
            setSelectedContactsNum(prevCount => prevCount - 1);
          }
          setSearchContacts(newContactsArr);
        }}
        style={{ flexDirection: 'row', marginBottom: 30 }}
      >
        <Item item={item} />
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

  const onContinueClick = () => {
    let giftContacts = [];
    for (let i = 0; i < searchContacts.length; i++) {
      if (searchContacts[i].isSelected) {
        giftContacts.push({
          firstName: searchContacts[i].displayName,
          lastName: '',
          email: searchContacts[i].emailAddresses[0].email,
          hasThumbnail: searchContacts[i].hasThumbnail,
          thumbnailPath: searchContacts[i].thumbnailPath
        });
      }
    }

    updateRoute('app_gift_projects', props.navigation, 0, {
      context: {
        contextType: 'gift-contact',
        giftDetails: giftContacts
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderNew
        title={''}
        navigation={props.navigation}
        onChangeSearch={onChangeSearch}
        searchText={searchText}
        searchPlaceholder={i18n.t('label.search_contact')}
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
        {!isSearch && selectedContactsNum === 0 ? (
          <>
            <Text style={styles.headerText}>{i18n.t('label.gift_trees')}</Text>

            <Text style={styles.nGiftDesc}>
              {i18n.t('label.gift_tree_description_new')}
            </Text>
          </>
        ) : null}

        <Text
          style={[
            styles.selectContactTitle,
            !isSearch && selectedContactsNum === 0 ? { marginTop: 40 } : null
          ]}
        >
          {i18n.t('label.select_contact')}
        </Text>

        <FlatList
          data={searchContacts}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) =>
            selectedContactsNum >= 4 ? (
              item.isSelected ? (
                <TouchItem item={item} index={index} />
              ) : (
                <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                  <Item item={item} disabled />
                </View>
              )
            ) : (
              <TouchItem item={item} index={index} />
            )
          }
        />
      </ScrollView>
      {selectedContactsNum > 0 ? (
        <View style={{ borderTopColor: '#eeeeee', borderTopWidth: 0.5 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
              marginBottom: 8,
              marginTop: 13
            }}
          >
            <FlatList
              data={searchContacts}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) =>
                item.isSelected && (
                  <Avatar
                    item={item}
                    dimension={44}
                    style={{ marginRight: 10 }}
                  />
                )
              }
            />
            <Text style={styles.selectedNumText}>
              {selectedContactsNum} of 4 selected
            </Text>
          </View>
          <PrimaryButton
            buttonStyle={{ marginVertical: 10 }}
            onClick={onContinueClick}
          >
            {i18n.t('label.continue_to_select_project')}
          </PrimaryButton>
        </View>
      ) : null}
    </View>
  );
};
export default SelectContacts;
