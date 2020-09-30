import React, { useState } from 'react';
import {
  Text,
  View,
  Platform,
  ScrollView,
  FlatList,
  Image
} from 'react-native';
import GetRandomImage from '../../../utils/getRandomImage';
import HeaderNew from './../../Header/HeaderNew';
import { TextField } from 'react-native-material-textfield';
import i18n from '../../../locales/i18n';
import PrimaryButton from '../../Common/Button/PrimaryButton.native';
import { updateRoute } from '../../../helpers/routerHelper';
import styles from './../../../styles/gifttrees/giftrees';

const GiftMessage = props => {
  const [giftMsg, setGiftMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const space = () => {
    return <View style={styles.spaceView} />;
  };

  const onNextClick = () => {
    let giftContacts = props.navigation.state.params.giftContacts;
    for (let i = 0; i < giftContacts.length; i++) {
      delete giftContacts.hasThumbnail;
      delete giftContacts.thumbnailPath;
    }

    if (giftMsg === '') {
      setErrMsg('Please select a contact');
    } else {
      setErrMsg('');
      updateRoute('app_gift_projects', props.navigation, 0, {
        context: {
          contextType: 'gift-contact',
          giftDetails: {
            giftContacts,
            giftMessage: giftMsg
          }
        }
      });
    }
  };
  return (
    <View style={styles.view_container}>
      <HeaderNew title={''} navigation={props.navigation} isSearch={false} />
      <ScrollView
        style={{
          paddingHorizontal: 24,
          marginTop: Platform.OS === 'ios' ? 110 : 70
        }}
      >
        <Text style={styles.headerText}>
          {i18n.t('label.add_gift_message')}
        </Text>
        <FlatList
          data={props.navigation.state.params.giftContacts}
          ItemSeparatorComponent={space}
          horizontal
          style={{ marginVertical: 20 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                maxWidth: 60
              }}
            >
              {item.hasThumbnail ? (
                <Image
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                  source={{ uri: item.thumbnailPath }}
                />
              ) : (
                <GetRandomImage dimension={60} name={item.firstName} />
              )}
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  textAlign: 'center',
                  marginTop: 6
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.firstName}
              </Text>
            </View>
          )}
        />
        <TextField
          label={i18n.t('label.Gift_Message')}
          value={giftMsg}
          tintColor={'#89b53a'}
          titleFontSize={12}
          returnKeyType="next"
          lineWidth={1}
          multiline
          labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
          titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
          affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
          blurOnSubmit={false}
          error={errMsg !== '' ? true : false}
          onChangeText={text => {
            setGiftMsg(text);
            giftMsg ? setErrMsg('') : setErrMsg('Add gift message');
          }}
        />
        <PrimaryButton
          buttonStyle={{ marginVertical: 10 }}
          onClick={onNextClick}
        >
          {i18n.t('label.continue_to_select_project')}
        </PrimaryButton>
      </ScrollView>
    </View>
  );
};

export default GiftMessage;
