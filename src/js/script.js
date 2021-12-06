// Made By Bl4ky113

const rollDiceBtn = document.getElementById("btn_roll");
const resultsOutput = document.getElementById("results_output"); 
const diceObj = { 
  HTML_OBJ: [
    document.getElementById("dice_1"),
    document.getElementById("dice_2")
  ],
  values: [ 1, 2 ],
  extraScore: [0, ""],
  winStatus: false
};
const diceDotsGridPositions = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [[1, 1], [2, 2], [3, 3]],
  4: [[1, 1], [1, 3], [3, 1], [3, 3]],
  5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
  6: [[1, 1], [1, 2], [1, 3], [3, 1], [3, 2], [3, 3]]
}; 
const initialResults_HTML = `<p class="title">Congrats!!! <sub>To Us</sub></p><button class="exit-btn" id="close_results_btn"></button>`;

const showNumberOnDice = (dice, value=1) => {
  const positions = diceDotsGridPositions[value];
  let HTML_dots = "";

  positions.forEach(([row, column]) => {
    HTML_dots += `<div class="dice__dot" style="grid-row: ${row}; grid-column: ${column};"></div>`
  });

  dice.innerHTML = HTML_dots;
};

const calcExtraScore = (value=[], winStatus=false) => {
  let totalScore = 0;
  let list_HTML = "";
  let diceNumber = ["st", "nd"];

  if ((value[0] + value[1]) === (value[0] * 2)) {
    totalScore += 1;

    if (winStatus === true) {
      list_HTML += `<li class="li">Your Dice are Pair, and fair. <span class="score">+1</span></li>`;
    } else {
      list_HTML += `<li class="li">Your Dice are Pair, that's unfair. <span class="score">+1</span></li>`;
    }
  } else {
    list_HTML += `<li class="li li--negative">Your Dice are not Pair. Nothing else to say.</li>`;
  }

  value.forEach((val, i) => {
    if (val >= 5) {
      totalScore += 1;
      list_HTML += `<li class="li">Your ${i + 1}${diceNumber[i]} Dice have a high score <span class="score">+1</span></li>`;
    } else if (val <= 2) {
       totalScore -= 1;
      list_HTML += `<li class="li li--negative">Your ${i + 1}${diceNumber[i]} Dice have a low score <span class="score">-1</span></li>`;
    } else {
      list_HTML += `<li class="li li--negative">Your ${i + 1}${diceNumber[i]} Dice have a boring score</li>`;
    }
  });

  return [totalScore, list_HTML];
};

rollDiceBtn.onclick = () => {
  resultsOutput.style = ""
  rollDiceBtn.disabled = true;

  let results_HTML = `${initialResults_HTML}<section class="results">`;

  diceObj.values = [
    Math.floor( Math.random() * 6 ) + 1,
    Math.floor( Math.random() * 6 ) + 1
  ];

  if ( (diceObj.values[0] + diceObj.values[1]) > 6 ) {
    diceObj.winStatus = true;
    results_HTML += `<p class="text text--win">You have won this Game, lets see what happen with the others.</p>`;
  } else {
    diceObj.winStatus = false;
    results_HTML += `<p class="text text--lose">You have lost this Game, please go to the nearest redeem point.</p>`;
  }

  diceObj.extraScore = calcExtraScore(diceObj.values, diceObj.winStatus);
  
  results_HTML += `<p class="text">You have <span class="score">${diceObj.extraScore[0]}</span> extra points.</p>`
  results_HTML += `<ul class="list">${diceObj.extraScore[1]}</ul></section>`;
  
  diceObj.HTML_OBJ.forEach((dice, i) => {
    let numberOfAnimations = 0;
    
    dice.onanimationend = () => {
      numberOfAnimations += 1;
      
      if (numberOfAnimations === 1) {
        showNumberOnDice(dice, diceObj.values[i]);
        dice.style.animation = "1500ms rotateDice 1500ms backwards reverse ease-in";
      } else if (numberOfAnimations >= 2) {
        dice.style = "";
      }
    };

    dice.style.animation = "1000ms rotateDice 500ms backwards normal ease-out";
  });

  resultsOutput.innerHTML = results_HTML;
  resultsOutput.style = "display: grid; animation: 500ms ease 3s both normal showResults;";

  let closeResultsBtn = document.getElementById("close_results_btn");
  closeResultsBtn.onclick = () => {
    resultsOutput.style = "";
    rollDiceBtn.disabled = false;
  };
};

window.onload = () => {
  diceObj.HTML_OBJ.forEach((dice, i) => {
    showNumberOnDice(dice, diceObj.values[i]);
  });
};