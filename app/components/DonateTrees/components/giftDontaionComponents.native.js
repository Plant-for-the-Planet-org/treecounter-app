import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles from '../../../styles/donations/donationDetails';
import GetRandomImage from '../../../utils/getRandomImage';
import { SelectTreeCount } from './donationComponents.native';
import { TextField } from 'react-native-material-textfield';
import i18n from '../../../locales/i18n';

export const GiftTreesComponent = props => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [giftDetails, setGiftDetails] = React.useState([]);

  React.useEffect(() => {
    let details = props.context.giftDetails;
    for (let i = 0; i < details.length; i++) {
      details[i] = {
        ...details[i],
        treeCount: props.selectedProject.treeCountOptions.default
          ? props.selectedProject.treeCountOptions.default
          : 10,
        isCustomCount: false,
        giftMsg: '',
        notifyRecipient: false
      };
    }
    setGiftDetails(details);
  }, []);

  const setTotalTreeCount = (index, treeCount) => {
    let details = giftDetails;
    details[index] = {
      ...details[index],
      treeCount: treeCount
    };
    setGiftDetails(details);
    let totalTreeCount = 0;
    for (let i = 0; i < details.length; i++) {
      totalTreeCount = totalTreeCount + details[i].treeCount;
    }
    props.setTreeCount(totalTreeCount);
  };

  const handleGiftMessageChange = text => {
    let details = giftDetails;
    details[currentIndex] = {
      ...details[currentIndex],
      giftMsg: text
    };
    setGiftDetails(details);
  };

  const setCustomTreeCount = value => {
    console.log('setCustomTreeCount component', value);
    let details = giftDetails;
    details[currentIndex] = {
      ...details[currentIndex],
      isCustomCount: value
    };
    setGiftDetails(details);
  };

  return (
    <View>
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
        GIFT RECIPIENT
      </Text>
      {/* Maps the Avatar of selected contacts from giftDetails, 
            which on click shows no. of trees to contribute to each one of them */}
      <FlatList
        data={giftDetails}
        ItemSeparatorComponent={space}
        horizontal
        style={{ marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={stylesLocal.giftProfileContainer}>
            {/* onclick sets the current index as selected and shows no. of trees of that contact */}
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(index);
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
              <Text style={stylesLocal.giftReciepientName}>
                {item.firstName}
              </Text>
            </TouchableOpacity>
            {giftDetails.length > 1 && currentIndex === index ? (
              <View style={styles.triangle} />
            ) : null}
          </View>
        )}
      />
      <FlatList
        data={giftDetails}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) =>
          currentIndex === index && (
            <SelectTreeCount
              treeCount={item.treeCount}
              customTreeCount={item.isCustomCount}
              setCustomTreeCount={setCustomTreeCount}
              setTreeCount={treeCount => setTotalTreeCount(index, treeCount)}
              selectedProject={props.selectedProject}
            />
          )
        }
      />

      <FlatList
        data={giftDetails}
        renderItem={({ item, index }) =>
          currentIndex === index && (
            <TextField
              label={i18n.t('label.Gift_Message')}
              value={giftDetails[currentIndex]?.giftMsg}
              tintColor={'#89b53a'}
              titleFontSize={12}
              returnKeyType="next"
              lineWidth={1}
              labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
              titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
              affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
              blurOnSubmit={false}
              onChangeText={text => handleGiftMessageChange(text)}
            />
          )
        }
      />

      {giftDetails.length < 4 ? (
        <TouchableOpacity>
          <Text style={styles.giftTreesAddRecepient}>
            Add another recipient
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const space = () => {
  return <View style={stylesLocal.space} />;
};

const stylesLocal = StyleSheet.create({
  space: { height: 60, width: 15, backgroundColor: 'transparent' },
  multiTreeCountContainer: {
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 24,
    marginLeft: -24
  },
  giftReciepientName: {
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    marginTop: 6,
    fontSize: 10,
    marginBottom: 10
  },
  giftProfileContainer: {
    maxWidth: 60,
    alignItems: 'center'
  }
});
