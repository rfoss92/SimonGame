// create a separate timer where the timeout is multiplied by the array length and the it enables the buttons

(simonGame => {
let colorArray = ['green', 'red', 'yellow', 'blue'];
let randomColorArray = [];
let playerArray = [];
let yourInterval;
let theirInterval;
let counter = 1;
let playerCorrect = true;
let strictOn = true;
let i = 0;
$('#green, #red, #yellow, #blue').prop('disabled', true);

strict.onclick = () => {
  if (strictOn) {
    strictOn = false;
    $('h1').html('STRICT');
  } else {
    strictOn = true;
    $('h1').html('SIMON');
  }
};

$('#reset').click(reset);
function reset() {
  $('#start, #strict').prop('disabled', false);
  playerCorrect = true;
  randomColorArray = [];
  playerArray = [];
  yourInterval;
  theirInterval;
  counter = 1;
  $('#counter').html(counter);
}

$('#start').click(start);
function start() {
  let i = 0;
  $('#start, #strict').prop('disabled', true);
  $('#green, #red, #yellow, #blue').prop('disabled', false);

  if (playerCorrect) {
    randomColorArray.push(colorArray[Math.floor(Math.random() * colorArray.length)]);
  }

  function flash() {
    let color = randomColorArray[i];
    let colorBG = document.getElementById(color);
    colorBG.style.background = color;
    document.getElementById('beep' + colorArray.indexOf(color)).play();
    $('#counter').html(counter);

    clearInterval(yourInterval);
    clearInterval(theirInterval);
    theirInterval = setInterval(function () {
      colorBG.style.background = '';
    }, 500);
  }

  (function myLoop() {
      setTimeout(function () {
        flash();
        i++;
        if (i < randomColorArray.length) {
          myLoop();
        }
      }, 1000);
    })();
}

//payer move
$('#colorButtons button').click(function () {
  yourMove(this.id);
});

function yourMove(color) {
  // flash color
  let colorBG = document.getElementById(color);
  colorBG.style.background = color;
  document.getElementById('beep' + colorArray.indexOf(color)).play();
  clearInterval(yourInterval);
  yourInterval = setInterval(function () {
    colorBG.style.background = '';
  }, 250);

  playerArray.push(color);

  if (playerArray[i] !== randomColorArray[i]) {
    if (!strictOn) {
      reset();
      start();
    } else {
      playerCorrect = false;
      playerArray = [];
      start();
    }

    $('#counter').html('WRONG!');

  } else if (playerArray.length === 20) {
    reset();
    $('#counter').html('YOU WIN!');
  } else {
    i++;
    if (playerArray.length === randomColorArray.length) {
      counter++;
      $('#counter').html(counter);
      i = 0;
      playerArray = [];
      playerCorrect = true;
      start();
    }
  }
}

})();
