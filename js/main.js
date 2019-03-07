window.addEventListener('load', gridEventListener);
const game = new Grid();
let playerSwitch = parseInt(document.querySelector('#grid-container').dataset.p1p2);

function tieCheck() {
  let counter = 0;
  game.grid.forEach(row => {
    row.forEach(slot => slot[0] === 1 || slot[0] === 2 ? counter++ : false)
  });
  if (counter == 42) winner();
};

function gridEventListener() {
  rowIndicator();
  const validateClick = (e) => {
    e.target.nodeName === 'LI' 
    ? checkPosition(e)
    : false;
  }
  document.querySelector('#grid-container').addEventListener('click', validateClick);
}

function checkPosition(e) {
  let position = e.target.dataset.slot;
  position >= 0 && position <= 5
  ? chipPlacement(e, game.gridY[0], 0)
  : position >= 6 && position <= 11
  ? chipPlacement(e, game.gridY[1], 1)
  : position >= 12 && position <= 17
  ? chipPlacement(e, game.gridY[2], 2)
  : position >= 18 && position <= 23
  ? chipPlacement(e, game.gridY[3], 3)
  : position >= 24 && position <= 29
  ? chipPlacement(e, game.gridY[4], 4)
  : position >= 30 && position <= 35
  ? chipPlacement(e, game.gridY[5], 5)
  : position >= 36 && position <= 41
  ? chipPlacement(e, game.gridY[6], 6)
  : false;
}

const allSlots = Array.from(document.querySelectorAll('li'));
const domGridColumns = [
  allSlots.slice(0, 6),
  allSlots.slice(6, 12),
  allSlots.slice(12, 18),
  allSlots.slice(18, 24),
  allSlots.slice(24, 30),
  allSlots.slice(30, 36),
  allSlots.slice(36, 42)
]

function chipPlacement(e, column, idx) {
  playerSwitch = e.target.parentElement.dataset.p1p2 ^= 1;
  let player = playerSwitch === 1 ? 1 : 2;
  for (let i = column.length - 1; i >= 0; i--) {
    if (column[i] == false) {
      domGridColumns[idx][i].style.backgroundColor = `${playerSwitch === 1 ? 'blue' : 'red'}`;
      game.grid[i][idx][0] = player;
      setTimeout(() => checkForWinner(player), 200);
      return;
    }
  }
}

function checkForWinner(player) {
  let indexListArr = [
  game.getIdxList(game.grid, player),
  game.getIdxList(game.gridY, player),
  game.getIdxList(game.topLeftBotRight, player),
  game.getIdxList(game.botLeftTopRight, player),
  ];
  indexListArr.forEach(arr => {
   game.winnerCheck(arr) ? winner(player) : false;
  });
  tieCheck();
}

function winner(player) {
  player 
  ? window.alert(`  Player ${player} WINS! Play a new game?`)
  : window.alert(`It's a TIE ! Play a tie-breaker?`);
  game.gameReset();
  allSlots.forEach(slot => slot.style.backgroundColor = '');
  location.reload();
}


function rowIndicator () {
  domGridColumns.forEach((column, idx) => {
    column.forEach(slot => slot.addEventListener('mouseover', () => highlightRow(idx)));
    column.forEach(slot => slot.addEventListener('mouseout', () => highlightRow(idx, 1)));
  });

}

function highlightRow(col, off) {
  const mouseIn = () => {
    domGridColumns[col].forEach(slot => slot.style.border = 
      `${document.querySelector('#grid-container').dataset.p1p2 === '0' ? '2px dotted blue' : '2px dotted red'}`);
  }
  const mouseOut = () => {
    domGridColumns[col].forEach(slot => slot.style.border = ''); 
  }
  domGridColumns[col].forEach(slot => slot.addEventListener('click', () => {
    playerSwitch = parseInt(document.querySelector('#grid-container').dataset.p1p2);
    setTimeout(mouseIn, 200);
  }));
  off ? mouseOut() : mouseIn();
}




