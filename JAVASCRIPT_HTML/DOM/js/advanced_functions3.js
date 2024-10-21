let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

function resetScoref(){
    confirmDivMessage()

}

function confirmDivMessage(){
    const message_div =  document.createElement('div');


    message_div.className = "reset-score-message"
    message_div.innerHTML = `Are you sure you want to reset the score? 
            <button id="yesBt" class="reset-score-bt">Yes</button>
            <button id="noBt" class="reset-score-bt">No</button>`



    document.body.appendChild(message_div);
    
    const buttonClickedYes = document.querySelector('#yesBt');
    const buttonClickedNo = document.querySelector('#noBt');

    buttonClickedYes.addEventListener('click', () => 
        {
            console.log(buttonClickedYes.textContent)
            const messageDiv = document.getElementsByClassName('reset-score-message');
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            document.querySelector('.reset-score-message').remove()
            updateScoreElement();
        })
        
    buttonClickedNo.addEventListener('click', () => 
        {
            document.querySelector('.reset-score-message').remove()
            updateScoreElement();
        })




    
    

}



document.addEventListener('DOMContentLoaded', () => {
    updateScoreElement()
    document.addEventListener('keyup',(event) => {
        if (event.key === 'r'){
            playGame('rock');
        }else if(event.key === 'p'){
            playGame('paper');
        }else if(event.key === 's'){
            playGame('scissors');
        }else if (event.key === 'a'){
            autoPlay(document.querySelector('#autoPlayBt'))
        }else if (event.key === 'Backspace'){
            resetScoref();
        }
    })


    const rock_button = document.querySelector('#rock');
    const paper_button = document.querySelector('#paper');
    const scissors_button = document.querySelector('#scissors');
    const autoPlayButton = document.querySelector('#autoPlayBt')
    const resetScore = document.querySelector('#resetScore')
    rock_button.addEventListener('click', () => {
        playGame('rock')
        console.log("CLICKED")
    })

    paper_button.addEventListener('click', () => {
        playGame('paper')
    })

    scissors_button.addEventListener('click', () => {
        playGame('scissors')
    })

    autoPlayButton.addEventListener('click', () => {
        autoPlay(autoPlayButton);
    })

    resetScore.addEventListener('click', () => {
        resetScoref()
    })

    
})



const options = {
    rock: () => {
        rockClick()
    },
    paper: () => {
        paperClick()
    },
    scissors: () => {
        scissorsClick()
    } 
}



function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
        result = 'You lose.';
    } else if (computerMove === 'paper') {
        result = 'You win.';
    } else if (computerMove === 'scissors') {
        result = 'Tie.';
    }

    } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
        result = 'You win.';
    } else if (computerMove === 'paper') {
        result = 'Tie.';
    } else if (computerMove === 'scissors') {
        result = 'You lose.';
    }
    
    } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
        result = 'Tie.';
    } else if (computerMove === 'paper') {
        result = 'You lose.';
    } else if (computerMove === 'scissors') {
        result = 'You win.';
    }
    }

    if (result === 'You win.') {
    score.wins += 1;
    } else if (result === 'You lose.') {
    score.losses += 1;
    } else if (result === 'Tie.') {
    score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    const moves = {
       "rock": document.querySelector('#img1').getAttribute('src'),
       "paper": document.querySelector('#img2').getAttribute('src'),
       "scissors": document.querySelector('#img3').getAttribute('src')
    }

    console.log(moves[playerMove])

    document.querySelector('.js-moves').innerHTML = `You <img class='show_result_img' src=${moves[playerMove]}> - <img class='show_result_img' src=${moves[computerMove]}> Computer`;
}


function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}` 
}


function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
    }

    return computerMove;
}

function paperClick(){
playGame('paper')
}

function scissorsClick(){
playGame('scissors')
}

function rockClick(){
playGame('rock')
}



function randomPlay(){
    const keys = Object.keys(options)
    const randIndex = Math.floor(Math.random() * keys.length)
    options[keys[randIndex]]()
}

var isAutoPlaying = false;
var interval_id;

function autoPlay(autoPlayBt){
    if (!isAutoPlaying){
        autoPlayBt.textContent = 'Stop Playing'
        interval_id = setInterval(() =>{
            randomPlay()
        },
        1000)
        isAutoPlaying = true
    }else{
        autoPlayBt.textContent = 'Auto Play'
        clearInterval(interval_id);
        isAutoPlaying = false
    }

}




