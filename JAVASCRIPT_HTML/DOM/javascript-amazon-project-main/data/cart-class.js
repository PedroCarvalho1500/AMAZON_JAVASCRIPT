import { updateCartNumber } from '../scripts/amazon.js'
import { updateCartNumberCheckout } from '../scripts/checkout/orderSummary.js'
import { products } from './products.js'

export class Cart {
    
    cartItems;
    addedMessageTimeout;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.saveToStorage();
        this.#loadFromStorage();
    }

    #loadFromStorage() {

        if (!this.cartItems) {
            this.cartItems =
                [
                    {
                        productId: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
                        quantity: 1,
                        deliveryOptionId: '1'
                    },
                    {
                        productId: "bc2847e9-5323-403f-b7cf-57fde044a955",
                        quantity: 1,
                        deliveryOptionId: '1'
                    }
                ]
        }

        this.saveToStorage();
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }



    searchForProductInfo(productId) {
        return products.filter((product) => { if (product.id == productId) { return true; } else { return false; } })
    }

    searchForProductWithinCart(productId) {
        return this.cart.cartItems.filter((item) => { if (item.productId == productId) { return true; } else { return false; } })
    }

    updateCartProduct(productId, quantity) {
        this.cartItems.forEach((item) => {
            if (item.productId == productId) {
                item.quantity = parseInt(quantity);
            }
        });
    }


    updateDeliveryOption(productId, deliveryOption) {
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
    }


    addProductToCart(productId, quantity_selected) {
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
        this.saveToStorage()
    }

    cartIconAdded(addedToCartDiv) {
        addedToCartDiv.classList.add('added-to-cart-clicked');
        clearInterval(addedMessageTimeout);
        addedMessageTimeout = setTimeout(function () {
            addedToCartDiv.classList.remove('added-to-cart-clicked');
        }, 2000);
    }

    removeContainerFromCart(productId) {
        const product_to_delete = this.cart.cartItems.filter((item) => { if (item.productId === productId) { return true } else { false } });
        const container = document.querySelector(`.js-cart-item-container-${product_to_delete[0].productId}`)
        container.remove();
    }

    removeFromCart(productId) {
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
    }

    removeFromCartFromCheckout(productId) {
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




export const cart1 = new Cart("cart-class1");
