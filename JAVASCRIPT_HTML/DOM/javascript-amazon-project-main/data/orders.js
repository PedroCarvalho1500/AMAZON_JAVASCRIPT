

export var orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order){
    //console.log(order);
    orders.push({
        orderId: order.id,
        orderTime: order.orderTime,
        totalCostCents: order.totalCostCents,
        products: order.products
    });
    saveOrderToStorage();

}


export function saveOrderToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
    
}


export async function loadOrders()
{
    console.log("Starting loadOrder function")
}