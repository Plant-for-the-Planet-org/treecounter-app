/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getStyles } from './style';
import { withHover } from '../../Utils/HOCs/withHover';

/**
 * A reusable and stateless Component
 * It Render the items of Suggestion side menu
 *
 */
class SuggestionMenuitem extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render : React life cycle method
   * Here we are rendering li with provided children
   */
  render() {
    const { children, onClick, calendarTheme, disabled } = this.props;

    const styles = getStyles(calendarTheme);
    return (
      <li
        onClick={onClick}
        style={{
          ...styles.suggestionItem,
          backgroundColor:
            !disabled && (this.props.hovering || this.props.selected)
              ? calendarTheme.selectItemHoverColor
              : calendarTheme.modalBackgroundColor,
          color: disabled
            ? calendarTheme.textInputColor
            : calendarTheme.textInputFocusedColor
        }}
      >
        {children}
      </li>
    );
  }
}

SuggestionMenuitem.defaultProps = {};
SuggestionMenuitem.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  calendarTheme: PropTypes.object,
  selected: PropTypes.bool,
  disabled: PropTypes.bool
};

export default withHover(SuggestionMenuitem);
