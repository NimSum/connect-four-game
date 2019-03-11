"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid() {
    _classCallCheck(this, Grid);

    this.grid = [[[], [], [], [], [], [], []], //A = 0
    [[], [], [], [], [], [], []], //B = 1
    [[], [], [], [], [], [], []], //C = 2
    [[], [], [], [], [], [], []], //D = 3
    [[], [], [], [], [], [], []], //E = 4
    [[], [], [], [], [], [], []] //F = 5
    ];
    this.gridY = [[this.grid[0][0], this.grid[1][0], this.grid[2][0], this.grid[3][0], this.grid[4][0], this.grid[5][0]], [this.grid[0][1], this.grid[1][1], this.grid[2][1], this.grid[3][1], this.grid[4][1], this.grid[5][1]], [this.grid[0][2], this.grid[1][2], this.grid[2][2], this.grid[3][2], this.grid[4][2], this.grid[5][2]], [this.grid[0][3], this.grid[1][3], this.grid[2][3], this.grid[3][3], this.grid[4][3], this.grid[5][3]], [this.grid[0][4], this.grid[1][4], this.grid[2][4], this.grid[3][4], this.grid[4][4], this.grid[5][4]], [this.grid[0][5], this.grid[1][5], this.grid[2][5], this.grid[3][5], this.grid[4][5], this.grid[5][5]], [this.grid[0][6], this.grid[1][6], this.grid[2][6], this.grid[3][6], this.grid[4][6], this.grid[5][6]]];
    this.botLeftTopRight = [[this.grid[3][0], this.grid[2][1], this.grid[1][2], this.grid[0][3]], [this.grid[4][0], this.grid[3][1], this.grid[2][2], this.grid[1][3], this.grid[0][4]], [this.grid[5][0], this.grid[4][1], this.grid[3][2], this.grid[2][3], this.grid[1][4], this.grid[0][5]], [this.grid[5][1], this.grid[4][2], this.grid[3][3], this.grid[2][4], this.grid[1][5], this.grid[0][6]], [this.grid[5][2], this.grid[4][3], this.grid[3][4], this.grid[2][5], this.grid[1][6]], [this.grid[5][3], this.grid[4][4], this.grid[3][5], this.grid[2][6]]];
    this.topLeftBotRight = [[this.grid[2][0], this.grid[3][1], this.grid[4][2], this.grid[5][3]], [this.grid[1][0], this.grid[2][1], this.grid[3][2], this.grid[4][3], this.grid[5][4]], [this.grid[0][0], this.grid[1][1], this.grid[2][2], this.grid[3][3], this.grid[4][4], this.grid[5][5]], [this.grid[0][1], this.grid[1][2], this.grid[2][3], this.grid[3][4], this.grid[4][5], this.grid[5][6]], [this.grid[0][2], this.grid[1][3], this.grid[2][4], this.grid[3][5], this.grid[4][6]], [this.grid[0][3], this.grid[1][4], this.grid[2][5], this.grid[3][6]]];
  }

  _createClass(Grid, [{
    key: "getIdxList",
    value: function getIdxList(array, key) {
      var idxArr = [];
      var filteredIdx = function filteredIdx(array, row, key) {
        return array[row].reduce(function (idxArr, item, idx) {
          item.toString() === key.toString() ? idxArr.push(idx) : false;
          return idxArr;
        }, []);
      };
      array.forEach(function (item, idx) {
        var idxRow = filteredIdx(array, idx, key);
        idxRow.length <= 3 ? true : idxRow.forEach(function (idx) {
          return idxArr.push(idx);
        });
      });
      return idxArr;
    }
  }, {
    key: "winnerCheck",
    value: function winnerCheck(arr) {
      var winCheck = [];
      for (var i = 0; i < arr.length; i++) {
        arr[i + 1] == arr[i] + 1 ? winCheck.unshift(true) : winCheck.unshift(false);
        winCheck = winCheck.slice(0, 3);
        if (winCheck[0] === true && winCheck[1] === true && winCheck[2] === true) {
          return true;
        }
      }
    }

    // saveGrid(arr) {
    //   localStorage.setItem('game', JSON.stringify(arr));
    // }

  }]);

  return Grid;
}();
'use strict';

window.addEventListener('load', gridEventListener);
var game = new Grid();
var playerSwitch = parseInt(document.querySelector('#grid-container').dataset.p1p2, 10);

