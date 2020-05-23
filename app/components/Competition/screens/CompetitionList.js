import React from 'react';
import i18n from '../../../locales/i18n';
class Competiton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sidenav-wrapper">
        <h2 className="pftp-text-heading">
          {i18n.t('label.competitions')}
          <div className="pftp-text-block">
            {i18n.t('label.competetions_404_message')}
          </div>
        </h2>
      </div>
    );
  }
}
export default Competiton;
