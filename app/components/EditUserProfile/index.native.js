import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TabView, TabBar } from 'react-native-tab-view';
import { Text, View, ScrollView, Image } from 'react-native';
import tabBarStyles from '../../styles/common/tabbar.native';
import t from 'tcomb-form-native';
import {
  parsedSchema,
  plantProjectSchema
} from '../../server/parsedSchemas/editProfile';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';
import { ProfileImagePickerTemplate } from './ProfileImagePickerTemplate.native';
import styles from '../../styles/edit_profile.native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FollowLabelButton from '../Common/Button/FollowLabelButton';
import UserProfileImage from '../Common/UserProfileImage';
import LoadingIndicator from '../Common/LoadingIndicator';
import TouchableItem from '../Common/TouchableItem.native';
import { updateRoute } from '../../helpers/routerHelper';
import { getLocalRoute } from '../../actions/apiRouting';

const Form = t.form.Form;
function UserProfileTemplate(locals) {
  return (
    <View>
      {locals.inputs.title}
      {locals.inputs.name}
      {locals.inputs.firstname}
      {locals.inputs.lastname}
      {locals.inputs.gender}
      {locals.inputs.subType}

      {locals.inputs.address}
      {locals.inputs.zipCode}
      {locals.inputs.city}
      {locals.inputs.country}

      {locals.inputs.mayContact}
      {locals.inputs.mayPublish}
    </View>
  );
}