function gridEventListener() {
  rowIndicator();
  var validateClick = function validateClick(e) {
    if (e.target.nodeName === 'LI') {
      checkPosition(e);
    }
  };
  document.querySelector('#grid-container').addEventListener('click', validateClick);
}

function checkPosition(e) {
  var position = e.target.dataset.slot;
  var colPositions = [{ column: position >= 0 && position <= 5 }, { column: position >= 6 && position <= 11 }, { column: position >= 12 && position <= 17 }, { column: position >= 18 && position <= 23 }, { column: position >= 24 && position <= 29 }, { column: position >= 30 && position <= 35 }, { column: position >= 36 && position <= 41 }];
  var indexFound = colPositions.findIndex(function (col) {
    return col.column === true;
  });
  chipPlacement(e, game.gridY[indexFound], indexFound);
}

var allSlots = Array.from(document.querySelectorAll('li'));
var domGridColumns = [allSlots.slice(0, 6), allSlots.slice(6, 12), allSlots.slice(12, 18), allSlots.slice(18, 24), allSlots.slice(24, 30), allSlots.slice(30, 36), allSlots.slice(36, 42)];

function chipPlacement(e, column, idx) {
  playerSwitch = e.target.parentElement.dataset.p1p2 ^= 1;
  var player = playerSwitch === 1 ? 1 : 2;
  for (var i = column.length - 1; i >= 0; i--) {
    if (column[i][0] === undefined) {
      domGridColumns[idx][i].style.backgroundColor = '' + (playerSwitch === 1 ? 'blue' : 'red');
      game.grid[i][idx][0] = player;
      setTimeout(function () {
        return checkForWinner(player);
      }, 100);
      return;
    }
  }
}

function tieCheck() {
  var counter = 0;
  game.grid.forEach(function (row) {
    row.forEach(function (slot) {
      return slot[0] === 1 || slot[0] === 2 ? counter++ : false;
    });
  });
  if (counter === 42) {
    winner();
  }
}

function checkForWinner(player) {
  var indexListArr = [game.getIdxList(game.grid, player), game.getIdxList(game.gridY, player), game.getIdxList(game.topLeftBotRight, player), game.getIdxList(game.botLeftTopRight, player)];
  indexListArr.forEach(function (arr) {
    if (game.winnerCheck(arr)) {
      winner(player);
    }
  });
  tieCheck();
}

function winner(player) {
  player ? window.alert('  Player ' + player + ' WINS! Play a new game?') : window.alert('It\'s a TIE ! Play a tie-breaker?');
  allSlots.forEach(function (slot) {
    return slot.style.backgroundColor = '';
  });
  var refresh = function refresh() {
    return location.reload();
  };
  setTimeout(refresh, 200);
}

function rowIndicator() {
  domGridColumns.forEach(function (column, idx) {
    column.forEach(function (slot) {
      return slot.addEventListener('mouseover', function () {
        return highlightRow(idx);
      });
    });
    column.forEach(function (slot) {
      return slot.addEventListener('mouseout', function () {
        return highlightRow(idx, 1);
      });
    });
  });
}

function highlightRow(col, off) {
  var mouseIn = function mouseIn() {
    domGridColumns[col].forEach(function (slot) {
      return slot.style.border = '' + (document.querySelector('#grid-container').dataset.p1p2 === '0' ? '3px dotted blue' : '3px dotted red');
    });
  };
  var mouseOut = function mouseOut() {
    domGridColumns[col].forEach(function (slot) {
      return slot.style.border = '';
    });
  };
  domGridColumns[col].forEach(function (slot) {
    return slot.addEventListener('click', function () {
      playerSwitch = parseInt(document.querySelector('#grid-container').dataset.p1p2, 10);
      setTimeout(mouseIn, 100);
    });
  });
  off ? mouseOut() : mouseIn();
}

// function reloadPrevGame() {
//   let storedArr = JSON.parse(localStorage.getItem('game'));
//   let slotArr = [];
//   storedArr.forEach(row => {
//     row.forEach(slot => slotArr.push(slot))
//   });
//   allSlots.forEach((slot, i) => {
//     if (slotArr[i][0] === 1) allSlots[i].style.backgroundColor = 'blue';
//     if (slotArr[i][0] === 2) allSlots[i].style.backgroundColor = 'red';
//   });
// }

// reloadPrevGame()
