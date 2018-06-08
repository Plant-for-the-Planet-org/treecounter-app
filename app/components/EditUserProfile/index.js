import React from 'react';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import t from 'tcomb-form';
import PrimaryButton from '../Common/Button/PrimaryButton';
import PropTypes from 'prop-types';
import UserProfileImage from '../Common/UserProfileImage';
import ActionButton from '../Common/ActionButton';
import { parsedSchema } from '../../server/parsedSchemas/editProfile';
import i18n from '../../locales/i18n.js';

let TCombForm = t.form.Form;
export default class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(parsedSchema);
  }

  getFormTemplate = (userType, profileType) => {
    console.log(profileType);
    switch (profileType) {
      case 'profile': {
        return locals => {
          console.log(locals);
          return (
            <div className="tComb-template__profile-form">
              {userType === i18n.t('label.individual') ? (
                <div>
                  {locals.inputs.title}
                  {locals.inputs.firstname}
                  {locals.inputs.lastname}
                  {locals.inputs.gender}
                </div>
              ) : (
                <div>
                  {locals.inputs.name} {locals.inputs.subType}
                </div>
              )}

              <div>
                {locals.inputs.address}
                {locals.inputs.zipCode}
                {locals.inputs.city}
                {locals.inputs.country}
                <div>
                  {locals.inputs.mayContact}
                  {locals.inputs.mayPublish}
                </div>
              </div>
            </div>
          );
        };
      }
      case 'about_me': {
        return locals => {
          console.log(locals);
          return (
            <div className="tComb-template__about-me-form">
              <div>
                {locals.inputs.synopsis1}
                {locals.inputs.synopsis2}
              </div>

              <div>
                {locals.inputs.url}
                {locals.inputs.linkText}
              </div>
            </div>
          );
        };
      }
      case 'password': {
        return locals => {
          console.log(locals);
          return (
            <div className="tComb-template__password-form">
              <div>{locals.inputs.currentPassword}</div>

              <div>{locals.inputs.password}</div>
            </div>
          );
        };
      }
    }
  };

  getFormSchemaOption = (userType, profileType) => {
    let schemaOptions = parsedSchema[userType][profileType].schemaOptions;
    return {
      template: this.getFormTemplate(userType, profileType),
      ...schemaOptions
    };
  };

  render() {
    console.log('___render___Edit_userprofile');
    const { type, image } = this.props.currentUserProfile;
    return (
      <div className="app-container__content--center sidenav-wrapper edit-user-profile__container ">
        <TextHeading>{i18n.t('label.edit_profile')}</TextHeading>
        <CardLayout className="user-profile__form-group">
          <div className="profile-image__container">
            <UserProfileImage profileImage={image} />
            <TCombForm
              ref={'image'}
              type={parsedSchema[type].image.transformedSchema}
              options={parsedSchema[type].image.schemaOptions}
              value={this.props.currentUserProfile}
            />
          </div>

          <TCombForm
            ref={'profile'}
            type={parsedSchema[type].profile.transformedSchema}
            options={this.getFormSchemaOption(type, 'profile')}
            value={this.props.currentUserProfile}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'profile');
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>
        {/* //about_me section */}
        <CardLayout className="user-profile__form-group">
          <div className="form-group__heading">{i18n.t('label.about_me')}</div>
          <TCombForm
            ref={'about_me'}
            type={parsedSchema[type].about_me.transformedSchema}
            options={this.getFormSchemaOption(type, 'about_me')}
            value={this.props.currentUserProfile}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'about_me');
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>
        <CardLayout className="user-profile__form-group">
          <div className="form-group__heading">
            {i18n.t('label.change_password')}
          </div>
          <TCombForm
            ref={'password'}
            type={parsedSchema[type].password.transformedSchema}
            options={this.getFormSchemaOption(type, 'password')}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'password');
            }}
          >
            {i18n.t('label.change_password')}
          </PrimaryButton>
        </CardLayout>
        {/* <CardLayout>Following</CardLayout> */}
        <ActionButton caption={i18n.t('label.delete_profile')} />
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object
};
