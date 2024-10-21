setTimeout(function(){
    console.log('timeout')
    console.log('timeout2')
},2000)

console.log('Next Line')

// setInterval(function(){
//     console.log("INTERVAL...")
// },3000);

console.log('next line 2')

const actionsArray = [
    'make dinner',
    'wash dishes',
    'watch youtube'
]

actionsArray.forEach(function(value, index) {
    console.log(index)
    console.log(value)
})