
let columns = 25;
let rows = 25;
let tableWidth = '400px';     // max-width limited to 100vw
let tableHeight = '400px';    // max-height limited to 100vh
let timeInterval = 250;
let currentPattern = [];
let nextPattern = [];

// Creating first array with empty elements (including extra rows and columns)
for (let y = 0; y <= (rows + 1); y++) {
  currentPattern.push([]);
  for (let x = 0; x <= (columns + 1); x++) {
    currentPattern[y].push(' ');
  }
}

// Filling the first array with a random pattern
for (let y = 1; y <= rows; y++) {
  for (let x = 1; x <= columns; x++) {
    if (Math.random() < 0.5)
      currentPattern[y][x] = 'X';
  }
  // console.log(area[y]);
}

// Creating next patterns at specified time intervals
let array;
setInterval(function() {
  array = createNextPattern();
  buildTable(rows, columns, array);
}, timeInterval);


function createNextPattern() {
  for (let y = 0; y <= (rows + 1); y++) {
    nextPattern.push([]);
    for (let x = 0; x <= (columns + 1); x++) {
      nextPattern[y].push(' ');
    }  
  }
  
  // console.log('---------------------------------------');
  let neighbours;

  for (y = 1; y <= columns; y++) {
    for (x = 1; x <= rows; x++) {
      neighbours = countNeighbours(x, y);
      isLive = currentPattern[y][x] === 'X' ? true : false;
      nextPattern[y][x] = getsLiveOrDead(isLive, neighbours) ? 'X' : ' ';
    }
    // console.log(nextPattern[y]);
  }

  currentPattern = nextPattern;
  nextPattern = new Array();

  return currentPattern;
}


function countNeighbours(x, y) {
  let neighbourhood = [currentPattern[y-1][x-1], currentPattern[y-1][x], currentPattern[y-1][x+1],
                       currentPattern[y][x-1],                           currentPattern[y][x+1],
                       currentPattern[y+1][x-1], currentPattern[y+1][x], currentPattern[y+1][x+1] ];
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
  if (isLive && (neighbours < 2 || neighbours > 3))
    return false;
  if (isLive && (neighbours === 2 || neighbours === 3))
    return true;
  if (!isLive && neighbours === 3)
    return true;
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

  let table = document.getElementById('game');
  table.innerHTML = html;
  table.style = `width: ${tableWidth}; height: ${tableHeight}`;
}