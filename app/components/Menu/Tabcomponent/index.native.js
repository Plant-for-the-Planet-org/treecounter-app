import React, { Component } from 'react';
import { View, Image, ScrollView, SafeAreaView, Text } from 'react-native';
import PropTypes, { func } from 'prop-types';
import { updateRoute } from '../../../helpers/routerHelper/tabrouteHelper.native';
import TouchableItem from '../../../components/Common/TouchableItem.native';
import * as images from '../../../assets';

export default class TabComponent extends Component {
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    userProfile: PropTypes.any
  };

  constructor(props) {
    super(props);
  }

  //TODO hkurra
  //Ideally this should be in the container but for now to keep the same container for both web and app it's better to keep it here
  onPressMenu = item => {
    const { navigation } = this.props;
    updateRoute(item.uri, navigation, 0);
  };

  render() {
    let activeElement = this.props.navigation.state.routes[0].routeName;
    if (this.props.navigation.state.index) {
      activeElement = this.props.navigation.state.routes[
        this.props.navigation.state.index
      ].routeName;
    }
    return (
      <View
        style={{
          height: 'auto',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 10,
          paddingLeft: 10,
          backgroundColor: 'white',
          shadowOffset: { width: 0, height: 4 },
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowRadius: 12
        }}
      >
        {this.props.menuData &&
          this.props.menuData.map(element => (
            <TouchableItem
              onPress={() => this.onPressMenu(element)}
              key={element.caption}
            >
              <View
                style={[
                  { flexDirection: 'column', margin: 5, alignItems: 'center' }
                ]}
              >
                <View style={{ width: 20, height: 20 }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={
                      activeElement === element.uri
                        ? images[element.icon + '_red']
                        : images[element.icon]
                    }
                  />
                </View>
                <Text
                  style={[
                    activeElement === element.uri
                      ? { color: '#ec6453', fontSize: 12 }
                      : { color: 'black', fontSize: 12 }
                  ]}
                >
                  {element.caption}
                </Text>
              </View>
            </TouchableItem>
          ))}
      </View>
    );
  }
}
