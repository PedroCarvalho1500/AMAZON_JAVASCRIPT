let messages_not_read = 0;
var title_messages_set = false
var stopInterval = false;


var processSetInterval1;

function runNotification(){
    if (stopInterval == false){
        processSetInterval1 = setInterval(function(){
            if (title_messages_set){
                document.title = `App`
                title_messages_set = false
            }else{
                document.title = `(${messages_not_read}) New messages`
                title_messages_set = true
            }
        },1000)
    }else{
        clearInterval(processSetInterval1)
    }
}


runNotification()


function addMessage(){
    messages_not_read++;
    stopInterval = false;

}

function removeMessage(){
    if (messages_not_read > 0)
    {
        messages_not_read--;
    }else{
        alert(`There aren't any messages`);
        stopInterval = true;
        clearInterval(processSetInterval1);
        document.title = `App`
        
    }
}