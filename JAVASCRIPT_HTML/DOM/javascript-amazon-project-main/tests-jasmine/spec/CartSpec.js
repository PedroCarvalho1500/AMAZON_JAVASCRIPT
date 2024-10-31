import { addProductToCart,cart,cartIconAdded,saveToStorage,removeFromCart,loadFromStorage } from '../../data/cart.js'


describe('Cart Test Scenarios: Function addProductToCart', () => 
{
    
    it('Add a non existing product to the cart',() => 
    {
        //A MOCK ONLY LASTS FOR 1 TEST
        spyOn(localStorage, 'getItem').and.callFake(() => 
        {
            return JSON.stringify([]);
        });
        
        spyOn(localStorage, 'setItem');
        loadFromStorage();
        console.log(localStorage.getItem('cart'));
        addProductToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        //console.log(cart);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
    });


    it('Add an existing product to the cart',() => 
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
        loadFromStorage();
        console.log(localStorage.getItem('cart'));
        addProductToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual('1');
    });
});