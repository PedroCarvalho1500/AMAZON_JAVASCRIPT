import {orders} from '../data/orders.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { products_from_backend,loadProducts } from '../data/products.js'
import {addProductToCart} from '../data/cart.js';
import {updateCartNumber} from './amazon.js'

//console.log(orders[0].orderTime);
//const current_date = dayjs(orders[0].orderTime);
//console.log(current_date.format('MMMM'));
//console.log(current_date.format('D'));
export function organizeOrders(){
    const order_container = document.querySelector(`.order-container`);

    
    orders.forEach(async (order,index) => 
    {
        const new_order_header = document.createElement(`div`);
        new_order_header.classList.add(`order-header`);
        order_container.appendChild(new_order_header);
        const new_order_header_element = document.querySelectorAll(`.order-header`)[index];

        const new_order_header_left = document.createElement(`div`);
        new_order_header_left.classList.add(`order-header-left-section-${order.orderId}`);
        new_order_header_element.appendChild(new_order_header_left);

        const current_date = dayjs(order.orderTime);
        const new_order_date = document.createElement(`div`);
        new_order_date.classList.add(`order-date--${order.orderId}`);
        const order_header_label_html = `
        <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${current_date.format('MMMM')} ${current_date.format('D')}</div>
        </div>
        `
        new_order_date.innerHTML = order_header_label_html;
        document.querySelectorAll(`.order-header-left-section-${order.orderId}`)[0].appendChild(new_order_date);


        const new_order_header_left_2 = document.createElement(`div`);
        new_order_header_left_2.classList.add(`order-header-left-section-${order.orderId}`);
        new_order_header_element.appendChild(new_order_header_left_2);
        const new_order_total= document.createElement(`div`);
        new_order_date.classList.add(`order-total`);
        const order_total_label_html = `
        <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${(order.totalCostCents/100).toFixed(2)}</div>
        </div>
        `
        new_order_total.innerHTML = order_total_label_html;
        document.querySelectorAll(`.order-header-left-section-${order.orderId}`)[1].appendChild(new_order_total);


        const new_order_header_right = document.createElement(`div`);
        new_order_header_right.classList.add(`order-header-right-section-${order.orderId}`);
        new_order_header_element.appendChild(new_order_header_right);
        const new_order_header_right_div= document.createElement(`div`);
        const order_total_label_html_3 = `
        <div class="order-total">
            <div class="order-header-label">Order ID:</div>
            <div>${order.orderId}</div>
        </div>
        `
        new_order_header_right_div.innerHTML = order_total_label_html_3;
        document.querySelectorAll(`.order-header-right-section-${order.orderId}`)[0].appendChild(new_order_header_right_div);


        const new_order_details_grid = document.createElement(`div`);
        new_order_details_grid.classList.add(`order-details-grid`);
        order_container.appendChild(new_order_details_grid);

        const all_products = await loadProducts();
        const order_products = order.products
        order_products.forEach((product,index2) => {
            //console.log(product.productId);
            
            const new_product_image_container = document.createElement(`div`);
            new_product_image_container.classList.add(`product-image-container`);
            new_product_image_container.classList.add(`container-image-${order.orderId}`);
            
            const product_now = all_products.filter((current_product) => {
                if(current_product.id === product.productId){
                     return true
                    } 
                else {
                    return false
                }
            });
            //console.log(product_now[0]);
            const new_img = document.createElement(`img`);
            new_img.setAttribute('src',product_now[0].image);

            const new_product_details = document.createElement(`div`);
            new_product_details.classList.add(`product-details`);
            new_product_details.classList.add(`product-${index2}-${order.orderId}`);
            const product_name = document.createElement(`div`);
            product_name.classList.add(`product-name`);
            product_name.innerText = `${product_now[0].name}`
            const product_delivery = document.createElement(`div`);
            product_delivery.classList.add(`product-delivery-date`);
            product_delivery.innerText = `Arriving on:  ${dayjs(orders[index].products[index2].estimatedDeliveryTime).format('MMMM')} ${dayjs(orders[index].products[index2].estimatedDeliveryTime).format('D')} `
            const product_quantity = document.createElement(`div`);
            product_quantity.classList.add(`product-quantity`);
            product_quantity.innerText = `Quantity: ${orders[index].products[index2].quantity}`;
            

            document.querySelectorAll(`.order-details-grid`)[index].appendChild(new_product_image_container);
            document.querySelectorAll(`.container-image-${order.orderId}`)[index2].appendChild(new_img);
            document.querySelectorAll(`.order-details-grid`)[index].appendChild(new_product_details);
            document.querySelector(`.product-${index2}-${order.orderId}`).appendChild(product_name);
            document.querySelector(`.product-${index2}-${order.orderId}`).appendChild(product_delivery);
            document.querySelector(`.product-${index2}-${order.orderId}`).appendChild(product_quantity);

            const new_buy_it_again_bt_html = `<button class="buy-again-button button-primary data-orderproduct-id="${orders[index]}${product_now[0].productId}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>`;

            const track_button_html = `<div class="product-actions">
              <a href="tracking.html?orderId=${orders[index].orderId}&amp;productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`

            document.querySelector(`.product-${index2}-${order.orderId}`).innerHTML+=new_buy_it_again_bt_html;
            document.querySelectorAll(`.order-details-grid`)[index].innerHTML+=track_button_html;
            
            //button.dataset.productId
            document.querySelectorAll(`.buy-again-button`).forEach((button,index_button) => {
                button.addEventListener(`click`, () => {
                    //console.log(order_products[index_button])
                    addProductToCart(order_products[index_button].productId,1);
                    updateCartNumber();
                })
            })
        })
    })
}

organizeOrders();
updateCartNumber();
