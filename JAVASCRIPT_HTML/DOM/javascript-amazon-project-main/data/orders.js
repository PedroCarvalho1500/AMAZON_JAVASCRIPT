

export const orders = localStorage.getItem('orders') || [];


export function addOrder(order){
    orders.unshift(order);
    saveOrderToStorage();
}


export function saveOrderToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}
