class _NotificationManager {
  success(message, title, timeOut) {
    console.log(message, title);
    //TODO hkurra implement this using native snack bar on platform
  }

  error(message, title, timeOut) {
    console.log(message, title);
    //TODO hkurra implement this using native snack bar on platform
  }
}

export const NotificationManager = new _NotificationManager();
