import {organizeCart,organizeCartOO} from '../scripts/checkout/orderSummary.js'
import {renderPaymentSummary,renderPaymentSummaryOO} from '../scripts/checkout/paymentSummary.js'
import {cart1,Cart} from '../data/cart-class.js'

organizeCartOO(cart1);
renderPaymentSummaryOO(cart1);
//console.log(cart1 instanceof Cart)