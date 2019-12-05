import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import WelcomeScreen1 from './welcomescreen1.native';
import WelcomeScreen2 from './welcomescreen2.native';
import WelcomeScreen3 from './welcomescreen3.native';
import WelcomeScreen4 from './welcomescreen4.native';
import WelcomeScreen5 from './welcomescreen5.native';

const WelcomSlider = () => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      paginationStyle={{ bottom: 130, zIndex: 1000 }}
      activeDotColor={'#89b53a'}
    >
      <View style={styles.container}>
        <WelcomeScreen1 />
      </View>
      <View style={styles.container}>
        <WelcomeScreen2 />
      </View>
      <View style={styles.container}>
        <WelcomeScreen3 />
      </View>
      <View style={styles.container}>
        <WelcomeScreen4 />
      </View>
      <View style={styles.container}>
        <WelcomeScreen5 />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});
export default WelcomSlider;
