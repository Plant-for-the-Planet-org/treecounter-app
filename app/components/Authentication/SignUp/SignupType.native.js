import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import {
  schemaOptions,
  signupFormSchema
} from '../../../server/formSchemas/signup';
import { loginStyles } from '../Login.native';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';

class SingupType extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.profileType);
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={this.handleClick}
      >
        <ImageBackground style={styles.imageStyle} source={this.props.iconUrl}>
          <View
            style={this.props.selected ? styles.selectedCircle : styles.circle}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
export default class SignupTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual'
    };
    this.changeProfile = this.changeProfile.bind(this);
  }

  changeProfile(type) {
    console.log(type);
    this.setState({
      Profiletype: type
    });
    this.props.changeProfile(type);
  }
  render() {
    return (
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <SingupType
            iconUrl={require('../../../images/organisation.png')}
            profileType={'tpo'}
            selected={this.state.Profiletype == 'tpo'}
            onClick={this.changeProfile}
          />
          <SingupType
            profileType={'individual'}
            iconUrl={require('../../../images/just-me.png')}
            selected={this.state.Profiletype == 'individual'}
            onClick={this.changeProfile}
          />
          <SingupType
            iconUrl={require('../../../images/organisation.png')}
            selected={this.state.Profiletype == 'company'}
            profileType={'company'}
            onClick={this.changeProfile}
          />
          <SingupType
            iconUrl={require('../../../images/organisation.png')}
            selected={this.state.Profiletype == 'education'}
            profileType={'education'}
            onClick={this.changeProfile}
          />
        </View>
      </ScrollView>
    );
  }
}

export const styles = StyleSheet.create({
  imageContainer: {
    // justifyContent: 'center',
    // height: 70,
    // width: 70
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginBottom: 20
  },
  imageStyle: {
    // width: 50,
    // height: 50
  },
  circle: {
    borderRadius: 35,
    borderWidth: 10,
    borderColor: '#9c9b9b',
    height: 70,
    width: 70
  },
  selectedCircle: {
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#96c04c',
    height: 99,
    width: 99
  }
});