export default class EditUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordNotSameError: false,
      index: 0,
      routes: [
        {
          key: 'basic',
          title: i18n.t('label.basic_profile')
        },
        {
          key: 'desc',
          title: i18n.t('label.description')
        },
        {
          key: 'security',
          title: i18n.t('label.profile_security')
        },
        {
          key: 'following',
          title: i18n.t('label.un_subscribe')
        }
      ]
    };
  }

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={tabBarStyles.indicator}
        style={[tabBarStyles.tabBar]}
        labelStyle={tabBarStyles.textStyle}
        indicatorStyle={tabBarStyles.textActive}
        scrollEnabled
        bounces
        useNativeDriver
      />
    );
  };

  _handleIndexChange = index => this.setState({ index });

  getFormSchemaOption = (userType, profileType) => {
    let schemaOptions = parsedSchema[userType][profileType].schemaOptions;
    if (profileType == 'password') {
      try {
        schemaOptions.fields.password.fields.first.hasError = schemaOptions.fields.password.fields.second.hasError = this.state.passwordNotSameError;
        schemaOptions.fields.password.fields.first.error = schemaOptions.fields.password.fields.second.error = (
          <Text>{i18n.t('label.same_password_error')}</Text>
        );
      } catch (err) {}
    } else if (profileType == 'image') {
      schemaOptions.fields.imageFile.template = ProfileImagePickerTemplate;
    } else if (profileType == 'profile') {
      schemaOptions.template = UserProfileTemplate;
    }

    return schemaOptions;
  };

  _renderScene = ({ route }) => {
    const { type, treecounter: treeCounter } = this.props.currentUserProfile;
    switch (route.key) {
      case 'basic':
        return (
          <KeyboardAwareScrollView enableOnAndroid={true}>
            <CardLayout style={{ flex: 1 }}>
              <Form
                ref={'image'}
                type={parsedSchema[type].image.transformedSchema}
                options={this.getFormSchemaOption(type, 'image')}
                value={{ imageFile: this.props.currentUserProfile.image }}
              />
              <View {...this.props}>
                <Form
                  ref={'profile'}
                  type={parsedSchema[type].profile.transformedSchema}
                  options={this.getFormSchemaOption(type, 'profile')}
                  value={this.props.currentUserProfile}
                />
              </View>
              <PrimaryButton
                onClick={() => {
                  this.props.onSave(type, 'profile', this.refs.tabView.refs);
                }}
              >
                {i18n.t('label.save_changes')}
              </PrimaryButton>
            </CardLayout>
          </KeyboardAwareScrollView>
        );
        break;
      case 'desc':
        return (
          <KeyboardAwareScrollView enableOnAndroid={true}>
            <CardLayout style={{ flex: 1 }}>
              <View {...this.props}>
                <Form
                  ref={'about_me'}
                  type={parsedSchema[type].about_me.transformedSchema}
                  options={this.getFormSchemaOption(type, 'about_me')}
                  value={this.props.currentUserProfile}
                />
              </View>
              <PrimaryButton
                onClick={() => {
                  this.props.onSave(type, 'about_me', this.refs.tabView.refs);
                }}
              >
                {i18n.t('label.save_changes')}
              </PrimaryButton>
            </CardLayout>
          </KeyboardAwareScrollView>
        );
      case 'following':
        return (
          <CardLayout style={{ flex: 1 }}>
            <ScrollView>
              {treeCounter &&
              treeCounter.followeeIds &&
              this.props.followeeList &&
              this.props.followeeList.length > 0 ? (
                <View>
                  {this.props.followeeList.map(follow => (
                    <View key={follow.id} style={styles.followerRow}>
                      <UserProfileImage
                        profileImage={follow.userProfile.image}
                      />
                      <TouchableItem
                        style={styles.followerCol}
                        onPress={() => {
                          setTimeout(() => {
                            this.props.navigation.navigate(
                              getLocalRoute('app_treecounter'),
                              {
                                treeCounterId: follow.id
                              }
                            );
                          }, 0);
                        }}
                      >
                        <Text>{follow.displayName}</Text>
                      </TouchableItem>

                      <FollowLabelButton
                        label={i18n.t('label.un_follow')}
                        isSubscribed={true}
                        isLoggedIn={false}
                        onClick={() => {
                          this.props.unfollowUser(follow.id);
                        }}
                      />
                    </View>
                  ))}
                </View>
              ) : this.props.followeeList ? (
                <Text>{i18n.t('label.not_following_anybody')}</Text>
              ) : (
                <LoadingIndicator />
              )}
            </ScrollView>
          </CardLayout>
        );

      case 'security':
        return (
          <KeyboardAwareScrollView enableOnAndroid={true}>
            <CardLayout style={{ flex: 1 }}>
              <View {...this.props}>
                <Form
                  ref={'password'}
                  type={parsedSchema[type].password.transformedSchema}
                  options={this.getFormSchemaOption(type, 'password')}
                  value={{
                    ...this.props.currentUserProfile
                  }}
                />
              </View>
              <PrimaryButton
                onClick={() => {
                  let value = this.refs.tabView.refs.password.getValue();
                  if (
                    value &&
                    (!value.password ||
                      value.password.first !== value.password.second)
                  ) {
                    //same password
                    this.setState({
                      passwordNotSameError: true
                    });
                    return;
                  }
                  this.setState({ passwordNotSameError: false });
                  this.props.onSave(type, 'password', this.refs.tabView.refs);
                }}
              >
                {i18n.t('label.change_password')}
              </PrimaryButton>
              <PrimaryButton
                buttonStyle={styles.deleteProfileButton}
                onClick={() => {
                  this.props.navigation.navigate('delete_profile_confirm', {
                    deleteProfile: this.props.deleteProfile
                  });
                }}
              >
                {i18n.t('label.delete_profile')}
              </PrimaryButton>
            </CardLayout>
          </KeyboardAwareScrollView>
        );
        break;
        return null;
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View />
        <TabView
          ref={'tabView'}
          useNativeDriver={true}
          navigationState={this.state}
          renderScene={this._renderScene.bind(this)}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </ScrollView>
    );
  }
}

EditUserProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object,
  openPasswordUpdatedDialog: PropTypes.bool,
  handlePaswordUpdatedClose: PropTypes.func,
  deleteProfile: PropTypes.func.isRequired,
  updatePlantProject: PropTypes.func.isRequired,
  deletePlantProject: PropTypes.func.isRequired,
  addPlantProject: PropTypes.func.isRequired,
  followeeList: PropTypes.array,
  unfollowUser: PropTypes.func
};
