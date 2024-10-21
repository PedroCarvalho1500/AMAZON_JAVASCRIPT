const regularFunction = function(param){
    console.log(`REGULAR FUNCTION: PARAM => ${param}`)
}

const arrowFunction = (param) => {
    console.log(`ARROW FUNCTION: PARAM => ${param}`)
}

arrowFunction("ARROW")
regularFunction("REGULAR")

const oneParam = param => {
    console.log(param+1)
}

const oneLine = () => 2+3;

oneParam(7);
console.log(oneLine());

const obj2 = {
    method: () => {
        console.log("METHOD")
    },

    method2(){
        console.log("METHOD2")
    }
}

obj2["method"]()
obj2["method2"]()




document.addEventListener('DOMContentLoaded',() => {
    const buttonElement = document.querySelector('#click_button');
    const eventListener = () => {
        console.log("CLICKED");
    };
    buttonElement.addEventListener('click',eventListener)
    //buttonElement.removeEventListener('click',eventListener)
    
})
