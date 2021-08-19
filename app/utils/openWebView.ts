import { Alert, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

/**
 * Opens the url inside the app, if in app browser is not available then opens the link in browser
 *
 * @param {string} link - link to be opened in web view
 */
const openWebView = async (link: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(link, {
        // iOS Properties
        animated: true,
        modalPresentationStyle: 'fullScreen',
        enableBarCollapsing: true,
        // Android Properties
        enableUrlBarHiding: true,
        enableDefaultShare: true,
      });
    } else Linking.openURL(link);
  } catch (error) {
    console.error(error);
    Alert.alert(error.message);
  }
};

export default openWebView;
