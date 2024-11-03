import {organizeCart} from '../../../scripts/checkout/orderSummary.js'
import { addProductToCart,cart,cartIconAdded,saveToStorage,updateCartProduct,removeFromCart,loadFromStorage } from '../../../data/cart.js'


describe('Test Set: organizeCart', () => 
{
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    beforeEach(() => 
    {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="order-summary"> </div>
        <div class="return-to-home-link"></div>
        <div class="payment-summary"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => 
            {
                    return JSON.stringify(
                        [
                            {
                                productId: productId1,
                                quantity: 1,
                                deliveryOptionId: '1'
                            },
                            {
                                productId: productId2,
                                quantity: 3,
                                deliveryOptionId: '2'
                            }
                        ]);
            });

            loadFromStorage();
            organizeCart();
    })

    it('Displays the cart', () => 
    {
        expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.quantity-product-${productId1}`).innerText).toContain(`Quantity: 1`);
        expect(document.querySelector(`.quantity-product-${productId2}`).innerText).toContain(`Quantity: 3`);
    });

    it('Removes a product from the cart', () => 
    {
        spyOn(localStorage, 'setItem');
        document.querySelectorAll(`.delete-quantity-link`)[0].click();
        expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.quantity-product-${productId2}`).innerText).toContain(`Quantity: 3`);
        expect(document.querySelector(`.quantity-product-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.quantity-product-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        

    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ``;
    })
})