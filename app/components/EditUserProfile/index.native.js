/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TabView, TabBar } from 'react-native-tab-view';
import { Text, View, ScrollView } from 'react-native';
import t from 'tcomb-form-native';
import { debug } from '../../debug';
import { parsedSchema } from '../../server/parsedSchemas/editProfile';
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
import { getLocalRoute } from '../../actions/apiRouting';
import tabStyles from '../../styles/common/tabbar';
import HeaderNew from './../Header/HeaderNew';
import { SafeAreaView } from 'react-navigation';
import colors from '../../utils/constants';

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
          title: i18n.t('label.subscribed')
        }
      ]
    };
  }

  changeEmail = emailForm => {
    if (this.refs.tabView.refs.securityTabView) {
      let value = this.refs.tabView.refs.securityTabView.refs.change_email.getValue();
      this.props.updateEmail(value);
    } else {
      let value = emailForm.getValue();
      this.props.updateEmail(value);
    }
  };

  _renderTabBar = props => {
    const focusedColor = '#89b53a';
    const normalColor = '#4d5153';
    return (
      <TabBar
        useNativeDriver
        bounces
        {...props}
        style={[tabStyles.tabBar]}
        tabStyle={{ width: 'auto', padding: 0 }}
        indicatorStyle={{ backgroundColor: colors.WHITE }}
        renderLabel={({ route, focused }) => (
          <View style={{ textAlign: 'left', marginRight: 24 }}>
            <Text
              style={{
                color: focused ? focusedColor : normalColor,
                fontSize: 13,
                fontFamily: 'OpenSans-SemiBold',
                textTransform: 'capitalize',
                textAlign: 'left'
              }}
            >
              {route.title}
            </Text>
            {focused ? (
              <View
                style={[
                  {
                    width: '100%',
                    marginTop: 11,
                    backgroundColor: focusedColor,
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    color: focusedColor
                  }
                ]}
              />
            ) : null}
          </View>
        )}
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
      } catch (err) {
        debug(err);
      }
    } else if (profileType == 'image') {
      schemaOptions.fields.imageFile.template = ProfileImagePickerTemplate;
    } else if (profileType == 'profile') {
      schemaOptions.template = UserProfileTemplate;
    }

    return schemaOptions;
  };

  changePasswordErrorState = value =>
    this.setState({ passwordNotSameError: value });

  _renderScene = ({ route }) => {
    const { onSave, currentUserProfile } = this.props;
    const { treecounter: treeCounter } = currentUserProfile;
    switch (route.key) {
      case 'basic':
        return (
          <BasicTabView
            onSave={onSave}
            currentUserProfile={currentUserProfile}
            getFormSchemaOption={this.getFormSchemaOption}
          />
        );
      // break;
      case 'desc':
        return (
          <DescriptionTabView
            onSave={onSave}
            currentUserProfile={currentUserProfile}
            getFormSchemaOption={this.getFormSchemaOption}
          />
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
                                  treeCounterId: follow.id,
                                  titleParam: follow.displayName
                                }
                              );
                            }, 0);
                          }}
                        >
                          <Text>{follow.displayName}</Text>
                        </TouchableItem>

                        <FollowLabelButton
                          label={i18n.t('label.unsubscribe')}
                          isSubscribed
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
                    <LoadingIndicator contentLoader screen="profileLoader" />
                  )}
            </ScrollView>
          </CardLayout>
        );

      case 'security':
        return (
          <SecurityTabView
            ref={'securityTabView'}
            onSave={onSave}
            currentUserProfile={currentUserProfile}
            getFormSchemaOption={this.getFormSchemaOption}
            navigation={this.props.navigation}
            deleteProfile={this.props.deleteProfile}
            changeEmail={this.changeEmail}
            onSamePasswordErrorState={this.changePasswordErrorState}
          />
        );
      // break;
    }
  };

  render() {
    const textColor = '#4d5153';
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
        <HeaderNew title={''} navigation={this.props.navigation} />

        <View style={{ marginTop: 60 }} />
        <Text
          style={{
            fontFamily: 'OpenSans-ExtraBold',
            fontSize: 27,
            lineHeight: 40,
            letterSpacing: 0,
            textAlign: 'left',
            color: textColor,
            left: 20
          }}
        >
          {i18n.t('label.edit_profile')}
        </Text>

        <TabView
          ref={'tabView'}
          useNativeDriver
          navigationState={this.state}
          renderScene={this._renderScene.bind(this)}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </SafeAreaView>
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

class BasicTabView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props.currentUserProfile;
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <CardLayout style={{ flex: 1 }}>
          <Form
            ref={'image'}
            type={parsedSchema[type].image.transformedSchema}
            options={this.props.getFormSchemaOption(type, 'image')}
            value={{ imageFile: this.props.currentUserProfile.image }}
          />
          <View {...this.props}>
            <Form
              ref={'profile'}
              type={parsedSchema[type].profile.transformedSchema}
              options={this.props.getFormSchemaOption(type, 'profile')}
              value={this.props.currentUserProfile}
            />
          </View>
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'profile', this.refs);
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>
      </KeyboardAwareScrollView>
    );
  }
}

BasicTabView.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object,
  getFormSchemaOption: PropTypes.func
};

class DescriptionTabView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props.currentUserProfile;
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <CardLayout style={{ flex: 1 }}>
          <View {...this.props}>
            <Form
              ref={'about_me'}
              type={parsedSchema[type].about_me.transformedSchema}
              options={this.props.getFormSchemaOption(type, 'about_me')}
              value={this.props.currentUserProfile}
            />
          </View>
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'about_me', this.refs);
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>
      </KeyboardAwareScrollView>
    );
  }
}

DescriptionTabView.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object,
  getFormSchemaOption: PropTypes.func
};

class SecurityTabView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props.currentUserProfile;
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <CardLayout style={{ flex: 1 }}>
          <View {...this.props}>
            <Form
              ref={'change_email'}
              type={parsedSchema[type].email.transformedSchema}
              options={this.props.getFormSchemaOption(type, 'email')}
            />
            <Text style={styles.textStyle}>
              {i18n.t('label.change_email_warning')}
            </Text>
          </View>
          <PrimaryButton
            onClick={() => {
              this.props.changeEmail(this.refs.change_email);
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>
        <CardLayout style={{ flex: 1 }}>
          <View {...this.props}>
            <Form
              ref={'password'}
              type={parsedSchema[type].password.transformedSchema}
              options={this.props.getFormSchemaOption(type, 'password')}
              value={{
                ...this.props.currentUserProfile
              }}
            />
          </View>
          <PrimaryButton
            onClick={() => {
              let value = this.refs.password.getValue();
              if (
                value &&
                (!value.password ||
                  value.password.first !== value.password.second)
              ) {
                //same password
                this.props.onSamePasswordErrorState(true);
                this.setState({
                  passwordNotSameError: true
                });
                return;
              }
              this.props.onSamePasswordErrorState(true);
              this.props.onSave(type, 'password', this.refs);
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
  }
}

SecurityTabView.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object,
  getFormSchemaOption: PropTypes.func,
  navigation: PropTypes.object,
  onSamePasswordErrorState: PropTypes.func,
  deleteProfile: PropTypes.func
};
