"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Made By Bl4ky113
var rollDiceBtn = document.getElementById("btn_roll");
var resultsOutput = document.getElementById("results_output");
var diceObj = {
  HTML_OBJ: [document.getElementById("dice_1"), document.getElementById("dice_2")],
  values: [1, 2],
  extraScore: [0, ""],
  winStatus: false
};
var diceDotsGridPositions = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [[1, 1], [2, 2], [3, 3]],
  4: [[1, 1], [1, 3], [3, 1], [3, 3]],
  5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
  6: [[1, 1], [1, 2], [1, 3], [3, 1], [3, 2], [3, 3]]
};
var initialResults_HTML = "<p class=\"title\">Congrats!!! <sub>To Us</sub></p><button class=\"exit-btn\" id=\"close_results_btn\"></button>";

var showNumberOnDice = function showNumberOnDice(dice) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var positions = diceDotsGridPositions[value];
  var HTML_dots = "";
  positions.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        row = _ref2[0],
        column = _ref2[1];

    HTML_dots += "<div class=\"dice__dot\" style=\"grid-row: ".concat(row, "; grid-column: ").concat(column, ";\"></div>");
  });
  dice.innerHTML = HTML_dots;
};

var calcExtraScore = function calcExtraScore() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var winStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var totalScore = 0;
  var list_HTML = "";
  var diceNumber = ["st", "nd"];

  if (value[0] + value[1] === value[0] * 2) {
    totalScore += 1;

    if (winStatus === true) {
      list_HTML += "<li class=\"li\">Your Dice are Pair, and fair. <span class=\"score\">+1</span></li>";
    } else {
      list_HTML += "<li class=\"li\">Your Dice are Pair, that's unfair. <span class=\"score\">+1</span></li>";
    }
  } else {
    list_HTML += "<li class=\"li li--negative\">Your Dice are not Pair. Nothing else to say.</li>";
  }

  value.forEach(function (val, i) {
    if (val >= 5) {
      totalScore += 1;
      list_HTML += "<li class=\"li\">Your ".concat(i + 1).concat(diceNumber[i], " Dice have a high score <span class=\"score\">+1</span></li>");
    } else if (val <= 2) {
      totalScore -= 1;
      list_HTML += "<li class=\"li li--negative\">Your ".concat(i + 1).concat(diceNumber[i], " Dice have a low score <span class=\"score\">-1</span></li>");
    } else {
      list_HTML += "<li class=\"li li--negative\">Your ".concat(i + 1).concat(diceNumber[i], " Dice have a boring score</li>");
    }
  });
  return [totalScore, list_HTML];
};

rollDiceBtn.onclick = function () {
  resultsOutput.style = "";
  rollDiceBtn.disabled = true;
  var results_HTML = "".concat(initialResults_HTML, "<section class=\"results\">");
  diceObj.values = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

  if (diceObj.values[0] + diceObj.values[1] > 6) {
    diceObj.winStatus = true;
    results_HTML += "<p class=\"text text--win\">You have won this Game, lets see what happen with the others.</p>";
  } else {
    diceObj.winStatus = false;
    results_HTML += "<p class=\"text text--lose\">You have lost this Game, please go to the nearest redeem point.</p>";
  }

  diceObj.extraScore = calcExtraScore(diceObj.values, diceObj.winStatus);
  results_HTML += "<p class=\"text\">You have <span class=\"score\">".concat(diceObj.extraScore[0], "</span> extra points.</p>");
  results_HTML += "<ul class=\"list\">".concat(diceObj.extraScore[1], "</ul></section>");
  diceObj.HTML_OBJ.forEach(function (dice, i) {
    var numberOfAnimations = 0;

    dice.onanimationend = function () {
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
  var closeResultsBtn = document.getElementById("close_results_btn");

  closeResultsBtn.onclick = function () {
    resultsOutput.style = "";
    rollDiceBtn.disabled = false;
  };
};

window.onload = function () {
  diceObj.HTML_OBJ.forEach(function (dice, i) {
    showNumberOnDice(dice, diceObj.values[i]);
  });
};