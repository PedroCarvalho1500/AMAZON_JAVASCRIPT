import {updateCartNumber} from '../scripts/amazon.js'
import {updateCartNumberCheckout} from '../scripts/checkout/orderSummary.js'
import {products} from '../data/products.js'
import { organizeCart } from '../scripts/checkout/orderSummary.js'
import { renderPaymentSummary } from '../scripts/checkout/paymentSummary.js'


export var cart;

loadFromStorage(); 

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart){
    cart = []
  }
}


export function loadCart(fun){
  console.log("Starting loadCart function")
  const xhr = new XMLHttpRequest();
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();

  xhr.addEventListener('loadend', () => 
  {
      console.log(xhr.response);
      fun();
  });

  xhr.addEventListener('error', () => {
    console.log("UNEXPECTED ERROR!!!");
  })

}



export async function loadCartFetch(){
  console.log("Starting loadCartFetch function")
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  organizeCart();
  renderPaymentSummary();
  console.log(`${text}`);
  return text;
}



export function searchForProductInfo(productId){
  return products.filter((product) => {if(product.id == productId){ return true;} else{return false;}})
}
 


var addedMessageTimeout;

export function searchForProductWithinCart(productId){
  return cart.filter((item) => {if(item.productId == productId){ return true;} else{return false;}})
}


export function updateCartProduct(productId,quantity){
  cart.forEach((item) => {
    if(item.productId == productId){
      item.quantity = parseInt(quantity);
    }
  });
}


export function updateDeliveryOption(productId,deliveryOption)
{
  if(searchForProductInfo(productId).length > 0)
  {
    cart.forEach((item) => 
    {
      if(item.productId == productId)
      {
        item.deliveryOptionId = deliveryOption;
      }
    });
    saveToStorage();
  }
  else
  {
    return
  }

}


export function addProductToCart(productId,quantity_selected){
    let matchingItem;
    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    })
  
    if (matchingItem){
      matchingItem.quantity += quantity_selected
    }else{
      cart.push(
        {
          productId: productId,
          quantity: quantity_selected,
          deliveryOptionId: '1'
        }
      )
    }
  
    
    //cartIconAdded(addedToCartDiv);
    saveToStorage()
  }
  

  export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
  }


  
export function cartIconAdded(addedToCartDiv){
    addedToCartDiv.classList.add('added-to-cart-clicked');
    clearInterval(addedMessageTimeout);
    addedMessageTimeout = setTimeout( function() {
      addedToCartDiv.classList.remove('added-to-cart-clicked');
    },2000);
  }


export function removeContainerFromCart(productId){
  const product_to_delete = cart.filter((item) => {if (item.productId === productId) {return true} else{false}});
  //console.log(product_to_delete)
  const container = document.querySelector(`.js-cart-item-container-${product_to_delete[0].productId}`)
  container.remove();
}


export function removeFromCart(productId){
  const product_to_delete = cart.filter((item) => {if (item.productId === productId) {return true} else{false}});
  let newCart = []
  
  if (product_to_delete.length !== 0) 
  {
    cart.forEach((item) => {
      if(item.productId !== product_to_delete[0].productId){
        newCart.push(item);
        updateCartNumberCheckout();
        updateCartNumber()
      }
    });
  }else
  {
    newCart = cart;
  }


  cart = newCart;
  saveToStorage()
}


export function removeFromCartFromCheckout(productId){
  const product_to_delete = cart.filter((item) => {if (item.productId === productId) {return true} else{false}});
  let newCart = []
  cart.forEach((item) => {
    if(item.productId !== product_to_delete[0].productId){
      newCart.push(item);
    }
  });

  cart = newCart;
}

