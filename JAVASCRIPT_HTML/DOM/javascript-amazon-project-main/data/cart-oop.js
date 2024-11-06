import { updateCartNumber } from '../scripts/amazon.js'
import { updateCartNumberCheckout } from '../scripts/checkout/orderSummary.js'
import { products } from './products.js'

function Cart(){
  const cart =
  {
    cartItems: undefined,
  
    loadFromStorage() {
      
      if (!this.cartItems) {
        this.cartItems = 
        [
            {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: '1'
            }
        ]
      }
  
      this.saveToStorage();
      this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
      
    },
  
    searchForProductInfo(productId) {
      return products.filter((product) => { if (product.id == productId) { return true; } else { return false; } })
    },
  
    addedMessageTimeout: undefined,
  
    searchForProductWithinCart(productId) {
      return this.cart.cartItems.filter((item) => { if (item.productId == productId) { return true; } else { return false; } })
    },
  
    updateCartProduct(productId, quantity) {
      this.cartItems.forEach((item) => {
        if (item.productId == productId) {
          item.quantity = parseInt(quantity);
        }
      });
    },
  
    saveToStorage()
    {
      localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },
  
    updateDeliveryOption(productId,deliveryOption){
      if (searchForProductInfo(productId).length > 0) {
        this.cartItems.forEach((item) => {
          if (item.productId == productId) {
            item.deliveryOptionId = deliveryOption;
          }
        });
        this.saveToStorage();
      }
      else {
        return
      }
    },
  
    addProductToCart(productId, quantity_selected){
      let matchingItem;
      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      })
    
      if (matchingItem) {
        matchingItem.quantity += quantity_selected
      } else {
        this.cartItems.push(
          {
            productId: productId,
            quantity: quantity_selected,
            deliveryOptionId: '1'
          }
        )
      }
    
    
      //cartIconAdded(addedToCartDiv);
      this.saveToStorage()
    },
  
    cartIconAdded(addedToCartDiv){
      addedToCartDiv.classList.add('added-to-cart-clicked');
      clearInterval(addedMessageTimeout);
      addedMessageTimeout = setTimeout(function () {
        addedToCartDiv.classList.remove('added-to-cart-clicked');
      }, 2000);
    },
  
    removeContainerFromCart(productId){
      const product_to_delete = this.cart.cartItems.filter((item) => { if (item.productId === productId) { return true } else { false } });
      const container = document.querySelector(`.js-cart-item-container-${product_to_delete[0].productId}`)
      container.remove();
    },
  
    removeFromCart(productId){
      const product_to_delete = this.cart.cartItems.filter((item) => { if (item.productId === productId) { return true } else { false } });
      let newCart = []
    
      if (product_to_delete.length !== 0) {
        this.cart.cartItems.forEach((item) => {
          if (item.productId !== product_to_delete[0].productId) {
            newCart.push(item);
            updateCartNumberCheckout();
            updateCartNumber()
          }
        });
      } else {
        newCart = this.cart.cartItems;
      }
    
      this.cart.cartItems = newCart;
      this.saveToStorage()
    },
  
    removeFromCartFromCheckout(productId){
      const product_to_delete = this.cart.cartItems.filter((item) => { if (item.productId === productId) { return true } else { false } });
      let newCart = []
      this.cart.cartItems.forEach((item) => {
        if (item.productId !== product_to_delete[0].productId) {
          newCart.push(item);
        }
      });
    
      this.cart.cartItems = newCart;
    }
  
  }

  return cart;
}


const cart = Cart();

cart.saveToStorage();
cart.loadFromStorage();