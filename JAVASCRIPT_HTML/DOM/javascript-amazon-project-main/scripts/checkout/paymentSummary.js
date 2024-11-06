import {cart,searchForProductInfo} from '../../data/cart.js';
import {getDeliveryPrice} from '../../data/deliveryOptions.js'


export function renderPaymentSummaryOO(cart){
    
  const number_of_items = cart.cartItems.length === 0 ? 0 : Object.keys(cart.cartItems).map((key) => cart.cartItems[key].quantity).reduce((acumulator, currentValue) => acumulator + currentValue);
  let prices = [];
  let deliveryPrices = [];
  

  cart.cartItems.forEach((item) => {
      const value = parseFloat((searchForProductInfo(item.productId)[0].priceCents/100*item.quantity)).toFixed(2);
      prices.push(parseFloat(value));
      deliveryPrices.push(getDeliveryPrice(item.deliveryOptionId));
  })
  //console.log(deliveryPrices);
  const total_delivery_cost = cart.cartItems.length === 0 ? 0 :((deliveryPrices.reduce((acumulator,currentValue) => acumulator+currentValue))/100).toFixed(2)
  const total_item_value = cart.cartItems.length === 0 ? 0 : prices.reduce((acumulator,currentValue) => acumulator+currentValue).toFixed(2);
  const total_price = cart.cartItems.length === 0 ? 0 : parseFloat(parseFloat(total_delivery_cost) + parseFloat(total_item_value)).toFixed(2);
  
  const taxes = ((total_price*10)/100).toFixed(2);
  //console.log(taxes);

  const payment_summary = `          <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${number_of_items}):</div>
          <div class="payment-summary-money">$${total_item_value}</div>
        </div>

        <div class="payment-summary-row shipping-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${total_delivery_cost}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${total_price}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${taxes}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(parseFloat(total_price)+parseFloat(taxes)).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`;

      const payment_summary_box = document.querySelector('.payment-summary');
      payment_summary_box.innerHTML = payment_summary;
}


export function renderPaymentSummary(){
    
    const number_of_items = cart.length === 0 ? 0 : Object.keys(cart).map((key) => cart[key].quantity).reduce((acumulator, currentValue) => acumulator + currentValue);
    let prices = [];
    let deliveryPrices = [];
    

    cart.forEach((item) => {
        const value = parseFloat((searchForProductInfo(item.productId)[0].priceCents/100*item.quantity)).toFixed(2);
        prices.push(parseFloat(value));
        deliveryPrices.push(getDeliveryPrice(item.deliveryOptionId));
    })
    //console.log(deliveryPrices);
    const total_delivery_cost = cart.length === 0 ? 0 :((deliveryPrices.reduce((acumulator,currentValue) => acumulator+currentValue))/100).toFixed(2)
    const total_item_value = cart.length === 0 ? 0 : prices.reduce((acumulator,currentValue) => acumulator+currentValue).toFixed(2);
    const total_price = cart.length === 0 ? 0 : parseFloat(parseFloat(total_delivery_cost) + parseFloat(total_item_value)).toFixed(2);
    
    const taxes = ((total_price*10)/100).toFixed(2);
    //console.log(taxes);

    const payment_summary = `          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${number_of_items}):</div>
            <div class="payment-summary-money">$${total_item_value}</div>
          </div>

          <div class="payment-summary-row shipping-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${total_delivery_cost}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${total_price}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxes}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(parseFloat(total_price)+parseFloat(taxes)).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

        const payment_summary_box = document.querySelector('.payment-summary');
        payment_summary_box.innerHTML = payment_summary;
}



document.addEventListener('DOMContentLoaded', (event) => {
  if (event.target.title === "Checkout")
  {

  }


})