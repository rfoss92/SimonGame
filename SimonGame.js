(simonGame => {
  let colorArray = ['green', 'red', 'yellow', 'blue'];
  let randomColorArray = [];
  let playerArray = [];
  let interval;
  let counter = 0;
  let playerCorrect = true;
  let strictOn = false;
  let moveIndex = 0;
  $('#green, #red, #yellow, #blue').prop('disabled', true);

  $('#start').click(start);
  $('#reset').click(reset);
  $('#strict').click(strict);
  $('#colorButtons button').click(function () { yourMove(this.id) });

  function start() {
    $('#start, #strict').prop('disabled', true);
    $('#green, #red, #yellow, #blue').prop('disabled', false);
    counter++;
    $('#counter').html(counter);
    if (playerCorrect) randomColorArray.push(colorArray[Math.floor(Math.random() * colorArray.length)]);
    flashColors();
  }

  function flashColors(colorIndex = 0) {
    setTimeout(() => {
      let color = randomColorArray[colorIndex];     
      flash(color);
      colorIndex++;
      if (colorIndex < randomColorArray.length) {
        flashColors(colorIndex);
      }
    }, 1000);
  }

  function flash(color) {
    $('#counter').html(counter); // remove the 'WRONG' message
    let colorButton = $('#' + color)[0];
    colorButton.style.background = color;
    $('#beep' + colorArray.indexOf(color))[0].play();
    clearInterval(interval);
    interval = setInterval(() => {
      colorButton.style.background = '';
    }, 250);
  }

  function reset() {
    $('#start, #strict').prop('disabled', false);
    playerCorrect = true;
    randomColorArray = playerArray = [];
    counter = moveIndex = 0;
    $('#counter').html(counter);
  }

  function strict()  {
    if (strictOn) {
      strictOn = false;
      $('h1').html('SIMON');
    } else {
      strictOn = true;
      $('h1').html('STRICT');
    }
  }

  function yourMove(color) { 
    flash(color);
    playerArray.push(color);
    if (playerArray[moveIndex] !== randomColorArray[moveIndex]) {
      wrong();
    } else if (playerArray.length === 20) {
      reset();
      $('#counter').html('YOU WIN!');
    } else {
      right();
    }
  }

  function wrong(){
    if (strictOn) {
      reset();
      start();
    } else {
      playerCorrect = false;
      playerArray = [];
      moveIndex = 0;
      start();
    }
    $('#counter').html('WRONG!');
  }

  function right(){
    moveIndex++;
    if (playerArray.length === randomColorArray.length) {
      $('#counter').html(counter);
      playerCorrect = true;
      playerArray = [];
      moveIndex = 0;
      start();
    }    
  }

})();