


let todoList = [
    {
    name: 'make dinner',
    dueDate: '2022-12-22'
    },

    {
    name: 'wash dishes',
    dueDate: '2022-12-20'
    }
]

function add_button_clicked(){
    const add_button = document.querySelector('#add_task');
    const inputElement = document.querySelector('.js-name-input').value;
    //todoList.push(inputElement)
    document.querySelector('.js-name-input').value = ""
    todoList.forEach((object, index) => {
        const {name, dueDate} = object;
        console.log(name);
        console.log(dueDate);
        //console.log(value["dueDate"]);
        //document.querySelector('body').innerHTML+=`<p> ${value["name"]} </p>`
    })

    
}
