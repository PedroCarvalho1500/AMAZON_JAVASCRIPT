const arrowMultiply = (x,y) => {
    return x*y
}

const oneLinerMultiply = (x,y) => x*y;

function countPositive1(nums = []){
    const quantity_positive = nums.filter(element => element > 0);
    return quantity_positive.length
}


function countPositive2(nums = []){
    let count = 0;
    nums.forEach(value => {
        if (value > 0){
            count++;
        }
    });

    return count;
}


function addNum(array=Array(),num){
    array = array.map((x) => x + num);
    return array;
}

const addNum2 = (array,num) => {
    array.map((x) => {
        x+num
    })
};






console.log(addNum([2,3,4,5],-1));
console.log(addNum2([3,5,6,4],-4));
console.log(arrowMultiply(4,5));
console.log(arrowMultiply(3,2));
console.log(oneLinerMultiply(7,6));
console.log(oneLinerMultiply(8,9));
console.log(oneLinerMultiply(8,7));
console.log(countPositive1([34,-1,-34,-2,-4,6]));
console.log(countPositive2([34,-1,-34,-2,-4,6]));