async function f1() {
    console.log("STARTING PROMISE 1")
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log("PROMISE 1 PROGRESS");
            resolve("PROMISE 1 RESOLVED");
        }, 6000)
    }).then((resolver) => {
        console.log(`${resolver}`);
    });

    return "F1";
}

async function f2() {
    console.log("STARTING PROMISE 2")
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log("PROMISE 2 PROGRESS");
            resolve("PROMISE 2 RESOLVED");
        }, 1000);
    }).then((resolver) => {
        console.log(`${resolver}`);
    });

    return "F2";
}

// f1().then((resolver)=>{console.log(`${resolver}`)});
// await f2();
// console.log("EXECUTING OUTSIDE PROMISES")


Promise.all
    ([
        await new Promise((resolve) => {
            //const div_container = document.createElement('div');
            //div_container.innerText = `COMMAND 1`
            console.log("COMMAND 1 PROGRESS");
            setTimeout(() => {
                resolve("PROMISE 1 RESOLVED");
            }, 5000)
        }).then((resolver) => {
            console.log(resolver);
        }),
        await new Promise((resolve) => {
            //const div_container = document.createElement('div');
            //div_container.innerText = `COMMAND 2`
            console.log("COMMAND 2 PROGRESS");
            setTimeout(() => {
                resolve("PROMISE 2 RESOLVED");
            }, 3000)
        }).then((resolver) => {
            console.log(resolver);
        }),
        await new Promise((resolve) => {
            //const div_container = document.createElement('div');
            //div_container.innerText = `COMMAND 3`
            console.log("COMMAND 3 PROGRESS");
            setTimeout(() => {
                resolve("PROMISE 3 RESOLVED");
            }, 1000)
        }).then((resolver) => {
            console.log(resolver);
        }),
        await new Promise((resolve) => {
            console.log("COMMAND 4 PROGRESS");
            setTimeout(() => {
                resolve("PROMISE 4 RESOLVED");
            }, 8000)
        }).then((resolver) => {
            console.log(resolver);
        })
    ]).then()
    {
        const div_container = document.createElement('div');
        div_container.innerText = `COMMAND 1\n COMMAND 2\n COMMAND 3\n COMMAND 4`
        document.querySelector('.js-test-container').appendChild(div_container);
    }


