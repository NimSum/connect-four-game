const game = new Grid();



function slotPlacement(column, player) {
  for (let i = column.length - 1; i >= 0; i--) {
    if (column[i] == false) {
      column[i][0] = player;
      console.log(column);
      return;
    }
  }
}


function gridEventListener() {
  const validateClick = (e) => {
    e.target.nodeName === 'LI' 
    ? checkPosition(e, 1)
    : false;
  }
  document.querySelector('#grid-container').addEventListener('click', validateClick);
}

gridEventListener();

function checkPosition(e, player) {
  let position = e.target.dataset.slot;
  position >= 0 && position <= 5
  ? slotPlacement(game.gridY[0], player)
  : position >= 6 && position <= 11
  ? slotPlacement(game.gridY[1], player)
  : position >= 12 && position <= 16
  ? slotPlacement(game.gridY[2], player)
  : position >= 18 && position <= 23
  ? slotPlacement(game.gridY[3], player)
  : position >= 24 && position <= 29
  ? slotPlacement(game.gridY[4], player)
  : position >= 30 && position <= 35
  ? slotPlacement(game.gridY[5], player)
  : position >= 35 && position <= 41
  ? slotPlacement(game.gridY[6], player)
  : false;
}

function switchPlayer(e) {

  e.target.parentElement.dataset.p1p2 ^= 1;
}

const allSlots = Array.from(document.querySelectorAll('li'));
const domGridColumns = {
  col0: allSlots.slice(0, 6),
  col1: allSlots.slice(6, 12),
  col2: allSlots.slice(12, 18),
  col3: allSlots.slice(18, 24),
  col4: allSlots.slice(24, 30),
  col5: allSlots.slice(30, 36),
  col6: allSlots.slice(36, 42)
}
// console.log(domGridColumns.col0[0].dataset.slot)

const domToGrid = (arr, idx) => {
  arr[idx].forEach((item, idx) => {
  console.log(item[0] = parseInt(allSlots[idx].textContent));
  })
};

// console.log(domToGrid(game.grid, 0))






