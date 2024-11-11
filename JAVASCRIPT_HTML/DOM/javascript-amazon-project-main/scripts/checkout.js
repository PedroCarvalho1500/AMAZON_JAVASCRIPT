import {organizeCart} from '../scripts/checkout/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkout/paymentSummary.js'
//import '../data/backend-practice.js';
//import '../data/cart-oop.js'
import { loadProducts,loadCart } from '../data/products.js';


//Running one promise each time
// new Promise((resolve) => {
//     console.log('promise start loadProducts');
//     loadProducts(() => {
//         console.log('Finished loadProducts function...');
//         resolve("Value 1");
//     });
// }).then((value1) => {
//     return new Promise((resolve) => {
//         console.log(`VALUE1 ${value1}`)
//         console.log('promise start loadCart');
//         loadCart(() => {
//             console.log('Finished loadCart function...');
//             resolve("Value 2");  
//         })
//     }).then((value2) => {
//         console.log(`VALUE2 ${value2}`)
//         organizeCart();
//         renderPaymentSummary();
//     })
// });

//PROMISES HELP US AVOID NESTING. SO OUR CODE KEEPS NEAT
//Running several promises at the same time (In parallel) using Promise.all
Promise.all([
    new Promise((resolve) => {
        console.log('promise start loadProducts');
        loadProducts(() => {
            console.log('Finished loadProducts function...');
            resolve("Value 1");
        });
    }),
    new Promise((resolve) => {
        console.log('promise start loadCart');
        loadCart(() => {
            console.log('Finished loadCart function...');
            resolve("Value 2");  
        })
    })
]).then((values) => {
    console.log(`PROMISES VALUES: ${values[0]} ${values[1]}`);
    organizeCart();
    renderPaymentSummary();
})

/*
loadProducts(() => {
    loadCart(() => {
        organizeCart();
        renderPaymentSummary();
    })
});
*/


//organizeCart();
//renderPaymentSummary();