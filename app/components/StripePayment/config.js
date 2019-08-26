import { context } from '../../config/index';

const config = {
  baseURL: 'https://' + context.host,
  paymentIntentConfirm: '/app_dev.php/public/v1.3/stripe/paymentIntent/confirm',
  requestPaymentIntentUrl:
    '/app_dev.php/public/v1.3/stripe/paymentIntent/request',
  attachPaymentUrl:
    '/app_dev.php/api/v1.3/en/stripe/customer/paymentMethod/attach',
  fetchCardUrl: '/api/v1.0/en/stripe/customer',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjY4MjU4MTEsImV4cCI6MTU2NjgyOTQxMSwicm9sZXMiOlsiUk9MRV9UUkVFRE9OT1IiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0UHJvZEBvbmV6ZXJvZWlnaHQuY28ifQ.qQqwUj88233mLj03rdaUELdjiXWNAFn4FCghWmYC5TlJ6gc5_3uCIsts_xeDmkH4XlUvwZsi-cSLoJ1ptHuibbjli4nwOg8JCqKq3qYBiDgqqTmYBjUargxWmHRKsIQBWO8vuwCJBhPYJCnwBAHhrTnNK8EpIpbBVkLZ-RIX0yoYPPVp6Dtut8bC-EfKtoF2LdW_gQhKJUQTZlWxSxOXQD28KEyn4cpqNcRwKrKrqrnXJ01S3XK86wr8m7YkxiJCc3fyes2yGXHnst8XNWroLBtsziBsttex892cREKRIoPKAnQXQeDv5XtR2TzAw-_oK3jlvRCv_CyBZ_omms5aylQXX6r1yntPBeAeiDVT1446Be4qCTkMGMpPOesXTyw9E4fTVRlSBh54mFAIBSIP1qXJq_B50avmPd0uRz0O5sQo2nHzUvr5xykE0XD4pF7rwfwOcvUabREzqFXwOkgS90whAqv25srqO71hiMa0wjaryd_M3zOKGeeWm8KBawvwbaMvF1GzrW97AjeXX0aK3xl5Yku3zUaAy7py2nLF1OITsuSXVthPjWYosZs95ivS-eNVMLprSG2hQvLVivsaTwZjbSpGfoOCgCRT9O956n5dPvJ1OWbTBE1zqArD0OsA62Xm8HHhGmT7yYGkb-c8eUpi2Kts0muhtRuxOHiquRo'
};

export default config;
