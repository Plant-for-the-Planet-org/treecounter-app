import Toast from 'react-native-root-toast';

const getToastConfig = function(timeout) {
  return {
    duration: timeout ? timeout : Toast.durations.LONG,
    position: 80,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0
  };
};
class _NotificationManager {
  success(message, title, timeOut) {
    console.log(message, title);
    Toast.show(title + (message ? '\n ' + message : ''), {
      ...getToastConfig(timeOut),
      backgroundColor: 'rgba(90, 159, 70, 1)'
    });
  }

  error(message, title, timeOut) {
    console.log(message, title);
    Toast.show(title + (message ? '\n ' + message : ''), {
      ...getToastConfig(timeOut),
      backgroundColor: 'rgba(171, 51, 50, 1)'
    });
  }
}

export const NotificationManager = new _NotificationManager();
