export function greetingThroughXML() {
    console.log("Greeting request starting...")
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://supersimplebackend.dev/greeting');
    xhr.send();

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        console.log(`Finished Greeting Request Through XML`);
    });

    xhr.addEventListener('error', () => {
        console.log("UNEXPECTED ERROR!!!");
    });

}


export function greetingThroughFetchWithoutAsync() 
{
    console.log("Greeting request starting through Fetch...")
    const greeting = fetch('https://supersimplebackend.dev/greeting')
    .then((response,error) => 
    {
      return response.text();  
    })
    .then((response) => {
        console.log(response);
        return response
    })
    .catch((error) => {
        console.log(`AN UNEXPECTED ERROR OCCURRED!!!`)
    });
    console.log(`Finished Greeting Request Through Fetch no Async`);
    return greeting;
}

export async function greetingThroughFetchWithAsync() 
{
    console.log("Greeting request starting through Fetch AND ASYNC...")
    const greeting = await fetch('https://supersimplebackend.dev/greeting')
    .catch((error) => {
        console.log(`AN UNEXPECTED ERROR OCCURRED!!!`)
    });
    console.log(await greeting.text());
    console.log(`Finished Greeting Request Through Fetch WITH Async`);
    return greeting;
}



greetingThroughXML();
greetingThroughFetchWithoutAsync();
greetingThroughFetchWithAsync();


// document.querySelector(`.js-place-order`).addEventListener("click", async () => 
//     {
//       console.log("clicked...");
//       try{
//         const response = await fetch(`https://supersimplebackend.dev/orders`,
//           {
//               method: 'POST', 
//               headers: {'Content-Type': 'application/json'},
//               body: 
//               JSON.stringify({
//                 cart: cart
//               })
//           });
//           const order = await response.json();
//           addOrder(order);
//       }catch(error){
//         console.log(`Unexpected error. Try again later! ${error}`)
//       }
//     window.location.href = 'orders.html'
//     });