import {updateCartNumber} from '../scripts/amazon.js'
import {updateCartNumberCheckout} from '../scripts/checkout/orderSummary.js'
import {products} from '../data/products.js'

if (!cart){
  console.log("EMPTY");
  cart = [{
    
  }]
}

export var cart = JSON.parse(localStorage.getItem('cart'));


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


export function addProductToCart(productId,quantity_selected,addedToCartDiv){
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
  
    
    cartIconAdded(addedToCartDiv);
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


export function removeFromCart(productId){
  const product_to_delete = cart.filter((item) => {if (item.productId === productId) {return true} else{false}});
  const container = document.querySelector(`.js-cart-item-container-${product_to_delete[0].productId}`)
  container.remove();
  let newCart = []
  cart.forEach((item) => {
    if(item.productId !== product_to_delete[0].productId){
      newCart.push(item);
      updateCartNumberCheckout();
      updateCartNumber()
    }
  });

  cart = newCart;
}


export function removeFromCartFromCheckout(productId){
  const product_to_delete = cart.filter((item) => {if (item.productId === productId) {return true} else{false}});
  const container = document.querySelector(`.js-cart-item-container-${product_to_delete[0].productId}`)
  container.remove();
  let newCart = []
  cart.forEach((item) => {
    if(item.productId !== product_to_delete[0].productId){
      newCart.push(item);
      updateCartNumberCheckout();
    }
  });

  cart = newCart;
  saveToStorage();
}

