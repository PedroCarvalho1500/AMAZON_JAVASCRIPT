const add = () => {
    console.log(2+3)
}

add();
add();

function runTwice(function_to_run){
    for (let i=0;i<2;i++){
        function_to_run()
    }
    
}


function changeText(){
    setTimeout(function(){
        let button_finish = document.querySelector('#b1').textContent = "Finished!"
    },3000)
}