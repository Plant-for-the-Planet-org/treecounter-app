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
export class NotificationManager {
  static success(message, title, timeOut) {
    //debug(message, title);
    Toast.show(title + (message ? '\n ' + message : ''), {
      ...getToastConfig(timeOut),
      backgroundColor: 'rgba(90, 159, 70, 1)'
    });
  }

  static error(message, title, timeOut) {
    //debug(message, title);
    Toast.show(title + (message ? '\n ' + message : ''), {
      ...getToastConfig(timeOut),
      backgroundColor: 'rgba(171, 51, 50, 1)'
    });
  }
}
