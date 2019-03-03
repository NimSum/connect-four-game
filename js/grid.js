class Grid {
  constructor() {
    this.grid = [
      [[], [], [], [], [], [], []],//A = 0
      [[], [], [], [], [], [], []],//B = 1
      [[], [], [], [], [], [], []],//C = 2
      [[], [], [], [], [], [], []],//D = 3
      [[], [], [], [], [], [], []],//E = 4
      [[], [], [], [], [], [], []] //F = 5
    ];
    this.gridY = [
      [this.grid[0][0], this.grid[1][0], this.grid[2][0], this.grid[3][0], this.grid[4][0], this.grid[5][0]],
      [this.grid[0][1], this.grid[1][1], this.grid[2][1], this.grid[3][1], this.grid[4][1], this.grid[5][1]],
      [this.grid[0][2], this.grid[1][2], this.grid[2][2], this.grid[3][2], this.grid[4][2], this.grid[5][2]],
      [this.grid[0][3], this.grid[1][3], this.grid[2][3], this.grid[3][3], this.grid[4][3], this.grid[5][3]],
      [this.grid[0][4], this.grid[1][4], this.grid[2][4], this.grid[3][4], this.grid[4][4], this.grid[5][4]],
      [this.grid[0][5], this.grid[1][5], this.grid[2][5], this.grid[3][5], this.grid[4][5], this.grid[5][5]],
      [this.grid[0][6], this.grid[1][6], this.grid[2][6], this.grid[3][6], this.grid[4][6], this.grid[5][6]]
    ];
    this.botLeftTopRight = [
      [this.grid[3][0], this.grid[2][1], this.grid[1][2], this.grid[0][3]],
      [this.grid[4][0], this.grid[3][1], this.grid[2][2], this.grid[1][3], this.grid[0][4]],
      [this.grid[5][0], this.grid[4][1], this.grid[3][2], this.grid[2][3], this.grid[1][4], this.grid[0][5]],
      [this.grid[5][1], this.grid[4][2], this.grid[3][3], this.grid[2][4], this.grid[1][5], this.grid[0][6]],
      [this.grid[5][2], this.grid[4][3], this.grid[3][4], this.grid[2][5], this.grid[1][6]],
      [this.grid[5][3], this.grid[4][4], this.grid[3][5], this.grid[2][6]]
    ];
    this.topLeftBotRight = [
      [this.grid[2][0], this.grid[3][1], this.grid[4][2], this.grid[5][3]],
      [this.grid[1][0], this.grid[2][1], this.grid[3][2], this.grid[4][3], this.grid[5][4]],
      [this.grid[0][0], this.grid[1][1], this.grid[2][2], this.grid[3][3], this.grid[4][4], this.grid[5][5]],
      [this.grid[0][1], this.grid[1][2], this.grid[2][3], this.grid[3][4], this.grid[4][5], this.grid[5][6]],
      [this.grid[0][2], this.grid[1][3], this.grid[2][4], this.grid[3][5], this.grid[4][6]],
      [this.grid[0][3], this.grid[1][4], this.grid[2][5], this.grid[3][6]]
    ];
  }

  getIdxList(array, key) {
    let idxArr = [];
    const filteredIdx = (array, row, key) => array[row].reduce((idxArr, item, idx) => {
      item.toString() === key.toString() ? idxArr.push(idx) : false;
      return idxArr;
    }, []);
    array.forEach((item, idx) => {
      let idxRow = filteredIdx(array, idx, key);
      idxRow.forEach(idx => idxArr.push(idx));
    })
    return idxArr;
  }

  winnerCheck(arr) {
    let winCheck = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i + 1] == arr[i] + 1 ? winCheck.unshift(true) : winCheck.unshift(false);
      winCheck = winCheck.slice(0, 3);
      if (winCheck[0] === true && winCheck[1] === true && winCheck[2] === true) {
        return true;
      } 
    } 
  }
}












// const grid = [
//   [[], [], [], [], [], [], []],//A = 0
//   [[], [], [], [], [], [], []],//B = 1
//   [[], [], [], [], [], [], []],//C = 2
//   [[], [], [], [], [], [], []],//D = 3
//   [[], [], [], [], [], [], []],//E = 4
//   [[], [], [], [], [], [], []] //F = 5
// ]

// const gridY = [
//   [grid[0][0], grid[1][0], grid[2][0], grid[3][0], grid[4][0], grid[5][0]],
//   [grid[0][1], grid[1][1], grid[2][1], grid[3][1], grid[4][1], grid[5][1]],
//   [grid[0][2], grid[1][2], grid[2][2], grid[3][2], grid[4][2], grid[5][2]],
//   [grid[0][3], grid[1][3], grid[2][3], grid[3][3], grid[4][3], grid[5][3]],
//   [grid[0][4], grid[1][4], grid[2][4], grid[3][4], grid[4][4], grid[5][4]],
//   [grid[0][5], grid[1][5], grid[2][5], grid[3][5], grid[4][5], grid[5][5]],
//   [grid[0][6], grid[1][6], grid[2][6], grid[3][6], grid[4][6], grid[5][6]]
// ]

// const botLeftTopRight = [
//   [grid[3][0], grid[2][1], grid[1][2], grid[0][3]],
//   [grid[4][0], grid[3][1], grid[2][2], grid[1][3], grid[0][4]],
//   [grid[5][0], grid[4][1], grid[3][2], grid[2][3], grid[1][4], grid[0][5]],
//   [grid[5][1], grid[4][2], grid[3][3], grid[2][4], grid[1][5], grid[0][6]],
//   [grid[5][2], grid[4][3], grid[3][4], grid[2][5], grid[1][6]],
//   [grid[5][3], grid[4][4], grid[3][5], grid[2][6]]
// ]

// const topLeftBotRight = [
//   [grid[2][0], grid[3][1], grid[4][2], grid[5][3]],
//   [grid[1][0], grid[2][1], grid[3][2], grid[4][3], grid[5][4]],
//   [grid[0][0], grid[1][1], grid[2][2], grid[3][3], grid[4][4], grid[5][5]],
//   [grid[0][1], grid[1][2], grid[2][3], grid[3][4], grid[4][5], grid[5][6]],
//   [grid[0][2], grid[1][3], grid[2][4], grid[3][5], grid[4][6]],
//   [grid[0][3], grid[1][4], grid[2][5], grid[3][6]]
// ]





// const getIdxList = (array, key) => {
//   let idxArr = [];
//   array.forEach((item, idx) => {
//     let idxRow = filteredIdx(array, idx, key);
//     idxRow.forEach(idx => idxArr.push(idx));
//   })
//   return idxArr;
// }

// let allIdx = getIdxList(topLeftBotRight, 1);
// console.log(allIdx);
// let winCheck = [];

// for (let i = 0; i < allIdx.length; i++) {
//   allIdx[i + 1] == allIdx[i] + 1 ? winCheck.unshift(true) : winCheck.unshift(false);
//   winCheck = winCheck.slice(0, 3)
//   winCheck[0] === true && winCheck[1] === true && winCheck[2] === true ?
//   winner() : false;
// }
// console.log(winCheck);
// function winner() {
//   console.log('win!')
// }

