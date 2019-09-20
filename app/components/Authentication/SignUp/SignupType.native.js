import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { SignupOrganization, SignupJustMe } from '../../../assets';
import i18n from '../../../locales/i18n.js';
const colors = {
  borderColor: '#9c9b9b',
  color: '#9c9b9b',
  backgroundColor: '#95c243',
  borderColor2: '#96c04c'
};
export class SignUpType extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick && this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.profileType);
  }
  render() {
    return (
      <View style={{ margin: 5 }}>
        <View>
          <TouchableOpacity onPress={this.handleClick}>
            <ImageBackground
              style={
                this.props.selected
                  ? styles.selectedImageStyle
                  : styles.imageStyle
              }
              source={this.props.iconUrl}
            >
              <View
                style={
                  this.props.selected ? styles.selectedCircle : styles.circle
                }
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={
              this.props.selected
                ? styles.selectedBottomTypeLabel
                : styles.bottomTypeLabel
            }
          >
            {i18n.t('label.i_am_a')}
          </Text>
          <View
            style={
              this.props.selected ? styles.selectedSeprater : styles.seprater
            }
          />
          <Text
            style={
              this.props.selected
                ? styles.selectedBottomTypeLabel
                : styles.bottomTypeLabel
            }
          >
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

export class SignupTypes extends Component {
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
          horizontal
          ref={ref => {
            this.scrollView = ref;
          }}
        >
          <View style={styles.innerContainer}>
            <SignUpType
              iconUrl={SignupOrganization}
              profileType="tpo"
              selected={this.state.Profiletype == 'tpo'}
              title={i18n.t('label.tpo_title')}
              onClick={this.changeProfile}
            />
            <SignUpType
              profileType="individual"
              iconUrl={SignupJustMe}
              selected={this.state.Profiletype == 'individual'}
              title={i18n.t('label.individual_title')}
              onClick={this.changeProfile}
            />
            <SignUpType
              iconUrl={SignupOrganization}
              selected={this.state.Profiletype == 'company'}
              title={i18n.t('label.company_title')}
              profileType="company"
              onClick={this.changeProfile}
            />
            <SignUpType
              iconUrl={SignupOrganization}
              selected={this.state.Profiletype == 'education'}
              title={i18n.t('label.education_title')}
              profileType="education"
              onClick={this.changeProfile}
            />
          </View>
        </ScrollView>
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
    width: 70,
    height: 70
  },
  selectedImageStyle: {
    width: 99,
    height: 99
  },
  circle: {
    borderRadius: 35,
    borderWidth: 10,
    borderColor: colors.borderColor,
    height: 70
  },
  selectedCircle: {
    borderRadius: 50,
    borderWidth: 10,
    borderColor: colors.borderColor2,
    height: 99
  },
  selectedBottomTypeLabel: {
    color: colors.color,
    fontSize: 13,
    maxWidth: 99
  },
  bottomTypeLabel: {
    color: colors.color,
    fontSize: 13,
    maxWidth: 90
  },
  selectedSeprater: {
    backgroundColor: colors.backgroundColor,
    width: '100%',
    height: 2,
    marginTop: 3,
    marginBottom: 3
  },
  seprater: {
    backgroundColor: colors.borderColor,
    width: '100%',
    height: 2,
    marginTop: 3,
    marginBottom: 3
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginBottom: 10
  }
});
