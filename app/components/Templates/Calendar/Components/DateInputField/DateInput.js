import React from 'react';
import PropTypes from 'prop-types';

class DateTextField extends React.Component {
  render() {
    const { theme, onPress, ...rest } = this.props;
    return (
      <div
        tabIndex={'-1'}
        onFocus={this.handleFocus}
        style={styles.inputFieldContainer}
      >
        <input
          readOnly
          type={'text'}
          ref={this._inputRef1}
          style={{
            ...styles.inputField,
            width: `${dateFormat[0].length}em`
          }}
          value={String(currentDate || dateFormat[0]).padStart(
            dateFormat[0].length,
            '0'
          )}
          onBlur={event => {
            this.handleInputOnBlur(event, this._inputRef1);
          }}
          maxLength={dateFormat[0].length}
          onClick={event => this.handleOnClick(event, this._inputRef1)}
          onKeyDown={event => this.handleKeyPress(event, this._inputRef1)}
        />
        <span style={styles.selectNone}>/</span>
        <input
          readOnly
          onBlur={event => {
            this.handleInputOnBlur(event, this._inputRef2);
          }}
          style={{
            ...styles.inputField,
            width: `${dateFormat[1].length}em`
          }}
          value={month || dateFormat[1]}
          maxLength={dateFormat[1].length}
          ref={this._inputRef2}
          onClick={event => this.handleOnClick((event, this._inputRef2))}
        />
        <span style={styles.selectNone}>/</span>
        <input
          readOnly
          onBlur={event => {
            this.handleInputOnBlur(event, this._inputRef3);
          }}
          style={{
            ...styles.inputField,
            width: `${dateFormat[2].length}em`
          }}
          value={year || dateFormat[2]}
          maxLength={dateFormat[2].length}
          ref={this._inputRef3}
          onClick={event => this.handleOnClick(event, this._inputRef3)}
        />
      </div>
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
