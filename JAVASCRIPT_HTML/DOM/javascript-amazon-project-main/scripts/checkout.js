import {organizeCart} from '../scripts/checkout/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkout/paymentSummary.js'
//import '../data/backend-practice.js';
//import '../data/cart-oop.js'
import { loadProducts,loadCart } from '../data/products.js';


// Promise.all([
//     new Promise((resolve) => {
//         console.log('promise start loadProducts');
//         loadProducts(() => {
//             console.log('Finished loadProducts function...');
//             console.log(`RESPONSE ${response}`);
//             resolve("VALUE")
//         });
//     }),
//     new Promise((resolve) => {
//         console.log('promise start loadCart');
//         loadCart(() => {
//             organizeCart();
//             renderPaymentSummary();
//             resolve('Value 2');
//         })
//     }).then((value) => {
        
//     })
// ]).then((values) => {
//     console.log("END VALUE")
// })

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

// THIS IS A SHORTER VERSION OF THE CODE BELOW

    async function loadPage()
    {
        console.log('load page...');

        // WE CAN ONLY USE AWAIT WHEN WE'RE INSIDE AN ASYNC FUNCTION
        await loadProducts();
        const resolver = await new Promise((resolve,reject) => {
            loadCart(() => {
                //reject('ERROR 1')
                resolve("FINISHED loadCart");
                
            })
        });
        console.log(`RESOLVER ${resolver}`);

        organizeCart();
        renderPaymentSummary();
        return "loadPage Finished";
    }


await loadPage().then((value) => {
    console.log(`${value}`);
})

// function loadPage(){
//     return new Promise((resolve) => {
//         console.log(resolve);
//         resolve();
//     })
// }



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