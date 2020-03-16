import React from 'react'
import { View, Text, PermissionsAndroid, FlatList, ScrollView, TouchableOpacity, Platform, Image } from 'react-native'
import Contacts from 'react-native-contacts';
import styles from './../../../styles/gifttrees/giftrees'
import GetRandomImage from '../../../utils/getRandomImage';
import i18n from '../../../locales/i18n';
import HeaderNew from './../../Header/HeaderNew';


const SelectContacts = (props) => {
    const [contacts, setContacts] = React.useState([]);
    const [searchText, onChangeSearch] = React.useState('');
    const [isSearch, toggleIsSearch] = React.useState(false);


    const loadContacts = async () => {
        Contacts.getAll((err, contacts) => {
            if (err === "denied") {
                console.warn("Permission to access contacts was denied");
            } else {
                console.log('Contacts non filtered', contacts)
                const newContacts = contacts.filter(function (contact) {
                    return contact.emailAddresses.length > 0
                });
                setContacts(newContacts)
            }
        });
        // Contacts.getCount(count => {
        //     this.setState({ searchPlaceholder: `Search ${count} contacts` });
        // });
    }

    if (!contacts.length > 0) {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: "Contacts",
                message: "This app would like to view your contacts."
            }).then(() => {
                loadContacts();
            });
        } else {
            loadContacts();
        }
    }

    console.log('Contacts filetered', contacts);

    const Item = (props) => {
        const item = props.item;
        return (
            <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 30 }}>
                {props.item.hasThumbnail ? <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: props.item.thumbnailPath }} /> : <GetRandomImage name={item.displayName} />}

                <View style={{ marginLeft: 15, justifyContent: 'center' }}>
                    <Text style={styles.contactDisplayName}>{item.displayName}</Text>
                    <Text>{item.emailAddresses[0].email}</Text>
                </View>

            </TouchableOpacity>

        )
    }
    const searchContact = (text) => {
        onChangeSearch(text)
        console.log(text)
        const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (text === "" || text === null) {
            loadContacts();
        } else if (emailAddressRegex.test(text)) {
            Contacts.getContactsByEmailAddress(text, (err, contacts) => {
                const newContacts = contacts.filter(function (contact) {
                    return contact.emailAddresses.length > 0
                });
                setContacts(newContacts)
            });
        } else {
            Contacts.getContactsMatchingString(text, (err, contacts) => {
                const newContacts = contacts.filter(function (contact) {
                    return contact.emailAddresses.length > 0
                });
                setContacts(newContacts)
            });
        }
    }
    return (
        <View style={{ flex: 1 }}>
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
            <ScrollView style={{ paddingHorizontal: 20, backgroundColor: 'white', marginTop: Platform.OS === 'ios' ? 110 : 70 }}>

                {!isSearch ? (
                    <>
                        <Text style={{
                            fontFamily: "OpenSans-Bold",
                            fontSize: 27,
                            lineHeight: 40,
                            letterSpacing: 0,
                            textAlign: "left",
                            color: '#4d5153'
                        }}>{i18n.t('label.gift_trees')}</Text>

                        <Text style={styles.nGiftDesc}>{i18n.t('label.gift_tree_description_new')}</Text>
                    </>
                ) : null}

                <Text style={styles.selectContactTitle}>Select Contact</Text>

                <FlatList
                    data={contacts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Item item={item} />}
                />

            </ScrollView>
        </View>
    )
}
export default SelectContacts
