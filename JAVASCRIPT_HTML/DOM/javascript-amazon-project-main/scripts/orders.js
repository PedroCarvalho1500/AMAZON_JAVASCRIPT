import {orders} from '../data/orders.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { products_from_backend,loadProducts } from '../data/products.js'

//console.log(orders[0].orderTime);
//const current_date = dayjs(orders[0].orderTime);
//console.log(current_date.format('MMMM'));
//console.log(current_date.format('D'));
export function organizeOrders(){
    const order_container = document.querySelector(`.order-container`);

    
    orders.forEach((order,index) => {
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

        order.products.forEach((product) => {
            console.log(product.productId)
            const new_product_image_container = document.createElement(`div`);
            new_product_image_container.classList.add(`product-image-container`);
            const img_url = products_from_backend.filter((current_product) => {
                if(current_product.id === product.productId){
                     return true
                    } 
                else {
                    return false
                }
            });
            console.log(img_url);
            new_product_image_container.innerHTML = `
            <img src="${img_url}>
            `;

            document.querySelectorAll(`.order-details-grid`)[index].appendChild(new_product_image_container);
        })



        // <div class="order-details-grid">
        // <div class="product-image-container">
        //   <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
        // </div>

        // <div class="product-details">
        //   <div class="product-name">
        //     Black and Gray Athletic Cotton Socks - 6 Pairs
        //   </div>
        //   <div class="product-delivery-date">
        //     Arriving on: August 15
        //   </div>
        //   <div class="product-quantity">
        //     Quantity: 1
        //   </div>
        //   <button class="buy-again-button button-primary">
        //     <img class="buy-again-icon" src="images/icons/buy-again.png">
        //     <span class="buy-again-message">Buy it again</span>
        //   </button>
        // </div>

        // <div class="product-actions">
        //   <a href="tracking.html">
        //     <button class="track-package-button button-secondary">
        //       Track package
        //     </button>
        //   </a>
        // </div>

    })
}

organizeOrders();

// [{"orderId":"c953f2ae-b88c-44a4-96bb-00df4de592a1","totalCostCents":10667,"products":
// [{"productId":"8c9c52b5-5a19-4bcb-a5d1-158a74287c53","quantity":1,"estimatedDeliveryTime":"2024-11-24T18:26:47.219Z","variation":null},
// {"productId":"dd82ca78-a18b-4e2a-9250-31e67412f98d","quantity":1,"estimatedDeliveryTime":"2024-11-24T18:26:47.219Z","variation":null},
// {"productId":"54e0eccd-8f36-462b-b68a-8182611d9add","quantity":2,"estimatedDeliveryTime":"2024-11-24T18:26:47.219Z","variation":null}]}]