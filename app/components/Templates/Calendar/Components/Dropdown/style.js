import { selectNone } from '../../Utils/styles';
import { getRGBColor } from '../../Utils';

export const getStyles = (calendarTheme, focus) => {
  return {
    icon: {
      color: calendarTheme.primary,
      userSelect: 'none',
      zIndex: -10
    },
    headerTitle: {
      fontWeight: 300,
      marginRight: '5px'
    },
    header: {
      fontWeight: 300,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      color: focus
        ? calendarTheme.selectFocusedLabelTextColor
        : getRGBColor(calendarTheme.selectLabelTextColor),
      outline: 'none'
    },
    root: {
      ...selectNone,
      position: 'relative',
      width: 100
      // backgroundColor: calendarTheme.modalBackgroundColor
    },
    list: {
      background: '#fff',
      zIndex: 100,
      position: 'absolute',
      width: '100%',
      border: '1px solid' + calendarTheme.selectFocusedBorderColor,
      padding: '0',
      maxHeight: '200px',
      overflowY: 'auto',
      overflowX: 'hidden',
      margin: '0',
      textAlign: 'start',
      marginTop: 5,
      WebKitOverflowScrolling: 'touch'
    },
    listItem: {
      width: '100%',
      padding: '10px 0',
      margin: '0',
      fontSize: 14,
      cursor: 'default',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      paddingLeft: 5,
      color: calendarTheme.selectItemColor,
      backgroundColor: calendarTheme.selectItemBackgroundColor
    }
  };
};
