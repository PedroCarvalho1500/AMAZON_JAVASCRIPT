import { cart, removeFromCart, saveToStorage, searchForProductWithinCart,removeContainerFromCart, updateCartProduct, removeFromCartFromCheckout } from '../../data/cart.js';
import { products } from '../../data/products.js';
import {formatCurrency} from '../utils/money.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { total_quantity } from '../amazon.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {renderPaymentSummary} from '../checkout/paymentSummary.js'
import {isSatSun} from '../checkout/dateDealing.js'
import {calculateDeliveryDate} from '../checkout/deliveryOption.js'

// const today_date = dayjs();
// const deliveryDate1 = today_date.add(7,"days").format('dddd, MMMM, D');
// const deliveryDate2 = today_date.add(3,"days").format('dddd, MMMM, D');
// const deliveryDate3 = today_date.add(1,"days").format('dddd, MMMM, D');


export function updateCartNumberCheckout() {
    const returnHomeLink = document.querySelector('.return-to-home-link')
    //console.log(returnHomeLink);
    if (cart.length > 0) {
        returnHomeLink.textContent = Object.keys(cart).map((key) => cart[key].quantity).reduce((acumulator, currentValue) => acumulator + currentValue);
    } else {
        //console.log("ELSE...")
        returnHomeLink.textContent = 0;
    }
}

export function setSaveInput(save_input, updateButton) {
    save_input.setAttribute('class', '');
    save_input.classList.add(`quantity-input-show`);
    save_input.classList.add(`quantity-input-${updateButton.dataset.productId}`);
    save_input.setAttribute('type', 'number');
    save_input.setAttribute('min', '0');
    save_input.setAttribute('max', '1000');
    save_input.classList.remove('hide');
}


export function setSaveButton(save_button, updateButton) {
    save_button.classList.add(`link-primary`);
    save_button.classList.add(`save-quantity-link-show-${updateButton.dataset.productId}`);
    save_button.innerText = `Save`;
    save_button.classList.remove('hide');
}





// export function deliveryOptionHTML(cart, order_div) {
//     const today_date = dayjs();
//     console.log(today_date.add(5,'days').format('MM D'));
//     console.log(today_date.add(1,'month').format('MM D'));
//     console.log(today_date.subtract(1,'month').format('MM D'));
//     console.log(today_date.add(3,'days').format('dddd'));
//     const date_to_function = dayjs();
//     isSatSun(date_to_function.add(4,'days'));
//     isSatSun(date_to_function.add(5,'days'));
//     isSatSun(date_to_function.add(6,'days'));

//     let delivery_options_html = ``;
//     deliveryOptions.forEach((delivery_option) => {
//         const priceString = delivery_option.priceCents === 0 ? `FREE Shipping` : `$${((delivery_option.priceCents) / 100).toFixed(2)}`
//         const delivery_date_day = today_date.add(delivery_option.deliveryDays, "days").format('dddd');
//         const delivery_date_month = today_date.add(delivery_option.deliveryDays, "days").format('MMMM');
//         const delivery_date_day_number = today_date.add(delivery_option.deliveryDays, "days").format('D');
//         const isChecked = delivery_option.id === cart.deliveryOptionId ? `checked` : ``;
//         //console.log(delivery_option.priceCents);
//         delivery_options_html += `
//     <div class="delivery-option">
//      <input type="radio" ${isChecked ? `checked` : ``} class="delivery-option-input-${cart.productId}" name="delivery-option-radio-${cart.productId}">
//      <div>
//        <div class="delivery-option-date">
//          ${delivery_date_day}, ${delivery_date_month} ${delivery_date_day_number}
//        </div>
//        <div class="delivery-option-price">
//          ${priceString} - Shipping
//        </div>
//      </div>
//    </div>`
//     });

    
//     return delivery_options_html;
//     //order_div.innerHTML += delivery_options_html;
// }


export function changeCurrentDeliveryAddress(radioBt, index, deliveryOptions, index_cart) {
    let deliveryOption = "";
    deliveryOptions.forEach((option => {
        //console.log(index_cart);
        if (parseInt(option.id) === parseInt(index) + 1) {
            deliveryOption = option;
        }
    }));
    const delivery_date = dayjs().add(deliveryOption.deliveryDays, "days");
    const dateString = delivery_date.format(`dddd, MMMM D`);
    //console.log(dateString);
    const new_delivery_address = document.querySelectorAll('.delivery-date')[index_cart].innerText = `Delivery date: ${dateString}`
    cart[index_cart].deliveryOptionId = String(index + 1);
    saveToStorage()
    renderPaymentSummary();
}

export function changeSaveInputClasses(save_input) {
    save_input.classList.remove('hide');
    save_input.classList.add('quantity-input-show');
}

