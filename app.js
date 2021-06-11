/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify Player og guesses remaining
- NOtify the Player of the correct answer if loose
- Let Player choose to play again

*/

// Game Values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// Assign UI Min and Max

minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listner
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});




// Listen for guess

guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  // console.log(guess);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please Enter a Number between ${min} TO ${max}` ,'red');
  }
  //Game OVER WON 
  // Check if We Won
  if(guess === winningNum){

    gameOver(true,`YOU WIN  ${winningNum} is Correct!`);
    // Disable Input
    // guessInput.disabled = true;
    // // Change Border Color
    // guessInput.style.borderColor = 'green';
    // // Set Message
    // setMessage(` YOU WIN  ${winningNum} is Correct!`,'green');
  }
  
  else{
    // Wrong Number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game Over - LOST

      gameOver(false , `Game Over , You Lost. The Correct number was ${winningNum}`);
      // // Disable Input
      // guessInput.disabled = true;
      // // Change border color
      // guessInput.style.borderColor = 'red';
      // // Set Message
      // setMessage(`Game Over , You Lost. The Correct number was ${winningNum}`,'red');

    }
    else{
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input Box
      guessInput.value = '';

      // Tell the user its the wrong number
      setMessage(`${guess} is not correct , ${guessesLeft} Guesses Left`, 'red');

    }

  }
});

// Game Over
function gameOver(won , msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // Set TExt color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play Again?

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min,max){
  return Math.floor(Math.random()*(max - min + 1) + min);
}


// Set Message

function setMessage(msg , color){
  message.style.color = color;
  message.textContent = msg;
}