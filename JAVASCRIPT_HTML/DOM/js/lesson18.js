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


export async function greetingPostFetch(name)
{
    console.log(`Greeting Post request starting...`);
    const greeting = await fetch('https://supersimplebackend.dev/greeting', 
        {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: `${name}`})
        }).catch((error) => 
        {
            console.log(`AN UNEXPECTED ERROR OCCURRED!!!`)
        });
    console.log(await greeting.text());
    console.log(`Finished Post Greeting Through Fetch with Async`);
    return greeting;
}



export async function getToAmazonFetchAsync()
{
    console.log(`Amazon URL starting...`);
    const amazon_url = await fetch('https://amazon.com',{method: 'GET'})
    .catch((error) => 
        {
            console.log(`CORS error. Your request was blocked by the backend ${error}`)
        });

    console.log(`Finished Amazon URL starting...`);
    return amazon_url;
}



export async function greetingPostError()
{
    console.log(`Greeting Post request starting...`);
    try
    {
        const greeting = await fetch('https://supersimplebackend.dev/greeting', 
            {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}
            });

            if(greeting.status >= 400)
            {
                throw greeting;
            }
    }catch(error){
        if (error.status === 400) {
            const errorMessage = await error.json();
            console.log(errorMessage);
          } else {
            console.log('Network error. Please try again later.');
          }
    } 
}



greetingThroughXML();
greetingThroughFetchWithoutAsync();
greetingThroughFetchWithAsync();
greetingPostFetch("Pedro");
getToAmazonFetchAsync();
greetingPostError();