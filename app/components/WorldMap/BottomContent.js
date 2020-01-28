import React from 'react';
import { View, Text, Switch, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { linkExternal } from '../../assets/index';

const BottomContent = () => {
  const widget = () => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 30,
          marginVertical: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderColor: 'red',
          borderWidth: 0
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              fontSize: 14,
              lineHeight: 19,
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            Planted Trees
          </Text>
        </View>
        <View>
          <Switch />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 0.9,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderWidth: 0,
            borderColor: 'red'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: '#82a8dd',
                width: 15,
                height: 15,
                borderRadius: 20
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text>Registered Trees</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: '#043c88',
                width: 15,
                height: 15,
                borderRadius: 20
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text>Donated Trees</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            color: 'rgba(0, 0, 0, 0.6)'
          }}
        >{`All planted trees registered by the users since 2006. Including the Billion Tree Campaign.\nRead More`}</Text>
      </View>
      {/*  Second Widget */}
      {SecondWidget()}
      {SecondWidget()}
    </View>
  );
  const SecondWidget = () => (
    <View>
      <View
        style={{
          height: 30,
          marginVertical: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderColor: 'red',
          borderWidth: 0
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              fontSize: 14,
              lineHeight: 19,
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            Reforestation Opportunities
          </Text>
        </View>
        <View>
          <Switch />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontFamily: 'OpenSans-Regular',
            color: 'rgba(137, 181, 58, 0.8)'
          }}
        >
          Low
        </Text>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#cbfc73', '#5b801d']}
          style={{
            flex: 0.9,
            height: 10,
            borderRadius: 10,
            marginHorizontal: 10
          }}
        />
        <Text
          style={{
            fontFamily: 'OpenSans-Regular',
            color: 'rgba(137, 181, 58, 0.8)'
          }}
        >
          High Tree Density
        </Text>
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            color: 'rgba(0, 0, 0, 0.6)'
          }}
        >{`3.04 trillion trees currently exist globally. Down from six trillion trees before humans started cutting down forests, about 11,000 years ago. The map shows the number of trees per km2.`}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'red',
          borderWidth: 0
        }}
      >
        <View style={{ width: 50 }}>
          <Image source={linkExternal} style={{ width: 25, height: 25 }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >{`Bastin, J. F. et al. (2019) The Global Tree Restoration Potential. Science 365(6448), 76-79.`}</Text>
        </View>
      </View>
    </View>
  );

  const slider = () => (
    <View>
      <View
        style={{
          height: 30,
          marginVertical: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderColor: 'red',
          borderWidth: 0
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              fontSize: 14,
              lineHeight: 19,
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            Deforestation
          </Text>
        </View>
        <View>
          <Switch />
        </View>
      </View>
    </View>
  );
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'white', marginHorizontal: 20 }}
    >
      {slider()}
      {widget()}
    </ScrollView>
  );
};
export default BottomContent;
