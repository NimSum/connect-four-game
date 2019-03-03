const grids = new Grid();
let indexes = grids.getIdxList(grids.grid, 1);
console.log(indexes);
console.log(grids.winnerCheck(indexes));