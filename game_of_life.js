// let count = 1;
// setInterval(function() {
//   console.log(++count);
// }, 1000);

// setTimeout(function() {
//   console.log('labas');
// }, 2000);


let area = [];
let area2 = [];
let columns = 10;
let rows = 10;

// Creating 2 empty arrays
for (let y = 0; y <= rows + 1; y++) {
  area.push([]);
  for (let x = 0; x <= columns + 1; x++) {
    area[y].push(' ');
  }  
}

console.log(area);
console.log(area2);

// creating first table
for (let y = 1; y <= rows; y++) {
  for (let x = 1; x <= columns; x++) {
    if (Math.random() < 0.5)
      area[y][x] = 'X';
  }
  console.log(area[y]);
}


// creating next tables
let array = area;
setInterval(function() {
  array = newTable();
  buildTable(rows, columns, array);
}, 1000);


// newTable();
function newTable () {
  for (let y = 0; y <= rows + 1; y++) {
    area2.push([]);
    for (let x = 0; x <= columns + 1; x++) {
      area2[y].push(' ');
    }  
  }
  
  console.log('---------------');
  let neighbours;

  for (y = 1; y <= columns; y++) {
    for (x = 1; x <= rows; x++) {
      neighbours = countNeighbours(x, y);
      isLive = area[y][x] == 'X' ? true : false;
      area2[y][x] = getsLiveOrDead(isLive, neighbours) ? 'X' : ' ';
    }
    console.log(area2[y]);
  }

  area = area2;
  area2 = new Array();

  return area;
}


function countNeighbours(x, y) {
  let neighbourhood = [];
  neighbourhood = [area[y-1][x-1], area[y-1][x], area[y-1][x+1],
                       area[y][x-1], area[y][x+1],
                       area[y+1][x-1], area[y+1][x], area[y+1][x+1] ];
  return countOccurences(neighbourhood, 'X');
}


function countOccurences(array, searchElement) {
  return array.reduce((accumulator, current) => {
    if (current === searchElement)
      accumulator++;
    return accumulator;
  }, 0);
}


function getsLiveOrDead(isLive, neighbours) {
  if (isLive && (neighbours < 2 || neighbours > 3)) {
    // console.log('test1');
    return false;
  }
  if (isLive && (neighbours === 2 || neighbours === 3)) {
    // console.log('test2');
    return true;
  }
  if (!isLive && neighbours === 3) {
    // console.log('test3');
    return true;
  }
  // console.log('test4');
  return false;
}



function buildTable(rows, columns, array) {
  let html = ``;
  for (let row = 1; row <= rows; row++) {
    html += `<tr>`;
    for (let column = 1; column <= columns; column++) {
      if (array[row][column] === 'X')
        html += `<td class="live"></td>`;
      else
        html += `<td></td>`;
    }
    html += `</tr>`;
  }

  document.getElementById('game').innerHTML = html;
}