import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = () => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white'
      }}
    >
      <View>
        <Image
          source={{
            uri:
              'https://cdn.zeplin.io/5cad97d9b33d0b5931d90a9b/assets/C4D2C402-B10F-4E0D-BB89-588E7669E98F.png'
          }}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontFamily: 'OpenSans-Regular'
          }}
        >
          Explore
        </Text>
      </View>
      <View>
        <Icon name={'search'} size={25} color={'gray'} />
      </View>
    </View>
  );
};
export default Header;
