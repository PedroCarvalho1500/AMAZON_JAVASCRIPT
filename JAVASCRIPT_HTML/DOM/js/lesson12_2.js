function removeEgg(foods = []){
    return foods.filter((word) => word != 'egg');
}


function removeEgg2(foods = []){
    let count = 0;
    return foods.filter((word) => {
        if (word === 'egg' && count < 2){
            count++;
            return false;
        }else{
            return true;
        }
});
}

console.log(removeEgg(['egg','apple','egg', 'egg', 'ham']));
console.log(removeEgg2(['egg','apple','egg', 'egg', 'ham']));