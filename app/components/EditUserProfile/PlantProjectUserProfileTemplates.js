import React from 'react';

export function UserPasswordUpdateTemplate(locals) {
  console.log(locals);
  return (
    <div className="tComb-template__password-form">
      <div>{locals.inputs.currentPassword}</div>

      <div>{locals.inputs.password}</div>
    </div>
  );
}

export function UserAboutmeTemplate(locals) {
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
}

export function UserProfileTemplate(locals) {
  return (
    <div className="tComb-template__profile-form">
      <div>
        <div className="separator" />
        {locals.inputs.title}
        {locals.inputs.name}
        {locals.inputs.firstname}
        {locals.inputs.lastname}
        {locals.inputs.gender}
        {locals.inputs.subType}
      </div>

      <div>
        <div className="separator" />
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
}