export function organizeCart() {
    const today_date = dayjs();
    console.log(cart.length);
    cart.forEach((item, index) => 
    {
        const orders_grid = document.querySelector('.order-summary');
        const deliveryOptionId = cart[index].deliveryOptionId;
        let deliveryOption = "";
        deliveryOptions.forEach((option => {

            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        }));

        //console.log(`DELIVERY OPTION ${deliveryOption}`);
        const delivery_date = today_date.add(deliveryOption.deliveryDays, "days");
        const dateString = delivery_date.format(`dddd, MMMM D`)

        //console.log(deliveryDate1,deliveryDate2,deliveryDate3);
        // const orders_grid = document.querySelector('.order-summary');
        const product_added_to_cart = products.filter((product) => { if (product.id === cart[index].productId) { return true } else { false } })
        //console.log(product_added_to_cart)
        const order_div = document.createElement('div');
        order_div.className = `cart-item-container js-cart-item-container-${cart[index].productId}`
        order_div.innerHTML = `<div class="delivery-date">
        Delivery date: ${dateString}
        </div>
    
        <div class="cart-item-details-grid">
          <img class="product-image"
          src="${product_added_to_cart[0].image}">
        <div class="cart-item-details">
          <div class="product-name">
          ${product_added_to_cart[0].name}
          </div>
          <div class="product-price">
            $${(product_added_to_cart[0].priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity-${cart[index].productId}">
            <span class="quantity_value quantity-product-${cart[index].productId}">
              Quantity: ${cart[index].quantity} 
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${cart[index].productId}">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link-${cart[index].productId}" data-product-id="${cart[index].productId}">
              Delete
            </span>
          </div>
        </div>
    
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          ${calculateDeliveryDate(cart[index], order_div)}
        </div>

        
      </div>
      </div>`

        //const radioButtons = document.querySelectorAll(`.delivery-option-radio-${cart.productId}`);
        //console.log(radioButtons);

        if (total_quantity > 0) {
            document.querySelector('.return-to-home-link').textContent = total_quantity;
        }

        orders_grid.appendChild(order_div);
        const radioButtons = document.querySelectorAll(`.delivery-option-input-${cart[index].productId}`);
        //console.log(radioButtons);
        //const radioButtons = document.querySelectorAll(`input[name="delivery-option-radio-${cart[index].productId}"]`);
        radioButtons.forEach((radioBt, index_radio_bt) => {
            radioBt.addEventListener('click', () => {
                //console.log("CLICKED...");
                //console.log(cart);
                //console.log(cart[index].productId);
                changeCurrentDeliveryAddress(radioBt, index_radio_bt, deliveryOptions, index)
            })
        });
    });

    document.querySelectorAll('.delete-quantity-link').forEach((link, index) => {
        link.addEventListener('click', () => {
            removeContainerFromCart(link.dataset.productId);
            removeFromCartFromCheckout(link.dataset.productId);
            saveToStorage()
            updateCartNumberCheckout();
            cleanCart()
            renderPaymentSummary()
        });
    });


    const updateButtons = document.querySelectorAll('.js-update-link');

    updateButtons.forEach((updateButton) => 
    {
        updateButton.addEventListener('click', () => {
            //console.log("CLICKED...")
            const container = document.querySelector(`.js-cart-item-container-${updateButton.dataset.productId}`);
            const quantity_label = document.querySelector(`.quantity-product-${updateButton.dataset.productId}`);
            const productIdBeingUpdated = updateButton.dataset.productId;
            if ((document.querySelector(`.save-quantity-link-show-${updateButton.dataset.productId}`)) === null) {

                const save_input = document.createElement('input');
                const save_button = document.createElement('span');

                container.classList.add('is-editing-quantity');
                const quantity_grid = document.querySelector(`.product-quantity-${updateButton.dataset.productId}`);


                setSaveButton(save_button, updateButton);
                setSaveInput(save_input, updateButton)

                quantity_grid.appendChild(save_input);
                quantity_grid.appendChild(save_button);
                updateButton.classList.add('hide');
                const delete_button = document.querySelector(`.js-delete-link-${updateButton.dataset.productId}`);

                save_button.after(delete_button);
                const input_to_update = document.querySelector(`.quantity-input-${updateButton.dataset.productId}`);

                document.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') {
                        updateButton.classList.remove('hide');
                        save_button.classList.add('hide');
                        save_input.classList.add('hide');
                        save_input.classList.remove('quantity-input-show')
                        container.classList.remove('is-editing-quantity');
                        updateCartProduct(productIdBeingUpdated, save_input.value);
                        saveToStorage();
                        updateCartNumberCheckout();
                        renderPaymentSummary();
                        document.querySelector(`.quantity-product-${productIdBeingUpdated}`).innerText = `Quantity: ${save_input.value}`;
                    }
                });


                save_button.addEventListener('click', () => {
                    updateButton.classList.remove('hide');
                    save_button.classList.add('hide');
                    save_input.classList.add('hide');
                    save_input.classList.remove('quantity-input-show');
                    container.classList.remove('is-editing-quantity');
                    updateCartProduct(productIdBeingUpdated, save_input.value);
                    saveToStorage();
                    updateCartNumberCheckout();
                    renderPaymentSummary();
                    document.querySelector(`.quantity-product-${productIdBeingUpdated}`).innerText = `Quantity: ${save_input.value}`;
                });
            } else {
                const save_input = document.querySelector(`.quantity-input-${updateButton.dataset.productId}`);
                const save_button = document.querySelector(`.save-quantity-link-show-${updateButton.dataset.productId}`)
                changeSaveInputClasses(save_input);
                updateButton.classList.add('hide');
                const delete_button = document.querySelector(`.js-delete-link-${updateButton.dataset.productId}`);
                quantity_label.innerText = `Quantity: `;
                save_button.classList.remove('hide');
                container.classList.add('is-editing-quantity');
                updateCartProduct(productIdBeingUpdated, save_input.value);
                saveToStorage();
                updateCartNumberCheckout();
                document.querySelector(`.quantity-product-${productIdBeingUpdated}`).innerText = `Quantity: ${save_input.value}`;
            }

        })
    })

}


export function cleanCart(){
    const orders_grid = document.querySelector('.order-summary');
    orders_grid.innerHTML = ``
    organizeCart();
}


document.addEventListener('DOMContentLoaded', (event) => {

    if (event.target.title === "Checkout") {
        console.log(formatCurrency(2065));
        //console.log(deliveryDate.format('dddd, MMMM, YYYY'));
        updateCartNumberCheckout();
        //organizeCart();



    }
})