import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Dimensions,
    StyleSheet
} from 'react-native';
import styles from '../../../styles/donations/donationDetails';
import i18n from '../../../locales/i18n';
import { formatNumber, delimitNumbers } from '../../../utils/utils';
import GetRandomImage from '../../../utils/getRandomImage';

function SelectMultiTreeCount(props) {
    const [tempTreeCount, setTempTreeCount] = React.useState(0);
    let treeCountOptions;

    if (props.selectedProject) {
        if (
            props.selectedProject.paymentSetup.treeCountOptions &&
            props.selectedProject.paymentSetup.treeCountOptions.fixedTreeCountOptions
        ) {
            treeCountOptions =
                props.selectedProject.paymentSetup.treeCountOptions
                    .fixedTreeCountOptions;
        } else {
            treeCountOptions = [10, 20, 50, 150];
        }
    }

    return (
        <View style={styles.treeCountSelector}>
            {treeCountOptions.map(option => (
                <TouchableOpacity
                    onPress={() => {
                        let { giftDetails } = props;
                        giftDetails[props.currentIndex].treeCount = option;
                        giftDetails[props.currentIndex].isCustomCount = false;
                        props.setGiftDetails(giftDetails);
                        // setTempTreeCount('');
                    }}
                    style={
                        props.giftDetails[props.currentIndex].treeCount === option
                            ? styles.selectedView
                            : styles.selectorView
                    }
                >
                    <Text
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
            {props.giftDetails[props.currentIndex].isCustomCount ? (
                <View style={styles.customSelectedView}>
                    <TextInput
                        style={
                            props.giftDetails[props.currentIndex].isCustomCount
                                ? styles.treeCountTextInputSelected
                                : styles.treeCountTextInput
                        }
                        onChangeText={treeCount => setTempTreeCount(treeCount)}
                        onSubmitEditing={() => {
                            let { giftDetails } = props;
                            giftDetails[props.currentIndex].treeCount = Number(tempTreeCount);
                            props.setGiftDetails(giftDetails);
                        }}
                        value={tempTreeCount}
                        keyboardType={'number-pad'}
                        autoFocus
                    />
                    <Text
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
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>GIFT RECIPIENT</Text>
            <FlatList
                data={props.context.giftDetails}
                ItemSeparatorComponent={space}
                horizontal
                style={{ marginTop: 20 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={stylesLocal.giftProfileContainer}>
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
                            ) : (<GetRandomImage dimension={60} name={item.firstName} />)}
                            <Text style={stylesLocal.giftReciepientName}>{item.firstName}</Text>
                        </TouchableOpacity>
                        {props.context.giftDetails.length > 1 && currentIndex === index ? (
                            <View style={styles.triangle} />
                        ) : null}
                    </View>
                )}
            />

            <View style={styles.multiTreeCountContainer}>
                {giftDetails.length > 0 ? (
                    <SelectMultiTreeCount
                        currentIndex={currentIndex}
                        giftDetails={giftDetails}
                        setGiftDetails={setGiftDetails}
                        selectedProject={props.selectedProject}
                    />
                ) : null}
            </View>
            {giftDetails.length < 4 ? (
                <TouchableOpacity>
                    <Text style={styles.giftTreesAddRecepient}>Add another recipient</Text>
                </TouchableOpacity>
            ) :
                null}
        </View>
    );
};


const space = () => {
    return (
        <View style={stylesLocal.space} />
    );
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