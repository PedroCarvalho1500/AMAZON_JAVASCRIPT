import { cart, addProductToCart, cartIconAdded, saveToStorage } from '../data/cart.js';
import { products,productsOO,loadProducts,products_from_backend } from '../data/products.js'
import {cart1} from '../data/cart-class.js'

export var total_quantity = 0

var url = new URL(window.location.href);

export function updateCartNumber() 
{
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

export function updateCartNumberOO(cart)
{
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


export function organizeProducts(products_from_backend) 
{
  //console.log(url.searchParams.get(`search`));
  const text_to_search = url.searchParams.get(`search`) === null ? "" : url.searchParams.get(`search`);
  const products_grid = document.querySelector('.products-grid');
  let product_div;
  updateCartNumber();


  products_from_backend.forEach((element) => 
  {

  //productsOO.forEach((element) => {
  //products.forEach((element) => {
    element.rating.stars = parseFloat(String(element.rating.stars).replace(".", ""));
    //element.priceCents = Math.round(parseFloat(element.priceCents/100),2)
    //console.log(element.priceCents)
    if(element.keywords.includes(text_to_search.toLowerCase()) === true)
    {
        console.log("MATCHES WITH SEARCH")
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
    }
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

export function searchForAProduct(search_bar){
  const text_to_search = search_bar.value;
  window.location.href = `amazon.html?search=${text_to_search}`;
  organizeProducts(products_from_backend);
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

      // setInterval(() =>  {
      //   console.log(`INPUT IS FOCUSED?`);
      //   console.log(document.querySelector(`.search-bar`) === document.activeElement)
      // },3000)

      const search_bar = document.querySelector(`.search-bar`);
      document.addEventListener(`keyup`, (event) => {
        if (event.key === 'Enter'){
          
          if(search_bar === document.activeElement){
            searchForAProduct(search_bar);
          }
        }
      })

      document.querySelector(`.search-button`).addEventListener('click', () => {
        searchForAProduct(search_bar);
      })

    }
  });


//   document.addEventListener('keyup',(event) => {
//     if (event.key === 'r'){
//         playGame('rock');
//     }else if(event.key === 'p'){
//         playGame('paper');
//     }else if(event.key === 's'){
//         playGame('scissors');
//     }else if (event.key === 'a'){
//         autoPlay(document.querySelector('#autoPlayBt'))
//     }else if (event.key === 'Backspace'){
//         resetScoref();
//     }
// })
