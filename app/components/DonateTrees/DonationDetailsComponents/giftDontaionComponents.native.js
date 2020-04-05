import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Switch,
    TextInput,
    Animated
} from 'react-native';
import styles from '../../../styles/donations/donationDetails';
import PropTypes from 'prop-types';
import {
    currencyIcon,
    gPayLogo,
    blackLock,
    nextArrowWhite,
    infoHint
} from './../../../assets';
import { getImageUrl } from '../../../actions/apiRouting';
import i18n from '../../../locales/i18n';
import { Dropdown } from 'react-native-material-dropdown';
import { formatNumber, delimitNumbers } from '../../../utils/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
                        setTempTreeCount('');
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
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                GIFT RECIPIENT
        </Text>
            <FlatList
                data={props.context.giftDetails}
                ItemSeparatorComponent={space}
                horizontal
                style={{ marginTop: 20 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            maxWidth: 60,
                            alignItems: 'center'
                        }}
                    >
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
                        </TouchableOpacity>
                        {currentIndex === index ? (
                            <View style={[styles.triangle, { marginTop: 10 }]} />
                        ) : null}
                    </View>
                )}
            />
            <View
                style={{
                    width: Dimensions.get('window').width,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                    borderRadius: 8,
                    padding: 24,
                    marginLeft: -24
                }}
            >
                {giftDetails.length > 0 ? (
                    <SelectMultiTreeCount
                        currentIndex={currentIndex}
                        giftDetails={giftDetails}
                        setGiftDetails={setGiftDetails}
                        selectedProject={props.selectedProject}
                    />
                ) : null}
            </View>
            {props.treeCount ? (
                <>
                    <View style={styles.giftDetails}>
                        {props.selectedProject.image ? (
                            <Image
                                style={styles.giftImage}
                                source={{
                                    uri: getImageUrl(
                                        'project',
                                        'thumb',
                                        props.selectedProject.image
                                    )
                                }}
                            />
                        ) : null}
                        <View style={styles.giftNameAmount}>
                            <Text style={styles.giftName}>Sagar Aryal</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.giftTreesTreeCountNumber}>
                                {props.treeCount}{' '}
                            </Text>
                            <Text
                                style={[
                                    styles.giftTreesSelectTrees,
                                    {
                                        marginRight: 12
                                    }
                                ]}
                            >
                                Trees
                </Text>
                            <TouchableOpacity onPress={() => props.setTreeCount(0)}>
                                <Icon name={'chevron-down'} size={14} color="#4d5153" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.horizontalDivider} />
                </>
            ) : (
                    <>
                        <View style={styles.giftDetails}>
                            {props.selectedProject.image ? (
                                <Image
                                    style={styles.giftImage}
                                    source={{
                                        uri: getImageUrl(
                                            'project',
                                            'thumb',
                                            props.selectedProject.image
                                        )
                                    }}
                                />
                            ) : null}

                            <View style={styles.giftNameAmount}>
                                <Text style={styles.giftName}>Sagar Aryal</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.giftTreesSelectTrees}>Select Trees</Text>
                                {/* <Icon name={'chevron-up'} size={14} color="#4d5153" /> */}
                            </View>
                        </View>

                        <SelectTreeCount
                            treeCount={props.treeCount}
                            setTreeCount={props.setTreeCount}
                            selectedProject={props.selectedProject}
                        />

                        <View style={styles.horizontalDivider} />
                    </>
                )}

            {/* <TouchableOpacity>
            <Text style={styles.giftTreesAddRecepient}>
              Add another recipient
            </Text>
          </TouchableOpacity> */}
        </View>
    );
};


const space = () => {
    return (
        <View style={{ height: 60, width: 15, backgroundColor: 'transparent' }} />
    );
};