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
let Form = t.form.Form;
import * as join from '../../../constants/strings';

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
      <TouchableOpacity onPress={this.handleClick}>
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

  componentDidMount() {
    const _scrollView = this.scrollView;
    _scrollView.scrollToEnd({ animated: true });
  }

  changeProfile(type) {
    console.log(type);
    this.setState({
      Profiletype: type
    });
    this.props.changeProfile(type);
    if (type === 'education') {
      this.scrollView.scrollToEnd({ animated: true });
    } else if (type === 'tpo') {
      this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }
  }
  render() {
    return (
      <View style={styles.outerContainer}>
        <ScrollView
          horizontal={true}
          ref={ref => {
            this.scrollView = ref;
          }}
        >
          <View style={styles.innerContainer}>
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
        <View style={styles.outerContainer}>
          <Text style={styles.bottomTypeLabel}>{join.iamlabel}</Text>
          <View style={styles.seprater} />
          <Text style={styles.bottomTypeLabel}>
            {join[this.state.Profiletype]}
          </Text>
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10
  },
  innerContainer: {
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
  },
  bottomTypeLabel: {
    color: '#95c243',
    fontSize: 13
  },
  seprater: {
    backgroundColor: '#95c243',
    width: 110,
    height: 2,
    margin: 3
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginBottom: 10
  }
});
