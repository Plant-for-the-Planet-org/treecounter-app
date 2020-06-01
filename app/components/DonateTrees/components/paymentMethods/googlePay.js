import axios from 'axios';

export const handleAndroidPayPress = async props => {
  try {
    props.setToken(null);

    const token = await props.stripe
      .paymentRequestWithNativePay({
        total_price: props.totalPrice,
        currency_code: props.currency_code,
        billing_address_required: true,
        email_required: true,
        // phone_number_required: true,
        line_items: [
          {
            currency_code: props.currency_code,
            description: 'Donation to Plant for the Planet',
            total_price: props.totalPrice,
            unit_price: props.amountPerTree,
            quantity: props.totalTreeCount
          }
        ]
      })
      .then(token => {
        // Create Donation API
        console.log('Token', token)
        let loggedIn = props.currentUserProfile;
        let plantProject = props.selectedProject.id;
        let newData = {
          amount: Number(props.totalPrice),
          currency: props.currency_code,
          recipientType: 'individual',
          treeCount: Number(props.totalTreeCount),
          receiptIndividual: {
            firstname: token.card.name,
            lastname: token.card.name,
            email: token.extra.billingContact.emailAddress,
            address: token.card.addressLine1,
            zipCode: token.card.addressZip,
            city: token.card.addressCity,
            country: token.card.addressCountry
          }
        };

        let donationType = props.context.contextType;
        props
          .createDonation(newData, plantProject, loggedIn, donationType)
          .then(response => {
            const donationID = response.data.donationId;
            const data = {
              type: 'card',
              card: { token: token.tokenId },
              key: props.paymentSetup.accounts.de.gateways.stripe.authorization.stripePublishableKey
            };

            const paymentMethod = axios
              .post(
                'https://api.stripe.com/v1/payment_methods',
                JSON_to_URLEncoded(data),
                {
                  headers: {
                    Authorization:
                      'Bearer sk_test_pvrGEhOIEu3HwYdLTMhqznnl00kFjZUvMD',
                    'Content-Type':
                      'application/x-www-form-urlencoded; charset=UTF-8'
                  }
                }
              )
              .then(response => {

                console.log('Response', response)
                let payData = {
                  paymentProviderRequest: {
                    account: props.paymentSetup.accounts.de.gateways.stripe.authorization.accountId,
                    gateway: 'stripe',
                    source: {
                      id: response.data.id,
                      object: response.data.object
                    }
                  }
                };

                // This is the final Pay API
                props.donationPay(payData, donationID, loggedIn);
              })
              .catch(error => {
                console.log(error.response);
              });
          });
      })
      .catch(err => {
        console.log('error gpay', err);
      });
    props.setToken(token);
  } catch (error) {
    console.log('Error', error);
  }
};

function JSON_to_URLEncoded(element, key, list) {
  var list = list || [];
  if (typeof element == 'object') {
    for (let idx in element)
      JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
  } else {
    list.push(key + '=' + encodeURIComponent(element));
  }
  return list.join('&');
}
