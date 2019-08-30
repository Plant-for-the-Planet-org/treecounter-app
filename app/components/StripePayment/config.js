import { context } from '../../config/index';

const config = {
  baseURL: 'https://' + context.host,
  paymentIntentConfirm: '/app_dev.php/public/v1.3/stripe/paymentIntent/confirm',
  requestPaymentIntentUrl:
    '/app_dev.php/public/v1.3/stripe/paymentIntent/request',
  attachPaymentUrl:
    '/app_dev.php/api/v1.3/en/stripe/customer/paymentMethod/attach',
  fetchCardUrl: '/api/v1.0/en/stripe/customer'
};

export default config;
