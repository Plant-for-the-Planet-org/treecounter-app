import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const TextHeading = lazy(() => import('../Common/Heading/TextHeading'));
const CardLayout = lazy(() => import('../Common/Card'));
const TextBlock = lazy(() => import('../Common/Text/TextBlock'));

import i18n from '../../locales/i18n';

export default class RedirectedPublicDenyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
  }

  componentWillMount() {
    this.props.denyChallenge();
  }

  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.challenge_heading')}</TextHeading>
        <CardLayout>
          <TextBlock>{i18n.t('label.challenge_deny')}</TextBlock>
          <div className={'gap'} />
        </CardLayout>
      </div>
    );
  }
}

RedirectedPublicDenyEmail.propTypes = {
  denyChallenge: PropTypes.func
};
