// const p1 = new Promise((resolve) => {
//     console.log("PROMISE 1...")
//     setTimeout(() => {
//         console.log('The first promise has resolved');
//         resolve(10);
//       }, 1 * 1000);
//     });

// const p2 = new Promise((resolve) => {
//     console.log("PROMISE 2...")
//     resolve(30);
// })

// Promise.all([
//     p1,
//     p2
// ]).then((results) => {
//     console.log("RESULTS...");
//     console.log(results);
// })



const promises_run = Promise.all([
    new Promise((resolve,reject) => {
        console.log("Promise 1 Started");
        setTimeout(() => {
            console.log("EXECUTING FUNCTION PROMISE 1...");
            resolve();
        },3000)
    }).then(() => {
        console.log("PROMISE 1 RESOLVED...");
    }),
    new Promise((resolve,reject) => {
        console.log("Promise 2 Started");
        setTimeout(() => {
            console.log("EXECUTING FUNCTION PROMISE 2...");
            resolve();
        },1000)
    }).then(() => {
        console.log("PROMISE 2 RESOLVED...");
    })
]);

console.log("OUTSIDE PROMISE");