
function greeting(){
    console.log('hello');
}


greeting();


const function1 = function greeting(){
    console.log('hello 2 within a const variable')
}

console.log(function1);
console.log(typeof(function1))
function1()

const object1 = {
    num: 2,
    fun: () => {
        console.log('hello3 within an object')
    }
}

object1.fun()


function display(param){
    console.log(param);
}

display(10);

function run(function_to_run){
    function_to_run()
}

run(function(){
    console.log('hello 4');
});