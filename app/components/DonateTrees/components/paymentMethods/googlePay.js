import axios from 'axios';

export const handleAndroidPayPress = async (props) => {
    try {
        props.setToken(null)

        const token = await props.stripe.paymentRequestWithNativePay({
            total_price: props.totalPrice,
            currency_code: props.currency_code,
            billing_address_required: true,
            phone_number_required: true,
            line_items: [{
                currency_code: props.currency_code,
                description: 'Donation to Plant for the Planet',
                total_price: props.totalPrice,
                unit_price: props.amountPerTree,
                quantity: props.totalTreeCount,
            }],
        }).then(
            token => {
                console.log('Token from GPAY --- ', token)
                const data = {
                    type: 'card',
                    card: { token: token.tokenId },
                    key: 'pk_test_9L6XVwL1f0D903gMcdbjRabp00Zf7jYJuw',
                }
                console.log('Data', data)
                const paymentMethod = axios.post('https://api.stripe.com/v1/payment_methods', JSON_to_URLEncoded(data), {
                    headers: {
                        Authorization: 'Bearer sk_test_pvrGEhOIEu3HwYdLTMhqznnl00kFjZUvMD',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(response => {
                    console.log('Payment Method', response) // Send this payment method to the backend to make the payment
                })
                    .catch(error => {
                        console.log(error.response)
                    });
            }
        ).catch(err => {
            console.log('error gpay', err)
        })
        props.setToken(token)
    } catch (error) {
        console.log('Error', error)
    }
}

function JSON_to_URLEncoded(element, key, list) {
    var list = list || [];
    if (typeof (element) == 'object') {
        for (var idx in element)
            JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
    } else {
        list.push(key + '=' + encodeURIComponent(element));
    }
    return list.join('&');
}