import { cart, addProductToCart, cartIconAdded, saveToStorage } from '../data/cart.js';
import { products,productsOO,loadProducts,products_from_backend } from '../data/products.js'
import {cart1} from '../data/cart-class.js'

export var total_quantity = 0


//console.log(products_grid);

export function updateCartNumber() {
  let cart_quantity = document.querySelector('.cart-quantity');
  if (cart.length === 0) {
    cart_quantity.textContent = ""
    //console.log("0");
  } else {
    total_quantity = Object.keys(cart).map((key) => cart[key].quantity).reduce((acumulator, currentValue) => acumulator + currentValue);
    cart_quantity.textContent = total_quantity;
    //console.log(total_quantity);
  }

  return total_quantity

}

export function updateCartNumberOO(cart){
  let cart_quantity = document.querySelector('.cart-quantity-2');
  if (cart.cartItems.length === 0) {
    cart_quantity.textContent = ""
    //console.log("0");
  } else {
    total_quantity = Object.keys(cart.cartItems).map((key) => cart.cartItems[key].quantity).reduce((acumulator, currentValue) => acumulator + currentValue);
    cart_quantity.textContent = total_quantity;
  }

  return total_quantity
}


export function organizeProducts(products_from_backend) {
  const products_grid = document.querySelector('.products-grid');
  let product_div;
  updateCartNumber();
  //console.log(productsOO);
  //productsOO

  products_from_backend.forEach((element) => {

  //productsOO.forEach((element) => {
  //products.forEach((element) => {
    element.rating.stars = parseFloat(String(element.rating.stars).replace(".", ""));
    //element.priceCents = Math.round(parseFloat(element.priceCents/100),2)
    //console.log(element.priceCents)
    product_div = document.createElement('div');
    product_div.className = "product-container js-products-grid"
    product_div.innerHTML = `         <div class="product-image-container">
                <img class="product-image"
                  src="${element.image}">
              </div>
    
              <div class="product-name limit-text-to-2-lines">
                ${element.name}
              </div>
    
              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="images/ratings/rating-${element.rating.stars}.png">
                <div class="product-rating-count link-primary">
                  ${element.rating.count}
                </div>
              </div>
    
              <div class="product-price">
                ${element.getPrice()}
              </div>
    
              <div class="product-quantity-container">
                <select id="quantity-selector-${element.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
    
              <div class="product-spacer"></div>
    
              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>
              ${element.extraInfoHtml()}
              <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${element.id}">
                Add to Cart
              </button>`
    products_grid.appendChild(product_div)
  });

  document.querySelectorAll('.js-add-to-cart').forEach((button, index) => 
    {
      button.addEventListener('click', () => {
        console.log("CLICKED...")
        var addedToCartDiv = document.querySelectorAll('.added-to-cart')[index];
        cartIconAdded(addedToCartDiv);

        var selected_value = document.querySelector(`#quantity-selector-${products[index].id}`);

        const quantity_selected = parseInt(selected_value.value);
        const productId = button.dataset.productId;

        addProductToCart(productId, quantity_selected, addedToCartDiv);
        //console.log(cart);
        updateCartNumber();
        saveToStorage();
      })
    });
}






document.addEventListener('DOMContentLoaded', (event) => 
  {
    if(event.target.title === "Amazon Project"){
      //loadProducts(organizeProducts);
      // loadProducts().then(() => {
      //   organizeProducts(products_from_backend);
      // })
      loadProducts();
      organizeProducts(products_from_backend);
      updateCartNumberOO(cart1);

      // document.querySelectorAll('.js-add-to-cart').forEach((button, index) => 
      // {
      //   button.addEventListener('click', () => {
      //     console.log("CLICKED...")
      //     var addedToCartDiv = document.querySelectorAll('.added-to-cart')[index];
      //     cartIconAdded(addedToCartDiv);
  
      //     var selected_value = document.querySelector(`#quantity-selector-${products[index].id}`);
  
      //     const quantity_selected = parseInt(selected_value.value);
      //     const productId = button.dataset.productId;
  
      //     addProductToCart(productId, quantity_selected, addedToCartDiv);
      //     //console.log(cart);
      //     updateCartNumber();
      //     saveToStorage();
      //   })
      // });
    }
  });



