import axios from "axios";
import { updateStaticRoute } from "../../../../helpers/routerHelper";

export const handleNativePayPress = async props => {
  let isCredit = props.isCredit;
  let isApplePay = props.isApplePay;
  let applePayComplete;

  let request = isCredit
    ? props.stripe.createTokenWithCard({
        number: props.cardValues.number,
        expMonth: Number(props.cardValues.expMonth),
        expYear: Number(props.cardValues.expYear),
        cvc: props.cardValues.cvc,
        currency: props.currency_code
      })
    : isApplePay
    ? props.stripe.paymentRequestWithNativePay(
        {
          requiredBillingAddressFields: ["all"],
          requiredShippingAddressFields: ["email"],
          currencyCode: props.currency_code
        },
        [
          {
            label: "Donation to Plant for the Planet",
            amount: props.totalPrice
          }
        ]
      )
    : props.stripe.paymentRequestWithNativePay({
        total_price: props.totalPrice,
        currency_code: props.currency_code,
        billing_address_required: true,
        email_required: true,
        // phone_number_required: true,
        line_items: [
          {
            currency_code: props.currency_code,
            description: "Donation to Plant for the Planet",
            total_price: props.totalPrice,
            unit_price: props.amountPerTree,
            quantity: props.totalTreeCount
          }
        ]
      });

  console.log("Request", request);
  try {
    const token = await request
      .then(token => {
        props.setLoading(true);
        let loggedIn = props.currentUserProfile;
        let plantProject = props.selectedProject.id;

        let createDonationData = {
          amount: Number(props.totalPrice),
          currency: props.currency_code,
          recipientType:
            isCredit && props.context.donorDetails.isCompany
              ? "company"
              : "individual",
          treeCount: Number(props.totalTreeCount),
          receiptIndividual: {
            firstname: isCredit
              ? props.context.donorDetails.firstname
              : token.card.name,
            lastname: isCredit
              ? props.context.donorDetails.lastname
              : token.card.name,
            email: isCredit
              ? props.context.donorDetails.email
              : token.extra.shippingContact.emailAddress,
            address: isCredit
              ? props.context.donorDetails.address
              : token.card.addressLine1,
            zipCode: isCredit
              ? props.context.donorDetails.zipCode
              : token.card.addressZip,
            city: isCredit
              ? props.context.donorDetails.city
              : token.card.addressCity,
            country: isCredit
              ? props.context.donorDetails.country
              : token.card.addressCountry
          }
        };

        let donationType = props.context.contextType;
        props
          .createDonation(
            createDonationData,
            plantProject,
            loggedIn,
            donationType
          )
          .then(response => {
            const donationID = response.data.donationId;

            const data = {
              type: "card",
              card: { token: token.tokenId },
              key:
                props.paymentSetup.gateways[props.selectedTaxCountry].stripe
                  .stripePublishableKey
            };

            const paymentMethod = axios
              .post(
                "https://api.stripe.com/v1/payment_methods",
                JSON_to_URLEncoded(data),
                {
                  headers: {
                    Authorization: `Bearer ${
                      props.paymentSetup.gateways[props.selectedTaxCountry]
                        .stripe.stripePublishableKey
                    }`,
                    "Content-Type":
                      "application/x-www-form-urlencoded; charset=UTF-8"
                  }
                }
              )
              .then(response => {
                let payData = {
                  paymentProviderRequest: {
                    account:
                      props.paymentSetup.gateways[props.selectedTaxCountry]
                        .stripe.account,
                    gateway: "stripe",
                    source: {
                      id: response.data.id,
                      object: response.data.object
                    }
                  }
                };

                props.donationPay(payData, donationID, loggedIn).then(res => {
                  if (isApplePay) {
                    applePayComplete = true;
                    if (applePayComplete) {
                      props.stripe.completeNativePayRequest();
                      props.setApplePayStatus("Apple Pay payment completed");
                    } else {
                      props.stripe.cancelNativePayRequest();
                      props.setApplePayStatus("Apple Pay payment cancelled");
                    }
                  } else {
                    props.setLoading(false);
                  }

                  updateStaticRoute("donate_thankyou", props.navigation, {
                    treeCount: props.totalTreeCount,
                    plantedBy: props.selectedProject.name,
                    navigation: props.navigation
                  });
                });
              })
              .catch(error => {
                console.log(error.response);
              });
          });
      })
      .catch(error => {
        // Error handling for token creation fail case
        console.log(error);
      });
  } catch (error) {
    if (isApplePay) {
      props.setApplePayStatus
        ? props.setApplePayStatus(`Error: ${error.message}`)
        : null;
    }
    // Error handling for token creation fail case
    console.log("Error", error.message);
  }
};

function JSON_to_URLEncoded(element, key, list) {
  var list = list || [];
  if (typeof element == "object") {
    for (let idx in element)
      JSON_to_URLEncoded(element[idx], key ? key + "[" + idx + "]" : idx, list);
  } else {
    list.push(key + "=" + encodeURIComponent(element));
  }
  return list.join("&");
}
