import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {isSatSun,nextDayNoWeekend} from '../checkout/dateDealing.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';

export function calculateDeliveryDate(cart, order_div) {
    const today_date = dayjs();
    //console.log(today_date.add(5,'days').format('MM D'));
    //console.log(today_date.add(1,'month').format('MM D'));
    //console.log(today_date.subtract(1,'month').format('MM D'));
    //console.log(today_date.add(3,'days').format('dddd'));
    const date_to_function = dayjs();
    //isSatSun(date_to_function.add(4,'days'));
    //isSatSun(date_to_function.add(5,'days'));
    //isSatSun(date_to_function.add(6,'days'));

    let delivery_options_html = ``;
    deliveryOptions.forEach((delivery_option) => {
        const priceString = delivery_option.priceCents === 0 ? `FREE Shipping` : `$${((delivery_option.priceCents) / 100).toFixed(2)}`
        const delivery_date_day = nextDayNoWeekend(today_date,delivery_option.deliveryDays);
        const delivery_date_month = today_date.add(delivery_option.deliveryDays, "days").format('MMMM');
        const delivery_date_day_number = today_date.add(delivery_option.deliveryDays, "days").format('D');
        const isChecked = delivery_option.id === cart.deliveryOptionId ? `checked` : ``;
        //console.log(delivery_option.priceCents);
        delivery_options_html += `
    <div class="delivery-option">
     <input type="radio" ${isChecked ? `checked` : ``} class="delivery-option-input-${cart.productId}" name="delivery-option-radio-${cart.productId}">
     <div>
       <div class="delivery-option-date">
         ${delivery_date_day}, ${delivery_date_month} ${delivery_date_day_number}
       </div>
       <div class="delivery-option-price-${cart.productId}">
         ${priceString} - Shipping
       </div>
     </div>
   </div>`
    });

    
    return delivery_options_html;
    //order_div.innerHTML += delivery_options_html;
}