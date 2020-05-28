import axios from 'axios';

export const handleCreditCardPayPress = async props => {
  try {
    // props.setToken(null);
    const params = {
      number: props.cardValues.number,
      expMonth: Number(props.cardValues.expMonth),
      expYear: Number(props.cardValues.expYear),
      cvc: props.cardValues.cvc,
      currency: props.currency_code
    }

    const token = await props.stripe
      .createTokenWithCard(params)
      .then(token => {

        console.log('Token', token)

        // // Create Donation API
        // let loggedIn = props.currentUserProfile;
        // let plantProject = props.selectedProject.id;
        // let newData = {
        //   amount: Number(props.totalPrice),
        //   currency: props.currency_code,
        //   recipientType: 'individual',
        //   treeCount: Number(props.totalTreeCount),
        //   receiptIndividual: {
        //     firstname: token.card.name,
        //     lastname: token.card.name,
        //     email: 'a@b.com',
        //     address: token.card.addressLine1,
        //     zipCode: token.card.addressZip,
        //     city: token.card.addressCity,
        //     country: token.card.addressCountry
        //   }
        // };

        //   let donationType = props.context.contextType;
        //   props
        //     .createDonation(newData, plantProject, loggedIn, donationType)
        //     .then(response => {
        //       const donationID = response.data.donationId;
        //       const data = {
        //         type: 'card',
        //         card: { token: token.tokenId },
        //         key: 'pk_test_9L6XVwL1f0D903gMcdbjRabp00Zf7jYJuw'
        //       };

        //       const paymentMethod = axios
        //         .post(
        //           'https://api.stripe.com/v1/payment_methods',
        //           JSON_to_URLEncoded(data),
        //           {
        //             headers: {
        //               Authorization:
        //                 'Bearer sk_test_pvrGEhOIEu3HwYdLTMhqznnl00kFjZUvMD',
        //               'Content-Type':
        //                 'application/x-www-form-urlencoded; charset=UTF-8'
        //             }
        //           }
        //         )
        //         .then(response => {
        //           let payData = {
        //             paymentProviderRequest: {
        //               account: token.card.cardId,
        //               gateway: 'stripe',
        //               source: {
        //                 id: response.data.id,
        //                 object: response.data.object
        //               }
        //             }
        //           };

        //           // This is the final Pay API
        //           props.donationPay(payData, donationID, loggedIn);
        //         })
        //         .catch(error => {
        //           console.log(error.response);
        //         });
        //     });
      })
      .catch(err => {
        console.log('error gpay', err);
      });
    // props.setToken(token);
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


// Sample Token 

// {
//   card:{
//   "currency": "usd",
//   "country": "US",
//   "fingerprint": null,
//   "last4": "4242",
//   "addressCountry": null,
//   "addressZip": null,
//   "addressState": null,
//   "addressLine1": null,
//   "expMonth": 11,
//   "cvc": null,
//   "number": null,
//   "cardId": "card_1GnqX4C2focfHw90x7v9o3G1",
//   "funding": "credit",
//   "brand": "Visa",
//   "addressCity": null,
//   "addressLine2": null,
//   "name": null,
//   "expYear": 2024
// }
// created: 1590690766000
// livemode: false
// tokenId: "tok_1GnqX4C2focfHw9097HzTSIB"
// used: false
// }