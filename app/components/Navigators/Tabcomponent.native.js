import React, { Component } from 'react';
import { View, Image, ScrollView, SafeAreaView, Text } from 'react-native';
import PropTypes, { func } from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper/tabrouteHelper.native';
import TouchableItem from '../../components/Common/TouchableItem';
import { getImageUrl } from '../../actions/apiRouting';

export default class TabComponent extends Component {
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    userProfile: PropTypes.any
  };

  //TODO hkurra
  //Ideally this should be in the container but for now to keep the same container for both web and app it's better to keep it here
  onPressMenu = item => {
    const { navigation } = this.props;
    updateRoute(item.uri, navigation, 0);
  };

  render() {
    return (
      <View style={{ height: 'auto', width: '100%', flexDirection: 'row' }}>
        {this.props.menuData &&
          this.props.menuData.map(element => (
            <TouchableItem onPress={() => this.onPressMenu(element)}>
              <View style={{ flexdirection: 'column' }}>
                <Text>{element.caption}</Text>
                <View style={{ width: 20, height: 20 }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{
                      uri: getImageUrl('menu', 'thumb', element.icon)
                    }}
                  />
                </View>
              </View>
            </TouchableItem>
          ))}
      </View>
    );
  }
}
