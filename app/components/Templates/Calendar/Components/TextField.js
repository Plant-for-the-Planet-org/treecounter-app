import React from 'react';
import PropTypes from 'prop-types';
// import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import { TextField } from '@ui-lib/core';

import { downwardArrow, upwardArrow } from '../../../../../assets/index';

CalendarIcon = () => {
  return <img src={downwardArrow} />;
};
class DateTextField extends React.Component {
  render() {
    const { theme, onPress, ...rest } = this.props;
    return (
      <TextField
        {...rest}
        value={this.props.dateFormat}
        placeholder={this.props.dateFormat}
      />
    );
  }
}

DateTextField.defaultProps = {
  label: 'Date',
  dateFormat: 'DD/MM/YYYY'
};
DateTextField.propTypes = {
  label: PropTypes.string,
  dateFormat: PropTypes.string
};

export default DateTextField;
