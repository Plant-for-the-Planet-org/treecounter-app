import { context } from '../../config/index';

const config = {
  baseURL: 'https://' + context.host,
  paymentIntentConfirm: '/app_dev.php/public/v1.3/stripe/paymentIntent/confirm',
  requestPaymentIntentUrl:
    '/app_dev.php/public/v1.3/stripe/paymentIntent/request',
  attachPaymentUrl:
    '/app_dev.php/api/v1.3/en/stripe/customer/paymentMethod/attach',
  fetchCardUrl: '/api/v1.0/en/stripe/customer',
  headerConfig: {
    headers: {
      Authorization:
        'Bearer ' +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjY5MTU1MDQsImV4cCI6MTU2NjkxOTEwNCwicm9sZXMiOlsiUk9MRV9UUkVFRE9OT1IiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0UHJvZEBvbmV6ZXJvZWlnaHQuY28ifQ.PcYp0UWaJrzMvXabHKmMhvp9OZNsnVl1rH080VkC9BBRKEZQGNl7er7NtdcudzkrCMdpR03Fk8xXC_rrBe4G3iKHjfxgzLr4B351jonMtyvJJQv8hFercN-1LqSUDm6X3sblarzvB5r5Y7bNN67umpN4Hl2Qh7L7yMWvDVuxDM4P6WjP0WZGch8S3Ot47YWhZlhrqVwWBMTx3ehF1XytgMV2Yr5H-w_nNWReVDY0HHF6BANOVAkGTAsbqYjAxMFjvCVr6L2vz5hDh1pK8dJJ4aeH8oP9JcMa4AyPNTDdgIcef021-K1iTWRW8d8o162FxOhqB5jn0JdYnEYYLQQIaVm-lZ_aK7Lre5pr35vXe8DxLvnzwsaYql00hBsQHnaTYzIgxasCLDbRB_SFVRBipCijN1Q156VFicnsXRkFLBaWUrLM-uPqA4qJVWr9AMvxR46diQ6GqiVPsl-ozpiaQxtmRSGVFkcglb55BAwhoYnSTLDHTSVu052M6uhqb59YnpBIgv4nx8S8xeHIu8TS64fQNCk3J5Y4VFo6IP2JtzZy5TBTe01y4VSEQj2jXbYtj-u6-0GpH-Kx2A9eYnKdOcyag6wMJw_2DmAapqH813HWcXjXWePXqZM05z9sBZZCQoIX_IKh0yc6jk9GbO9FCwkUN2gA5MtY8XKhmW3s_Lc'
    }
  }
};

export default config;
