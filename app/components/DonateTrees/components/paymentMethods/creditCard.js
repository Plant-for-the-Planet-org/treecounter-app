import axios from "axios";

export const handleCreditCardPayPress = async props => {
  try {
    // props.setToken(null);
    const params = {
      number: props.cardValues.number,
      expMonth: Number(props.cardValues.expMonth),
      expYear: Number(props.cardValues.expYear),
      cvc: props.cardValues.cvc,
      currency: props.currency_code
    };

    const token = await props.stripe
      .createTokenWithCard(params)
      .then(token => {
        // Create Donation API
        let loggedIn = props.currentUserProfile;
        let plantProject = props.context.projectDetails.plantProjectID;

        let newData = {
          amount: Number(props.totalPrice),
          currency: props.currency_code,
          recipientType: props.context.donorDetails.isCompany
            ? "company"
            : "individual",
          treeCount: Number(props.totalTreeCount),
          receiptIndividual: {
            firstname: props.context.donorDetails.firstname,
            lastname: props.context.donorDetails.lastname,
            email: props.context.donorDetails.email,
            address: props.context.donorDetails.address,
            zipCode: props.context.donorDetails.zipCode,
            city: props.context.donorDetails.city,
            country: props.context.donorDetails.country
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

                // This is the final Pay API
                props.donationPay(payData, donationID, loggedIn);
              })
              .catch(error => {
                console.log(error.response);
              });
          });
      })
      .catch(err => {
        console.log("Error", err);
      });
  } catch (error) {
    console.log("Error", error);
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
