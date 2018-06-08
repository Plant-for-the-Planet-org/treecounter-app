import i18next from 'i18next';
import menulabels from './en/menulabels';
import plantProjectlabels from './en/plantProjectlabels';
import registerTreeslabels from './en/registerTreeslabels';
import signUplabels from './en/signUplabels';
import signUpSuccessfullabels from './en/signUpSuccessfullabels';
import targetlabels from './en/targetlabels';
import tpoProjectlabels from './en/tpoProjectlabels';
import treecounterGraphicslabels from './en/treecounterGraphicslabels';
import userContributionslabels from './en/userContributionslabels';
import headerlabels from './en/headerlabels';
import loginlabels from './en/loginlabels';
import activateAccountlabels from './en/activateAccountlabels';
import commonlabels from './en/commonlabels';
import donateTreeslabels from './en/donateTreeslabels';
import emailSentlabels from './en/emailSentlabels';
import faqlabels from './en/faqlabels';
import forgotPasswordlabels from './en/forgotPasswordlabels';
import giftTreeslabels from './en/giftTreeslabels';
import paymentlabels from './en/paymentlabels';

i18next.init({
  interpolation: {
    // React already does escaping
    escapeValue: false
  },
  // Add language detector later
  lng: 'en', // 'en' | 'es'

  // Using simple hardcoded resources for simple example
  resources: {
    en: {
      translation: {
        label: {
          ...loginlabels,
          ...headerlabels,
          ...menulabels,
          ...plantProjectlabels,
          ...registerTreeslabels,
          ...signUplabels,
          ...signUpSuccessfullabels,
          ...targetlabels,
          ...tpoProjectlabels,
          ...treecounterGraphicslabels,
          ...userContributionslabels,
          ...activateAccountlabels,
          ...commonlabels,
          ...donateTreeslabels,
          ...emailSentlabels,
          ...faqlabels,
          ...forgotPasswordlabels,
          ...giftTreeslabels,
          ...paymentlabels
        }
      }
    }
  }
});

export default i18next;
