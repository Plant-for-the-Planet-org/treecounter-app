import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

export default class FeaturedProject extends Component {
  render() {
    return (
      //   <View
      //     style={{
      //       marginLeft: 20,
      //       borderWidth: 1,
      //       borderRadius: 7,
      //       backgroundColor: '#ffffff',
      //       borderStyle: 'solid',
      //       borderColor: '#d5d5d5'
      //     }}
      //   >
      //     <View
      //       style={{
      //         display: 'flex',
      //         flexDirection: 'row',
      //         padding: 20
      //       }}
      //     >
      //       <Image
      //         source={this.props.imageUri}
      //         style={{ width: 64, height: 64, resizeMode: 'cover' }}
      //       />
      //       <View style={{ paddingLeft: 16 }}>
      //         <Text>{this.props.orgname}</Text>
      //         <View
      //           style={{
      //             display: 'flex',
      //             flexDirection: 'row',
      //             marginTop: 5
      //           }}
      //         >
      //           <Image
      //             style={{
      //               width: 19,
      //               height: 19,
      //               marginRight: 5,
      //               resizeMode: 'cover'
      //             }}
      //             source={require('./../../../assets/images/smalltree.png')}
      //           />
      //           <Text>{this.props.treespledged} Trees Pledged</Text>
      //         </View>
      //         <View
      //           style={{
      //             display: 'flex',
      //             flexDirection: 'row',
      //             marginTop: 5
      //           }}
      //         >
      //           <Image
      //             style={{
      //               width: 19,
      //               height: 19,
      //               marginRight: 5,
      //               resizeMode: 'cover'
      //             }}
      //             source={require('./../../../assets/images/greencalendar.png')}
      //           />
      //           <Text>{this.props.date}</Text>
      //         </View>
      //       </View>
      //     </View>
      //   </View>

      <View
        style={{
          marginLeft: 20,
          borderRadius: 7,
          backgroundColor: '#3498db'
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 20
          }}
        >
          <Image
            source={this.props.imageUri}
            style={{ width: 64, height: 64, resizeMode: 'cover' }}
          />
          <View style={{ paddingLeft: 16 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {this.props.orgname}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 5
              }}
            >
              <Image
                style={{
                  width: 19,
                  height: 19,
                  marginRight: 5,
                  resizeMode: 'cover'
                }}
                source={require('./../../../assets/images/smalltreewhite.png')}
              />
              <Text style={{ color: 'white', fontWeight: '300' }}>
                {this.props.treespledged} Trees Pledged
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 5
              }}
            >
              <Image
                style={{
                  width: 19,
                  height: 19,
                  marginRight: 5,
                  resizeMode: 'cover'
                }}
                source={require('./../../../assets/images/calendarwhite.png')}
              />
              <Text style={{ color: 'white', fontWeight: '300' }}>
                {this.props.date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
