import React from 'react';
import styles from '../../../styles/redeem';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
  Keyboard
} from 'react-native';
import HeaderAnimated from './../../Header/HeaderAnimated.native';
import { SafeAreaView } from 'react-navigation';
import buttonStyles from '../../../styles/common/button.native';
import PropTypes from 'prop-types';
import { updateRoute, updateStaticRoute } from '../../../helpers/routerHelper';
import { smalltree, greencalendar } from '../../../assets';

export default function SeeProject(props) {
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <HeaderAnimated
          navigation={props.navigation}
          title={''}
          scrollY={scrollY}
        />
        <View
          style={{
            borderRadius: 4,
            backgroundColor: '#ffffff',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#d5d5d5',
            margin: 12,
            marginTop: 100,
            padding: 16
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                fontSize: 20,
                letterSpacing: 0,
                color: '#89b53a'
              }}
            >
              0.2 Trees
            </Text>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 14,
                letterSpacing: 0,
                color: 'rgba(0, 0, 0, 0.6)',
                marginLeft: 6
              }}
            >
              Redeemed
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
          >
            <Image style={{ height: 19, width: 19 }} source={smalltree} />
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 14,
                letterSpacing: 0,
                color: 'rgba(0, 0, 0, 0.6)',
                marginLeft: 6
              }}
            >
              Yucatan Reforestation by Plant-for-the-Planet
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
          >
            <Image style={{ height: 19, width: 19 }} source={greencalendar} />
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 14,
                letterSpacing: 0,
                color: 'rgba(0, 0, 0, 0.6)',
                marginLeft: 6
              }}
            >
              March 3, 2019
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={buttonStyles.actionButtonTouchable}
          onPress={() =>
            updateStaticRoute('redeem_see_project', props.navigation)
          }
        >
          <View style={buttonStyles.actionButtonView}>
            <Text style={buttonStyles.actionButtonText}>{'See Project'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

SeeProject.navigationOptions = {
  header: null
};

SeeProject.propTypes = {
  navigation: PropTypes.any
};