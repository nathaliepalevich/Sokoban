'use strict'

const WATER_SOUND = new Audio('sounds/water.mp3')
const CLOCK_SOUND = new Audio('sounds/clock.mp3')
const COINS_SOUND = new Audio('sounds/coins.wav')
const GLUE_SOUND = new Audio('sounds/glue.wav')
const FEATURES = [`GOLD`, `MAGNET`, 'CLOCK', 'GLUE', `WATER`]
const FEATURES_IMAGES = [`<img src="images/gold.png">`, `<img src="images/magnet.png">`, `<img src="images/clock.png">`, `<img src="images/glue.png">`, `<img class="water" src="images/water.gif">`]
var gFeatureLoc;

function drop(board, location, gameElement) {
    var emptyCells = []

    var colIdx = location.j
    for (let i = location.i + 1; i < board.length - 1; i++) {
        if (gBoard[i][colIdx].gameElement === null) {
            if (gBoard[i][colIdx].type === WALL) break
            emptyCells.push(i)
        }
    }
    setTimeout(() => {
        for (let i = 0; i < emptyCells.length; i++) {
            gGame.countSteps++
            gameStatus()
            updateGame(emptyCells[i], colIdx, gameElement)
            WATER_SOUND.pause()
        }
    }, 1000);
}

function magnetEffect() {
    if (gGame.isOnMagnet) {
        var boxPos = gBox.pos
        var sokoPos = gSokoban.pos
        var iAbsDiff = Math.abs(boxPos.i - sokoPos.i);
        var jAbsDiff = Math.abs(boxPos.j - sokoPos.j);
        if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
            if (sokoPos.i === boxPos.i) {
                if (sokoPos.j > boxPos.j && gBoard[sokoPos.i][sokoPos.j + 1].type !== 'WALL') {
                    updateGame(sokoPos.i, sokoPos.j + 1, gSokoban)
                    updateGame(boxPos.i, boxPos.j + 1, gBox)
                } else if (sokoPos.j < boxPos.j && gBoard[sokoPos.i][sokoPos.j - 1].type !== 'WALL') {
                    updateGame(sokoPos.i, sokoPos.j - 1, gSokoban)
                    updateGame(boxPos.i, boxPos.j - 1, gBox)
                }
            } else if (sokoPos.j === boxPos.j) {
                if (sokoPos.i > boxPos.i && gBoard[sokoPos.i + 1][sokoPos.j].type !== 'WALL') {
                    updateGame(sokoPos.i + 1, sokoPos.j, gSokoban)
                    updateGame(boxPos.i + 1, boxPos.j, gBox)
                } else if (sokoPos.i < boxPos.i && gBoard[sokoPos.i - 1][sokoPos.j].type !== 'WALL') {
                    updateGame(sokoPos.i - 1, sokoPos.j, gSokoban)
                    updateGame(boxPos.i - 1, boxPos.j - 1, gBox)
                }
            }
        }
        checkWin()
        gGame.isOnMagnet = false;
    }
}

function createFeatur() {
    var idx = getRandomIntInclusive(0, 4)
    var feature = FEATURES[idx]
    var feature_img = FEATURES_IMAGES[idx]
    var empySpotArr = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].gameElement === null && gBoard[i][j].type === FLOOR && !(gBoard[i][j].isTarget)) {
                empySpotArr.push({ i: i, j: j })
            }
        }
    }

    var randomIdx = getRandomIntInclusive(0, empySpotArr.length - 1)
    var empycell = empySpotArr[randomIdx]

    gBoard[empycell.i][empycell.j].gameElement = feature;
    gFeatureLoc = { i: empycell.i, j: empycell.j }

    renderCell(empycell, feature_img);
    setTimeout(removeFeture, 5000)
}

function removeFeture() {
    for (let i = 0; i < FEATURES.length; i++) {
        if (gBoard[gFeatureLoc.i][gFeatureLoc.j].gameElement === FEATURES[i]) {
            gBoard[gFeatureLoc.i][gFeatureLoc.j].gameElement = null;
            renderCell(gFeatureLoc, '')
        }
    }
}
