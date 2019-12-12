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

export default function AddTrees(props) {
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

  const redeemObject = [
    {
      type: 'donation',
      category: 'default',
      treeCount: 100,
      date: '2019-10-24',
      tpo: 'Plant for the Planet'
    },
    {
      type: 'donation',
      category: 'default',
      treeCount: 500,
      date: '2019-10-24',
      tpo: 'Plant for the Planet'
    },
    {
      type: 'donation',
      category: 'gift',
      treeCount: 200,
      date: '2019-10-20',
      tpo: 'Plant for the Planet',
      giftRecipient: 'Sagar Aryal'
    }
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderAnimated
          navigation={props.navigation}
          title={'Redeem 20,500 Trees'}
          scrollY={scrollY}
        />
        <View style={{ marginTop: 110, padding: 20 }}>
          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 18 }}>
            Claiming: 19D-CHN-11X-7
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 16,
              marginTop: 42
            }}
          >
            Trees in this code
          </Text>
        </View>
        <View>
          {/* Single Redeem Object */}
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#d5d5d5' }}>
            {/* if Date */}
            <View
              style={{
                backgroundColor: '#f7f7f7',
                height: 40,
                width: '100%',
                justifyContent: 'center',
                padding: 20
              }}
            >
              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14 }}>
                March 7, 2019
              </Text>
            </View>
            {/* Trees to be redeemed */}
            <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
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
                    fontSize: 18,
                    color: '#4d5153'
                  }}
                >
                  Gift to S. William
                </Text>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Bold',
                    fontSize: 18,
                    color: '#89b53a'
                  }}
                >
                  10,000
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 6
                }}
              >
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 13 }}>
                  Planted by Plant-for-the-Planet
                </Text>
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 13 }}>
                  Trees
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={buttonStyles.actionButtonTouchable}
          onPress={() =>
            updateStaticRoute('redeem_see_project', props.navigation)
          }
        >
          <View style={buttonStyles.actionButtonView}>
            <Text style={buttonStyles.actionButtonText}>
              {'Add to my Trees'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

AddTrees.navigationOptions = {
  header: null
};

AddTrees.propTypes = {
  navigation: PropTypes.any
};
