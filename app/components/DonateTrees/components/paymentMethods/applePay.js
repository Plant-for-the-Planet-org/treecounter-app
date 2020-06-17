import axios from "axios";
import React from "react";
import { updateStaticRoute } from "../../../../helpers/routerHelper";

export const handleApplePayPress = async props => {
  let applePayComplete;
  try {
    props.setApplePayStatus("");
    const token = await props.stripe
      .paymentRequestWithNativePay(
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
      .then(token => {
        let loggedIn = props.currentUserProfile;
        let plantProject = props.selectedProject.id;
        // console.log("Token", token);
        let newData = {
          amount: Number(props.totalPrice),
          currency: props.currency_code,
          recipientType: "individual",
          treeCount: Number(props.totalTreeCount),
          receiptIndividual: {
            firstname: token.card.name,
            lastname: token.card.name,
            email: token.extra.shippingContact.emailAddress,
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
                // console.log("Response", response);
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
                  applePayComplete = true;
                  props.setLoading(false);

                  if (applePayComplete) {
                    props.stripe.completeNativePayRequest();
                    props.setApplePayStatus("Apple Pay payment completed");
                    updateStaticRoute("donate_thankyou", props.navigation, {
                      treeCount: props.totalTreeCount,
                      plantedBy: props.selectedProject.name,
                      navigation: props.navigation
                    });
                  } else {
                    props.stripe.cancelNativePayRequest();
                    props.setApplePayStatus("Apple Pay payment cancelled");
                  }
                });
              })
              .catch(error => {
                console.log(error.response);
              });
          });
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    props.setApplePayStatus(`Error: ${error.message}`);
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
