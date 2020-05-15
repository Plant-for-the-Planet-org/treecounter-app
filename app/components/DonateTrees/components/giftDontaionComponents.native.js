import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styles from '../../../styles/donations/donationDetails';
import GetRandomImage from '../../../utils/getRandomImage';

function SelectMultiTreeCount(props) {
  const [customTreeCount, setCustomTreeCount] = React.useState(false);
  const [tempTreeCount, setTempTreeCount] = React.useState(0);
  let treeCountOptions;
  let defaultTreeCountOption;

  const customTreeCountRef = React.useRef(null);

  //  sets the tree count options to be shown by project or sets default
  if (props.selectedProject) {
    if (props.selectedProject.treeCountOptions) {
      treeCountOptions = Object.values(props.selectedProject.treeCountOptions);
      treeCountOptions.sort();
      if (!props.treeCount) {
        props.setTreeCount(props.selectedProject.treeCountOptions.default);
      }
    } else {
      defaultTreeCountOption = 10;
      treeCountOptions = [10, 20, 50, 150];
      if (!props.treeCount) {
        props.setTreeCount(defaultTreeCountOption);
      }
    }
  }

  if (!customTreeCountRef.isFocused && customTreeCount) {
    props.setTreeCount(tempTreeCount);
  }

  return (
    <View style={styles.treeCountSelector}>
      {treeCountOptions.map(option => (
        // sets the tree count of current index and custom count as false
        <TouchableOpacity
          onPress={() => {
            let { giftDetails } = props;
            giftDetails[props.currentIndex].treeCount = option;
            giftDetails[props.currentIndex].isCustomCount = false;
            props.setGiftDetails(giftDetails);
          }}
          //  change the style of box selected by tree count
          style={
            props.giftDetails[props.currentIndex].treeCount === option
              ? styles.selectedView
              : styles.selectorView
          }
        >
          <Text
            //  change the style of text selected by tree count
            style={
              props.giftDetails[props.currentIndex].treeCount === option
                ? styles.selectedTreeCountText
                : styles.treeCountText
            }
          >
            {option} Trees
          </Text>
        </TouchableOpacity>
      ))}
      {/* checks if custom count is true then changes style to active and enable input to enter tree count */}
      {props.giftDetails[props.currentIndex].isCustomCount ? (
        <View style={styles.customSelectedView}>
          <TextInput
            //  change the style of text input selected by tree count
            style={
              props.giftDetails[props.currentIndex].isCustomCount
                ? styles.treeCountTextInputSelected
                : styles.treeCountTextInput
            }
            onChangeText={treeCount => setTempTreeCount(treeCount)}
            // after submitting sets the tree count
            onSubmitEditing={() => {
              let { giftDetails } = props;
              giftDetails[props.currentIndex].treeCount = Number(tempTreeCount);
              props.setGiftDetails(giftDetails);
            }}
            value={tempTreeCount}
            keyboardType={'number-pad'}
            autoFocus
            ref={customTreeCountRef}
          />
          <Text
            //  change the style of text selected by tree count

            style={
              props.giftDetails[props.currentIndex].isCustomCount
                ? styles.treeCountNumberSelected
                : styles.treeCountNumber
            }
          >
            Trees
          </Text>
        </View>
      ) : (
          <TouchableOpacity
            //  sets tree count to 0 and custom count to true
            onPress={() => {
              let { giftDetails } = props;
              giftDetails[props.currentIndex].treeCount = 0;
              giftDetails[props.currentIndex].isCustomCount = true;
              props.setGiftDetails(giftDetails);
            }}
            style={styles.customSelectorView}
          >
            <Text style={styles.customTreeCountText}>Custom Trees</Text>
          </TouchableOpacity>
        )}
    </View>
  );
}

export const GiftTreesComponent = props => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [giftDetails, setGiftDetails] = React.useState([]);
  React.useEffect(() => {
    let details = props.context.giftDetails;
    for (let i = 0; i < details.length; i++) {
      details[i] = {
        ...details[i],
        treeCount: 0,
        isCustomCount: false,
        giftMsg: '',
        notifyRecipient: false
      };
    }
    setGiftDetails(details);
  }, []);
  return (
    <View>
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
        GIFT RECIPIENT
      </Text>
      {/* Maps the Avatar of selected contacts from giftDetails, 
            which on click shows no. of trees to contribute to each one of them */}
      <FlatList
        data={props.context.giftDetails}
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
            {props.context.giftDetails.length > 1 && currentIndex === index ? (
              <View style={styles.triangle} />
            ) : null}
          </View>
        )}
      />

      <View style={styles.multiTreeCountContainer}>
        {giftDetails.length > 0 ? (
          // maps the tree count for each user
          <SelectMultiTreeCount
            currentIndex={currentIndex}
            giftDetails={giftDetails}
            setGiftDetails={setGiftDetails}
            selectedProject={props.selectedProject}
            setTreeCount={props.setTreeCount}
          />
        ) : null}
      </View>
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
