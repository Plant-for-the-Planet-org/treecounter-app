import React, { lazy } from 'react';

const EmailSent = lazy(() =>
  import('../../components/Authentication/EmailSent')
);

export default class EmailSentContainer extends React.Component {
  render() {
    return <EmailSent />;
  }
}
