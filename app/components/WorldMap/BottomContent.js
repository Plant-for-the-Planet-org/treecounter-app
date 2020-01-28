import React from 'react';
import {
  View,
  Text,
  Switch,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { linkExternal } from '../../assets/index';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const BottomContent = () => {
  const widget = () => (
    <View style={{}}>
      <View style={styles.widgetHeaderContainer}>
        <View>
          <Text style={styles.widgetHeaderText}>Planted Trees</Text>
        </View>
        <View>
          <Switch
            thumbColor={'#89b53a'}
            value={true}
            trackColor={{ true: 'rgba(137, 181, 58, 0.8)', false: 'green' }}
          />
        </View>
      </View>
      <View style={styles.widgetDotsInfo}>
        <View style={styles.widgetDotsInfoContainer}>
          <View style={styles.dotPlusTextContainer}>
            <View style={[styles.dotShape, { backgroundColor: '#82a8dd' }]} />
            <View style={styles.dotTextContainer}>
              <Text style={styles.addressText}>Registered Trees</Text>
            </View>
          </View>
          <View style={styles.dotPlusTextContainer}>
            <View style={[styles.dotShape, { backgroundColor: '#043c88' }]} />
            <View style={styles.dotTextContainer}>
              <Text styles={styles.addressText}>Donated Trees</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.descTextContainer}>
        <Text
          style={styles.descText}
        >{`All planted trees registered by the users since 2006. Including the Billion Tree Campaign.\nRead More`}</Text>
      </View>
    </View>
  );
  const SecondWidget = () => (
    <View>
      <View style={styles.widgetHeaderContainer}>
        <View>
          <Text style={styles.widgetHeaderText}>
            Reforestation Opportunities
          </Text>
        </View>
        <View>
          <Switch
            thumbColor={'#89b53a'}
            value={true}
            trackColor={{ true: 'rgba(137, 181, 58, 0.8)', false: 'green' }}
          />
        </View>
      </View>
      <View style={styles.gradientContainer}>
        <Text style={styles.greenText}>Low</Text>
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
        <Text style={styles.greenText}>High Tree Density</Text>
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text
          style={styles.descText}
        >{`3.04 trillion trees currently exist globally. Down from six trillion trees before humans started cutting down forests, about 11,000 years ago. The map shows the number of trees per km2.`}</Text>
      </View>
      <View style={styles.addressContainer}>
        <View style={{ width: 50 }}>
          <Image source={linkExternal} style={{ width: 25, height: 25 }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={styles.addressText}
          >{`Bastin, J. F. et al. (2019) The Global Tree Restoration Potential. Science 365(6448), 76-79.`}</Text>
        </View>
      </View>
    </View>
  );

  const slider = () => (
    <View>
      <View style={styles.widgetHeaderContainer}>
        <View>
          <Text style={styles.widgetHeaderText}>
            Reforestation Opportunities
          </Text>
        </View>
        <View>
          <Switch
            thumbColor={'#89b53a'}
            value={true}
            trackColor={{ true: 'rgba(137, 181, 58, 0.8)', false: 'green' }}
          />
        </View>
      </View>
    </View>
  );
  return (
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      {widget()}
      {SecondWidget()}
      {SecondWidget()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20
  },
  widgetHeaderContainer: {
    height: 30,
    marginVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 0
  },
  widgetHeaderText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  widgetDotsInfo: {
    flexDirection: 'row'
  },
  widgetDotsInfoContainer: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderColor: 'red'
  },
  dotPlusTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotShape: {
    width: 15,
    height: 15,
    borderRadius: 20
  },
  dotTextContainer: {
    marginLeft: 10
  },
  descText: {
    fontFamily: 'OpenSans-SemiBold',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  descTextContainer: {
    marginVertical: 20
  },
  gradientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    alignItems: 'center'
  },
  greenText: {
    fontFamily: 'OpenSans-Regular',
    color: 'rgba(137, 181, 58, 0.8)'
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0
  },
  addressText: {
    fontFamily: 'OpenSans-Regular',
    color: 'rgba(0, 0, 0, 0.6)'
  }
});

export default BottomContent;
