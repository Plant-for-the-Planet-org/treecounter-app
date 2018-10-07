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
    this.state = {
      selectedMenu: this.props.menuData[0]
    };
  }

  //TODO hkurra
  //Ideally this should be in the container but for now to keep the same container for both web and app it's better to keep it here
  onPressMenu = item => {
    const { navigation } = this.props;
    this.setState({ selectedMenu: item });
    updateRoute(item.uri, navigation, 0);
  };

  render() {
    return (
      <View
        style={{
          height: 'auto',
          width: '100%',
          flexDirection: 'row',
          paddingRight: 10
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
                      this.state.selectedMenu.caption === element.caption
                        ? images[element.icon + '_red']
                        : images[element.icon]
                    }
                  />
                </View>
                <Text
                  style={[
                    this.state.selectedMenu.caption === element.caption
                      ? { color: '#ec6453' }
                      : { color: 'black' }
                  ]}
                >
                  {element.caption === 'menu_item.competition'
                    ? 'Competition'
                    : element.caption}
                </Text>
              </View>
            </TouchableItem>
          ))}
      </View>
    );
  }
}
