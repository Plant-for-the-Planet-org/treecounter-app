import React, { lazy } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n';

const PrimaryButton = lazy(() => import('../../Common/Button/PrimaryButton'));
const CheckBox = lazy(() => import('../../Common/Checkbox'));

import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';

class Offline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxState: false
    };
  }

  handleSubmit = () => {
    if (this.state.checkboxState) {
      this.props.onSuccess({
        userMessage: 'Success',
        isConfirmed: this.state.checkboxState
      });
    } else {
      NotificationManager.error(
        i18n.t('label.please_confirm'),
        i18n.t('label.error')
      );
    }
  };
  handleArrowClick = () => {
    this.props.handleExpandedClicked('4');
  };

  render() {
    const { account, amount, currency } = this.props;
    const userMessage = i18n.t('label.confirm', { amount, currency });
    const textColor = '#b7d37f';
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          width: '100%'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            style={{
              flex: 1
            }}
            value={this.state.checkboxState}
            onValueChange={() =>
              this.setState({ checkboxState: !this.state.checkboxState })
            }
            title={userMessage}
          />
        </View>

        <Text
          style={{
            textAlign: 'justify',
            color: textColor,
            marginTop: 15,
            marginLeft: 5,
            alignSelf: 'flex-start'
          }}
        >
          {account.full_text}
        </Text>
        <PrimaryButton onClick={ev => this.handleSubmit(ev)}>
          {i18n.t('label.pay_via')}
        </PrimaryButton>
      </View>
    );
  }
}

Offline.propTypes = {
  account: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default Offline;
