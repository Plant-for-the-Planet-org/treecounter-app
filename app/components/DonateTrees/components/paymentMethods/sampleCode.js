const handleAndroidPayPress = async props => {
  try {
    setToken(null);

    const token = await stripe
      .paymentRequestWithNativePay({
        total_price: props.totalPrice,
        currency_code: props.currency_code,
        billing_address_required: true,
        phone_number_required: true,
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
        const data = {
          type: 'card',
          card: { token: token.tokenId },
          key: 'pk_test_9L6XVwL1f0D903gMcdbjRabp00Zf7jYJuw'
        };

        function JSON_to_URLEncoded(element, key, list) {
          var list = list || [];
          if (typeof element == 'object') {
            for (let idx in element)
              JSON_to_URLEncoded(
                element[idx],
                key ? key + '[' + idx + ']' : idx,
                list
              );
          } else {
            list.push(key + '=' + encodeURIComponent(element));
          }
          return list.join('&');
        }

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
            try {
              const response = axios
                .post(
                  'https://stripe-ex-backend.herokuapp.com/create_intent',
                  JSON_to_URLEncoded({
                    amount: 2000,
                    currency: 'usd',
                    confirmationMethod: 'manual',
                    confirm: false,
                    payment_method: paymentMethod
                  }),
                  {
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    }
                  }
                )
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.log(error.response);
                });
            } catch (e) {
              console.log('Payment Intent Error', e);
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      })
      .catch(err => {
        console.log('error gpay', err);
      });
    setToken(token);
  } catch (error) {
    console.log('Error', error);
  }
};

const handleApplePayPress = async props => {
  try {
    setApplePayStatus('');
    setToken(null);
    const token = await stripe.paymentRequestWithNativePay(
      {
        requiredBillingAddressFields: ['all'],
        currencyCode: props.currency_code
      },
      [
        {
          label: 'Donation to Plant for the Planet',
          amount: props.totalPrice
        }
      ]
    );

    setToken(token);

    const data = {
      type: 'card',
      card: { token: token.tokenId },
      key: 'pk_test_9L6XVwL1f0D903gMcdbjRabp00Zf7jYJuw'
    };

    function JSON_to_URLEncoded(element, key, list) {
      var list = list || [];
      if (typeof element == 'object') {
        for (let idx in element)
          JSON_to_URLEncoded(
            element[idx],
            key ? key + '[' + idx + ']' : idx,
            list
          );
      } else {
        list.push(key + '=' + encodeURIComponent(element));
      }
      return list.join('&');
    }

    const paymentMethod = axios
      .post(
        'https://api.stripe.com/v1/payment_methods',
        JSON_to_URLEncoded(data),
        {
          headers: {
            Authorization: 'Bearer sk_test_pvrGEhOIEu3HwYdLTMhqznnl00kFjZUvMD',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }
      )
      .then(response => {
        try {
          const response = axios
            .post(
              'https://stripe-ex-backend.herokuapp.com/create_intent',
              JSON_to_URLEncoded({
                amount: 2000,
                currency: 'usd',
                confirmationMethod: 'manual',
                confirm: false,
                payment_method: paymentMethod
              }),
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              }
            )
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error.response);
            });
        } catch (e) {
          console.log('Payment Intent Error', e);
        }
      })
      .catch(error => {
        console.log(error.response);
      });

    if (applePayComplete) {
      await stripe.completeNativePayRequest();
      setApplePayStatus('Apple Pay payment completed');
    } else {
      await stripe.cancelNativePayRequest();
      setApplePayStatus('Apple Pay payment cenceled');
    }
  } catch (error) {
    setApplePayStatus(`Error: ${error.message}`);
    console.log('Error', error.message);
  }
};
