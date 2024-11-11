
//console.log("ENTERED BACKEND FILE...");
const xhr = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
const xhr3 = new XMLHttpRequest();
const xhr4 = new XMLHttpRequest();

xhr.addEventListener('load', () => 
{
    console.log(xhr.response)
});

xhr2.addEventListener('loadend', () => 
{
    console.log(xhr2.response);
});

xhr3.addEventListener('loadend', () => 
{
    console.log(xhr3.response);
});

//xhr4.addEventListener('loadend', () => {
    //console.log(xhr4.response);
//});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr2.open('GET', 'https://supersimplebackend.dev/hello');
xhr3.open('GET', 'https://supersimplebackend.dev/products/first');
xhr4.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
xhr.send();
xhr2.send();
xhr3.send();
xhr4.send();