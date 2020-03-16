import React from 'react'
import { View, Text, Image, ScrollView, Platform, TouchableOpacity } from 'react-native'
import styles from './../../styles/gifttrees/giftrees'
import HeaderStatic from './../Header/HeaderStatic';
import i18n from '../../locales/i18n';
import { SafeAreaView } from 'react-navigation';
import { giftplant } from '../../assets';
import { updateStaticRoute } from './../../helpers/routerHelper';

const NewGiftTrees = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderStatic
                title={i18n.t('label.gift_trees')}
                navigation={props.navigation}
            />
            <View style={styles.nMainContainer}>
                <Text style={styles.nGiftDesc}>{i18n.t('label.gift_tree_description_new')}</Text>
                <Image source={giftplant} style={styles.giftImage} />
                <View style={{ position: 'absolute', bottom: '12%', width: '100%', alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={() =>
                            updateStaticRoute('gift_user_email', props.navigation)
                        }
                        style={{ alignSelf: 'center', paddingHorizontal: 20, width: '100%' }}>
                        <View style={styles.actionButtonView2}>
                            <Text style={styles.actionButtonText2}>
                                Enter Receiver’s details
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            updateStaticRoute('select_contacts_gift', props.navigation)
                        }
                        style={{ alignSelf: 'center', paddingHorizontal: 20, width: '100%', marginTop: 16 }}>
                        <View style={styles.actionButtonView}>
                            <Text style={styles.actionButtonText}>
                                Select from contacts
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default NewGiftTrees
