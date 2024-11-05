import { addProductToCart, cart, cartIconAdded, saveToStorage, updateCartProduct, removeFromCart, loadFromStorage } from '../../data/cart.js'

describe('Cart Test Scenarios: Function addProductToCart', () => {

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

    });

    it('Add a non existing product to the cart', () => {
        //A MOCK ONLY LASTS FOR 1 TEST
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });


        loadFromStorage();

        console.log(localStorage.getItem('cart'));
        addProductToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"}]');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
    });


    it('Add an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(
                [
                    {
                        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        quantity: 1,
                        deliveryOptionId: '1'
                    }
                ]);
        });

        loadFromStorage();
        console.log(localStorage.getItem('cart'));
        addProductToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":2,"deliveryOptionId":"1"}]');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual('1');
    });






    it('Update product quantity with a valid new value', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(
                [
                    {
                        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        quantity: 1,
                        deliveryOptionId: '1'
                    }
                ]);
        });

        spyOn(cart, 'filter');
        loadFromStorage();
        updateCartProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 3);
        expect(cart[0].quantity).toEqual(3);
    });

    //updateCartProduct

});


describe('Test Suite: removeFromCart', () => {
    beforeEach(() => 
    {
        spyOn(localStorage, 'getItem').and.callFake(() => 
        {
            return JSON.stringify(
                [
                    {
                        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        quantity: 1,
                        deliveryOptionId: '1'
                    }
                ]);
        });

        spyOn(localStorage, 'setItem');

    });

    it('Removing product from the cart', () => {
        loadFromStorage();
        removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledOnceWith('cart','[]');
    });

    it('Removing product that doesnt exist in the cart', () => {
        loadFromStorage();
        expect(removeFromCart("e43638ce-6aa0-4b85-jkhkj-ID")).nothing()
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledOnceWith('cart','[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"}]');
    });

})