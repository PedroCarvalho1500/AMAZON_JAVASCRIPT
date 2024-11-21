import {updateCartNumber} from './amazon.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {orders} from '../data/orders.js'
import {loadProducts} from '../data/products.js'
const url = new URL(window.location.href);

//console.log(url.searchParams.get('productId'));
//console.log(url.searchParams.get('orderId'));


export async function loadTrackingPage(){
    updateCartNumber();
    const all_products = await loadProducts();
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    const orderInfo = orders.filter((order) => {if(order.orderId === orderId){return true} else{return false}});
    const productInfo = orderInfo[0].products.filter((product) => {if(product.productId === productId){return true}else{return false}});
    const productName = all_products.filter((product) => {if(product.id === productInfo[0].productId){return true}else{return false}});
    const quantity = productInfo[0].quantity;
    //console.log(orderInfo);
    //console.log(productInfo[0]);
    const order_time = dayjs(orderInfo[0].orderTime);
    const deliveryDate_html = document.querySelector(`.delivery-date`);
    const estimatedDeliveryTime = dayjs(productInfo[0].estimatedDeliveryTime);
    deliveryDate_html.innerText = `Arriving on ${estimatedDeliveryTime.format('dddd')}, ${estimatedDeliveryTime.format('MMMM')} ${estimatedDeliveryTime.format('D')}`
    const productHtml = document.querySelector(`.product-info-name`);
    productHtml.innerText = `${productName[0].name}`;
    const quantityHtml = document.querySelector(`.product-info-quantity`);
    quantityHtml.innerText = `Quantity: ${quantity}`;
    const productImage = document.querySelector(`.product-image`);
    productImage.setAttribute(`src`, `${productName[0].image}` );
    const current_time = dayjs();
    
    const delivery_percent = (((current_time-order_time)/(estimatedDeliveryTime-order_time))*100).toFixed(2);
    //console.log(current_time-order_time)
    const progress_bar = document.querySelector(`.progress-bar`);
    progress_bar.setAttribute(`style`, `width:${delivery_percent}%`);
    document.querySelectorAll(`.progress-label`).forEach((status) => {
        status.classList.remove('current-status');
    });
    if(delivery_percent <= 49){
        document.querySelectorAll(`.progress-label`)[0].classList.add(`current-status`);
    }else if(delivery_percent >= 50 && delivery_percent < 100){
        document.querySelectorAll(`.progress-label`)[1].classList.add(`current-status`);
    }else{
        document.querySelectorAll(`.progress-label`)[2].classList.add(`current-status`);
    }

}

document.addEventListener('DOMContentLoaded', (event) => {
    if(event.target.title === "Tracking"){
        loadTrackingPage();
    }
})


//Arriving on Monday, June 13