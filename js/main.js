'use strict'

const WALL = `WALL`
const TARGET = 'TARGET'
const FLOOR = 'FLOOR'

var gIntervalShowFeature;
var gSize;
var gBoard;
var gGame;
var gSokoban;
var gBox;

function initGame() {
    resetGame()
    gBox = { name: 'BOX', img: `<img class="box" src="images/box.png">` }
    gGame = {
        isGameOn: true,
        points: 0,
        countSteps: 0,
        countClockSteps: 10,
        isClockOn: false,
        isOnGlue: false,
        isOnMagnet: false,
    }
    gBoard = buildBoard()
    renderBoard(gBoard)
    gIntervalShowFeature = setInterval(createFeatur, 10000);
}

function resetGame() {
    clearInterval(gIntervalShowFeature)
    var elSteps = document.querySelector('.counter')
    elSteps.innerText = 'Moves Count: 0  Score: 0'
    var elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

function buildBoard() {
    var board = new Array(gSize);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(gSize);
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            var cell = { type: FLOOR, gameElement: null, isTarget: false };
            if (i === 0 || i === gSize - 1 || j === 0 || j === gSize - 1) cell.type = WALL;
            else board[i][j] = FLOOR

            board[i][j] = cell
        }
    }
    board[gSokoban.pos.i][gSokoban.pos.j].gameElement = gSokoban.name;

    return board
}

function renderCell(location, value) {
    var className = getClassName(location)
    var elCell = document.querySelector(`.${className}`)
    elCell.innerHTML = value
}

function renderBoard(board) {
    var elBoard = document.querySelector('.game-board');
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })

            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';

            strHTML += '<td onmousedown="magnetEffect()" class="cell ' + cellClass +
                '"  onclick="moveTo(' + i + ',' + j + ',event)" >';

            if (currCell.gameElement === gSokoban.name) strHTML += gSokoban.img;
            else if (currCell.gameElement === gBox.name) strHTML += gBox.img;

            strHTML += '</td>';
        }
        strHTML += '</tr>';
    }
    gameStatus()
    elBoard.innerHTML = strHTML;
}

function getClassName(location) {
    var cellClass = `cell-${location.i}-${location.j}`;
    return cellClass;
}

function gameStatus() {
    var elCounter = document.querySelector('.header h3')
    var elClock = document.querySelector('.clock')
    elCounter.innerHTML = `Moves Count: ${gGame.countSteps} \n Score: ${gGame.points}`

    if (gGame.isClockOn) {
        elClock.innerHTML = `${gGame.countClockSteps} FREE STEPS`
    } else elClock.innerHTML = ''
}

function openModal(message) {
    gGame.isGameOn = false
    clearInterval(gIntervalShowFeature)
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
    elModal.innerHTML = `<h1>${message}</h1><br><button class="play" onclick="easy()">PLAY AGAIN</button>`
}

function checkGameOver() {
    if (gGame.countSteps === 300) {
        openModal('GAME OVER')
    }
}

function checkWin() {
    var countBoxTarget = 0
    for (let i = 0; i < gDifficultyChosen.targets.length; i++) {
        var target = gDifficultyChosen.targets[i]
        if (gBoard[target.i][target.j].gameElement === gBox.name) {
            countBoxTarget++
        }
        if (countBoxTarget === gDifficultyChosen.targets.length) {
            openModal('YOU WON')

        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
