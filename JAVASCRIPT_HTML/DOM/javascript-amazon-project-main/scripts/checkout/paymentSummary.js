import {cart,searchForProductInfo} from '../../data/cart.js';
import {getDeliveryPrice} from '../../data/deliveryOptions.js'

export function renderPaymentSummary(){
    //console.log("Payment Summary");
    const number_of_items = Object.keys(cart).map((key) => cart[key].quantity).reduce((acumulator, currentValue) => acumulator + currentValue);
    let prices = [];
    let deliveryPrices = [];

    cart.forEach((item) => {
        const value = parseFloat((searchForProductInfo(item.productId)[0].priceCents/100*item.quantity)).toFixed(2);
        prices.push(parseFloat(value));
        deliveryPrices.push(getDeliveryPrice(item.deliveryOptionId));
    })
    //console.log(deliveryPrices);
    const total_delivery_cost = ((deliveryPrices.reduce((acumulator,currentValue) => acumulator+currentValue))/100).toFixed(2)
    const total_item_value = prices.reduce((acumulator,currentValue) => acumulator+currentValue).toFixed(2);
    


    const payment_summary = `          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${number_of_items}):</div>
            <div class="payment-summary-money">$${total_item_value}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${total_delivery_cost}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

        const payment_summary_box = document.querySelector('.payment-summary');
        payment_summary_box.innerHTML = payment_summary;
}



document.addEventListener('DOMContentLoaded', (event) => {



})