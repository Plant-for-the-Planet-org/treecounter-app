export const getStyles = (calendarTheme, suggestions, isSingleMode) => {
  return {
    arrowDown: {
      color: calendarTheme.primary
    },
    month: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '18px'
    },
    grid: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 5,
      width: '100%'
    },
    // width: !suggestions && !isSingleMode ? "358px" : "326px",
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      outline: 'none',
      width: !isSingleMode && suggestions ? '65%' : '100%',
      padding: '23px',
      boxSizing: 'border-box'
    }
  };
};
